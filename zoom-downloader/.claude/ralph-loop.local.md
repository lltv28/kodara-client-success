---
active: true
iteration: 1
max_iterations: 60
completion_promise: "BULLETPROOF"
started_at: "2026-02-12T22:44:52Z"
---

Build a Python desktop app for macOS that downloads Zoom cloud recording transcripts via the Zoom API. Save everything in a zoom-transcript-downloader folder.

FIRST: Read the Zoom API documentation thoroughly. The key endpoints and details are:

AUTHENTICATION:
- Zoom uses Server-to-Server OAuth (not JWT, that's been deprecated)
- User needs to create a Server-to-Server OAuth app at marketplace.zoom.us
- Credentials required: Account ID, Client ID, Client Secret
- Token endpoint: POST https://zoom.us/oauth/token with grant_type=account_credentials
- Access tokens expire after 1 hour, so implement automatic token refresh
- Required scopes the user must enable on their Zoom app: cloud_recording:read:list_recording_files, cloud_recording:read:list_user_recordings, user:read:list_users:admin

KEY API ENDPOINTS:
- List users: GET https://api.zoom.us/v2/users (paginated via next_page_token)
- List recordings for a user: GET https://api.zoom.us/v2/users/{userId}/recordings?from=YYYY-MM-DD&to=YYYY-MM-DD (paginated, max date range is 1 month per request so you must loop through months)
- Get meeting recordings: GET https://api.zoom.us/v2/meetings/{meetingId}/recordings
- Transcript files appear in the recording_files array with file_type='TRANSCRIPT' and file_extension='VTT'
- Download transcripts via the download_url field, appending ?access_token={token} to authenticate

IMPORTANT API QUIRKS TO HANDLE:
- The recordings list endpoint only allows a 1-month date range per request, so if the user sets a start date 6 months ago, you need to make 6+ sequential API calls chunked by month
- Pagination: responses include next_page_token when there are more results
- Some recordings may not have transcripts (cloud recording transcription must be enabled in account settings). Handle this gracefully and show which meetings had transcripts vs which did not
- Rate limiting: Zoom rate limits API calls, so add sensible delays between requests

APP STRUCTURE:
- Python 3.x, compatible with macOS
- Simple GUI using tkinter (no external GUI dependencies needed on Mac)
- requirements.txt with all dependencies
- README with setup instructions including how to create the Zoom Server-to-Server OAuth app and which scopes to enable

UI FLOW:
Screen 1 - Credentials:
- Clean, simple input form with fields for: Account ID, Client ID, Client Secret
- 'Connect' button that authenticates and fetches the access token
- Show clear success/error state after connection attempt
- Include a small help link or tooltip explaining where to find these credentials in the Zoom Marketplace

Screen 2 - User Selection and Configuration (shown after successful auth):
- Dropdown or list of all users on the Zoom account (fetched from /v2/users), showing name and email
- After selecting a user, display: total number of meetings with cloud recordings found, and how many of those have transcript files available
- Date picker or date input for 'Start Date' (pull recordings from this date forward to today)
- A field to select or browse for the local download folder destination
- 'Download Transcripts' button

Screen 3 - Download Progress:
- Progress bar showing overall completion
- Live log/feed showing each transcript being downloaded (meeting topic, date, status)
- Count of successful downloads, skipped (no transcript), and failed
- 'Open Folder' button when complete to open the download directory in Finder

FILE ORGANIZATION:
- Save transcripts as .vtt files
- Name each file clearly: YYYY-MM-DD_Meeting-Topic.vtt (sanitize the meeting topic for safe filenames)
- Create a summary log file (download_log.txt) in the download folder listing every meeting processed, whether a transcript was found, and the file path if downloaded

TECHNICAL REQUIREMENTS:
- All API calls wrapped in proper error handling with clear error messages surfaced in the UI
- Automatic token refresh if a download session runs longer than 1 hour
- Graceful handling of network interruptions (retry logic with backoff)
- Thread the download process so the UI does not freeze during long downloads
- Works on macOS out of the box with standard Python 3 (no platform-specific dependencies beyond tkinter which ships with Python on Mac)

EACH ITERATION:
1. If first iteration, build the full app end to end
2. On subsequent iterations, run through every code path and test for:
   - Auth flow: invalid credentials (should show clear error, not crash), expired token (should auto-refresh), missing scopes (should surface Zoom's error message)
   - User listing: empty account, pagination with many users
   - Recording fetching: date range spanning multiple months (must chunk by month), meetings with no recordings, recordings with no transcript files
   - Download flow: network timeout handling, file naming with special characters in meeting topics, duplicate meeting names on the same date
   - UI: all buttons functional, progress bar updates correctly, no frozen/unresponsive states during downloads, clean error dialogs
   - Edge cases: user selects a start date in the future, user has zero recordings, download folder doesn't exist or lacks write permissions
3. Fix every bug found
4. Re-test fixes to confirm they work and haven't broken anything else
5. Rate overall functionality from 1-10 (every feature works correctly)
6. Rate code quality from 1-10 (clean, well-structured, properly error-handled)
7. List any remaining issues

Only when BOTH scores are 9 or above for 3 consecutive iterations with zero bugs found, output <promise>BULLETPROOF</promise>.
