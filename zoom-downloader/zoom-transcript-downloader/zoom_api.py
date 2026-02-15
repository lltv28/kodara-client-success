"""
Zoom API client for Server-to-Server OAuth authentication and cloud recording access.
"""

import time
import base64
import re
import os
from datetime import datetime, date
from dateutil.relativedelta import relativedelta
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


class ZoomAPIError(Exception):
    """Custom exception for Zoom API errors."""
    def __init__(self, message, status_code=None, error_code=None):
        super().__init__(message)
        self.status_code = status_code
        self.error_code = error_code


class ZoomAPI:
    """Client for Zoom Server-to-Server OAuth API."""

    TOKEN_URL = "https://zoom.us/oauth/token"
    API_BASE = "https://api.zoom.us/v2"
    TOKEN_EXPIRY_BUFFER = 300  # Refresh token 5 minutes before expiry

    def __init__(self, account_id, client_id, client_secret):
        self.account_id = account_id
        self.client_id = client_id
        self.client_secret = client_secret
        self.access_token = None
        self.token_expiry = 0
        self.session = self._create_session()

    def _create_session(self):
        """Create a requests session with retry logic."""
        session = requests.Session()
        retry_strategy = Retry(
            total=3,
            backoff_factor=1,
            status_forcelist=[429, 500, 502, 503, 504],
            allowed_methods=["GET", "POST"],
            raise_on_status=False,
        )
        adapter = HTTPAdapter(max_retries=retry_strategy)
        session.mount("https://", adapter)
        session.mount("http://", adapter)
        return session

    def authenticate(self):
        """Authenticate using Server-to-Server OAuth and obtain access token."""
        credentials = base64.b64encode(
            f"{self.client_id}:{self.client_secret}".encode()
        ).decode()

        headers = {
            "Authorization": f"Basic {credentials}",
            "Content-Type": "application/x-www-form-urlencoded",
        }
        data = {
            "grant_type": "account_credentials",
            "account_id": self.account_id,
        }

        try:
            response = self.session.post(
                self.TOKEN_URL, headers=headers, data=data, timeout=30
            )
        except requests.exceptions.ConnectionError:
            raise ZoomAPIError("Could not connect to Zoom. Check your internet connection.")
        except requests.exceptions.Timeout:
            raise ZoomAPIError("Connection to Zoom timed out. Please try again.")
        except requests.exceptions.RequestException as e:
            raise ZoomAPIError(f"Network error during authentication: {e}")

        if response.status_code != 200:
            try:
                error_data = response.json()
                reason = error_data.get("reason", error_data.get("error", "Unknown error"))
                error_msg = error_data.get("error_description", reason)
            except (ValueError, KeyError):
                error_msg = f"HTTP {response.status_code}: {response.text}"
            raise ZoomAPIError(
                f"Authentication failed: {error_msg}",
                status_code=response.status_code,
            )

        try:
            token_data = response.json()
        except ValueError:
            raise ZoomAPIError("Authentication failed: invalid response from Zoom.")

        if "access_token" not in token_data:
            raise ZoomAPIError(
                f"Authentication failed: no access token in response. "
                f"Response: {token_data.get('error', token_data.get('reason', 'unknown'))}"
            )

        self.access_token = token_data["access_token"]
        expires_in = token_data.get("expires_in", 3600)
        self.token_expiry = time.time() + expires_in
        return True

    def _ensure_token(self):
        """Ensure we have a valid access token, refreshing if needed."""
        if not self.access_token or time.time() >= (self.token_expiry - self.TOKEN_EXPIRY_BUFFER):
            self.authenticate()

    def _api_get(self, endpoint, params=None):
        """Make an authenticated GET request to the Zoom API."""
        self._ensure_token()

        url = f"{self.API_BASE}{endpoint}"
        headers = {"Authorization": f"Bearer {self.access_token}"}

        try:
            response = self.session.get(url, headers=headers, params=params, timeout=30)
        except requests.exceptions.ConnectionError:
            raise ZoomAPIError("Lost connection to Zoom API. Check your internet.")
        except requests.exceptions.Timeout:
            raise ZoomAPIError("Zoom API request timed out.")
        except requests.exceptions.RequestException as e:
            raise ZoomAPIError(f"Network error: {e}")

        if response.status_code == 401:
            # Token may have expired, try refreshing once
            self.authenticate()
            headers = {"Authorization": f"Bearer {self.access_token}"}
            try:
                response = self.session.get(url, headers=headers, params=params, timeout=30)
            except requests.exceptions.RequestException as e:
                raise ZoomAPIError(f"Network error after token refresh: {e}")

        if response.status_code == 429:
            # Rate limited - wait and retry
            try:
                retry_after = int(response.headers.get("Retry-After", 5))
            except (ValueError, TypeError):
                retry_after = 5
            time.sleep(retry_after)
            try:
                response = self.session.get(url, headers=headers, params=params, timeout=30)
            except requests.exceptions.RequestException as e:
                raise ZoomAPIError(f"Network error after rate limit wait: {e}")

        if response.status_code != 200:
            try:
                error_data = response.json()
                error_msg = error_data.get("message", error_data.get("error", str(error_data)))
            except (ValueError, KeyError):
                error_msg = f"HTTP {response.status_code}: {response.text}"
            raise ZoomAPIError(
                f"API error: {error_msg}",
                status_code=response.status_code,
            )

        try:
            return response.json()
        except ValueError:
            raise ZoomAPIError("API returned invalid JSON response.")

    def list_users(self):
        """Fetch all users on the account with pagination."""
        users = []
        next_page_token = ""

        while True:
            params = {"page_size": 300, "status": "active"}
            if next_page_token:
                params["next_page_token"] = next_page_token

            data = self._api_get("/users", params=params)
            users.extend(data.get("users", []))

            next_page_token = data.get("next_page_token", "")
            if not next_page_token:
                break

            time.sleep(0.2)  # Rate limiting courtesy

        return users

    def list_recordings(self, user_id, start_date, end_date=None, progress_callback=None):
        """
        Fetch all recordings for a user between start_date and end_date.
        Chunks requests by month due to Zoom's 1-month max date range.

        Args:
            user_id: Zoom user ID or email
            start_date: date object for the start
            end_date: date object for the end (defaults to today)
            progress_callback: optional callback(message) for status updates

        Returns:
            List of meeting dicts with their recording files
        """
        if end_date is None:
            end_date = date.today()

        if start_date > end_date:
            return []

        all_meetings = []
        chunk_start = start_date

        while chunk_start <= end_date:
            # Calculate chunk end: either 1 month later or end_date, whichever is sooner
            chunk_end = chunk_start + relativedelta(months=1) - relativedelta(days=1)
            if chunk_end > end_date:
                chunk_end = end_date

            if progress_callback:
                progress_callback(
                    f"Fetching recordings: {chunk_start.strftime('%Y-%m-%d')} to {chunk_end.strftime('%Y-%m-%d')}..."
                )

            next_page_token = ""
            while True:
                params = {
                    "from": chunk_start.strftime("%Y-%m-%d"),
                    "to": chunk_end.strftime("%Y-%m-%d"),
                    "page_size": 300,
                }
                if next_page_token:
                    params["next_page_token"] = next_page_token

                data = self._api_get(f"/users/{user_id}/recordings", params=params)
                meetings = data.get("meetings", [])
                all_meetings.extend(meetings)

                next_page_token = data.get("next_page_token", "")
                if not next_page_token:
                    break

                time.sleep(0.2)

            # Move to next month chunk
            chunk_start = chunk_end + relativedelta(days=1)
            time.sleep(0.3)  # Rate limiting between month chunks

        return all_meetings

    def download_transcript(self, download_url, save_path):
        """
        Download a transcript file from Zoom.

        Args:
            download_url: The download_url from the recording file
            save_path: Local file path to save the transcript

        Returns:
            True on success
        """
        self._ensure_token()

        # Append access token to URL
        separator = "&" if "?" in download_url else "?"
        authenticated_url = f"{download_url}{separator}access_token={self.access_token}"

        try:
            response = self.session.get(authenticated_url, timeout=60, stream=True)
        except requests.exceptions.ConnectionError:
            raise ZoomAPIError("Lost connection while downloading transcript.")
        except requests.exceptions.Timeout:
            raise ZoomAPIError("Download timed out.")
        except requests.exceptions.RequestException as e:
            raise ZoomAPIError(f"Download error: {e}")

        if response.status_code == 401:
            # Token expired during download session, refresh and retry
            self.authenticate()
            authenticated_url = f"{download_url}{separator}access_token={self.access_token}"
            try:
                response = self.session.get(authenticated_url, timeout=60, stream=True)
            except requests.exceptions.RequestException as e:
                raise ZoomAPIError(f"Download error after token refresh: {e}")

        if response.status_code != 200:
            raise ZoomAPIError(
                f"Failed to download transcript: HTTP {response.status_code}",
                status_code=response.status_code,
            )

        os.makedirs(os.path.dirname(save_path), exist_ok=True)

        with open(save_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)

        return True


def sanitize_filename(name):
    """Sanitize a string for use as a filename."""
    # Replace problematic characters with underscores
    sanitized = re.sub(r'[<>:"/\\|?*\x00-\x1f]', '_', name)
    # Replace multiple spaces/underscores with single underscore
    sanitized = re.sub(r'[\s_]+', '_', sanitized)
    # Remove leading/trailing underscores and dots
    sanitized = sanitized.strip('_. ')
    # Truncate to reasonable length
    if len(sanitized) > 100:
        sanitized = sanitized[:100]
    # Fallback if completely empty
    if not sanitized:
        sanitized = "Untitled_Meeting"
    return sanitized


def make_unique_path(path):
    """If path already exists, append a counter to make it unique."""
    if not os.path.exists(path):
        return path

    base, ext = os.path.splitext(path)
    counter = 2
    while os.path.exists(f"{base}_{counter}{ext}"):
        counter += 1
    return f"{base}_{counter}{ext}"
