#!/usr/bin/env python3
"""
Zoom Transcript Downloader - A macOS desktop app to download Zoom cloud recording transcripts.
"""

import os
import sys
import time
import threading
import subprocess
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
from datetime import date, datetime
from dateutil.relativedelta import relativedelta

from zoom_api import ZoomAPI, ZoomAPIError, sanitize_filename, make_unique_path


class ZoomTranscriptApp:
    """Main application class."""

    def __init__(self, root):
        self.root = root
        self.root.title("Zoom Transcript Downloader")
        self.root.geometry("700x550")
        self.root.minsize(600, 450)
        self.root.resizable(True, True)

        # State
        self.api = None
        self.users = []
        self.meetings = []
        self.download_thread = None
        self.cancel_download = False
        self._current_screen = None  # Track which screen is active

        # Style
        style = ttk.Style()
        try:
            style.theme_use("aqua" if sys.platform == "darwin" else "clam")
        except tk.TclError:
            pass  # Fall back to default theme

        # Container
        self.container = ttk.Frame(root, padding=20)
        self.container.pack(fill=tk.BOTH, expand=True)

        # Show credentials screen
        self._show_credentials_screen()

    # ─── Screen 1: Credentials ───────────────────────────────────────────

    def _show_credentials_screen(self):
        self._clear_container()
        self._current_screen = "credentials"

        # Title
        title = ttk.Label(
            self.container, text="Zoom Transcript Downloader",
            font=("Helvetica", 18, "bold")
        )
        title.pack(pady=(0, 5))

        subtitle = ttk.Label(
            self.container,
            text="Connect with your Zoom Server-to-Server OAuth credentials",
            font=("Helvetica", 11),
        )
        subtitle.pack(pady=(0, 20))

        # Form frame
        form = ttk.Frame(self.container)
        form.pack(fill=tk.X, padx=40)

        # Account ID
        ttk.Label(form, text="Account ID:").pack(anchor=tk.W, pady=(10, 2))
        self.account_id_var = tk.StringVar()
        account_entry = ttk.Entry(form, textvariable=self.account_id_var, width=50)
        account_entry.pack(fill=tk.X)

        # Client ID
        ttk.Label(form, text="Client ID:").pack(anchor=tk.W, pady=(10, 2))
        self.client_id_var = tk.StringVar()
        ttk.Entry(form, textvariable=self.client_id_var, width=50).pack(fill=tk.X)

        # Client Secret
        ttk.Label(form, text="Client Secret:").pack(anchor=tk.W, pady=(10, 2))
        self.client_secret_var = tk.StringVar()
        ttk.Entry(form, textvariable=self.client_secret_var, width=50, show="*").pack(fill=tk.X)

        # Connect button
        btn_frame = ttk.Frame(form)
        btn_frame.pack(pady=20)
        self.connect_btn = ttk.Button(
            btn_frame, text="Connect", command=self._on_connect
        )
        self.connect_btn.pack()

        # Status label
        self.status_label = ttk.Label(form, text="", foreground="gray")
        self.status_label.pack()

        # Help text
        help_text = (
            "To get these credentials, create a Server-to-Server OAuth app at marketplace.zoom.us.\n"
            "Required scopes: cloud_recording:read:list_recording_files,\n"
            "cloud_recording:read:list_user_recordings, user:read:list_users:admin"
        )
        help_label = ttk.Label(
            self.container, text=help_text, font=("Helvetica", 9),
            foreground="gray", justify=tk.CENTER
        )
        help_label.pack(side=tk.BOTTOM, pady=(20, 0))

        account_entry.focus_set()

    def _on_connect(self):
        account_id = self.account_id_var.get().strip()
        client_id = self.client_id_var.get().strip()
        client_secret = self.client_secret_var.get().strip()

        if not account_id or not client_id or not client_secret:
            messagebox.showwarning("Missing Fields", "Please fill in all credential fields.")
            return

        self.connect_btn.config(state=tk.DISABLED)
        self.status_label.config(text="Connecting...", foreground="gray")
        self.root.update_idletasks()

        def do_connect():
            try:
                self.api = ZoomAPI(account_id, client_id, client_secret)
                self.api.authenticate()
                self.root.after(0, self._on_connect_success)
            except ZoomAPIError as e:
                self.root.after(0, lambda: self._on_connect_error(str(e)))
            except Exception as e:
                self.root.after(0, lambda: self._on_connect_error(f"Unexpected error: {e}"))

        threading.Thread(target=do_connect, daemon=True).start()

    def _on_connect_success(self):
        if self._current_screen != "credentials":
            return
        try:
            self.status_label.config(text="Connected! Fetching users...", foreground="green")
            self.root.update_idletasks()
        except tk.TclError:
            pass

        def fetch_users():
            try:
                self.users = self.api.list_users()
                self.root.after(0, self._show_config_screen)
            except ZoomAPIError as e:
                self.root.after(0, lambda: self._on_connect_error(f"Failed to fetch users: {e}"))
            except Exception as e:
                self.root.after(0, lambda: self._on_connect_error(f"Unexpected error fetching users: {e}"))

        threading.Thread(target=fetch_users, daemon=True).start()

    def _on_connect_error(self, message):
        # Re-show credentials screen in case we've already transitioned away
        self._show_credentials_screen()
        messagebox.showerror("Connection Error", message)

    # ─── Screen 2: User Selection & Configuration ────────────────────────

    def _show_config_screen(self):
        self._clear_container()
        self._current_screen = "config"

        # Title
        title = ttk.Label(
            self.container, text="Download Configuration",
            font=("Helvetica", 16, "bold")
        )
        title.pack(pady=(0, 15))

        # User selection
        user_frame = ttk.LabelFrame(self.container, text="Select User", padding=10)
        user_frame.pack(fill=tk.X, padx=20, pady=(0, 10))

        self.user_var = tk.StringVar()
        self.user_display_map = {}
        user_options = []
        seen_displays = {}
        for u in self.users:
            first = u.get("first_name", "")
            last = u.get("last_name", "")
            email = u.get("email", "")
            display = f"{first} {last} ({email})".strip()
            # Handle duplicate display names
            if display in seen_displays:
                seen_displays[display] += 1
                display = f"{display} [{seen_displays[display]}]"
            else:
                seen_displays[display] = 1
            user_options.append(display)
            self.user_display_map[display] = u

        if not user_options:
            ttk.Label(user_frame, text="No users found on this Zoom account.").pack()
            ttk.Button(
                self.container, text="Back", command=self._show_credentials_screen
            ).pack(pady=10)
            return

        self.user_combo = ttk.Combobox(
            user_frame, textvariable=self.user_var, values=user_options,
            state="readonly", width=55
        )
        self.user_combo.pack(fill=tk.X)
        self.user_combo.current(0)

        # Recording stats label
        self.stats_label = ttk.Label(user_frame, text="", font=("Helvetica", 10))
        self.stats_label.pack(anchor=tk.W, pady=(5, 0))

        # Date selection
        date_frame = ttk.LabelFrame(self.container, text="Date Range", padding=10)
        date_frame.pack(fill=tk.X, padx=20, pady=(0, 10))

        date_row = ttk.Frame(date_frame)
        date_row.pack(fill=tk.X)

        ttk.Label(date_row, text="Start Date (YYYY-MM-DD):").pack(side=tk.LEFT)
        default_start = (date.today() - relativedelta(months=6)).strftime("%Y-%m-%d")
        self.start_date_var = tk.StringVar(value=default_start)
        self.start_date_entry = ttk.Entry(date_row, textvariable=self.start_date_var, width=15)
        self.start_date_entry.pack(side=tk.LEFT, padx=(5, 15))

        ttk.Label(date_row, text="End Date:").pack(side=tk.LEFT)
        ttk.Label(date_row, text="Today", foreground="gray").pack(side=tk.LEFT, padx=5)

        # Scan button
        self.scan_btn = ttk.Button(
            date_frame, text="Scan Recordings", command=self._on_scan
        )
        self.scan_btn.pack(pady=(10, 0))

        # Download folder
        folder_frame = ttk.LabelFrame(self.container, text="Download Folder", padding=10)
        folder_frame.pack(fill=tk.X, padx=20, pady=(0, 10))

        folder_row = ttk.Frame(folder_frame)
        folder_row.pack(fill=tk.X)

        default_folder = os.path.join(os.path.expanduser("~"), "Downloads", "Zoom_Transcripts")
        self.folder_var = tk.StringVar(value=default_folder)
        ttk.Entry(folder_row, textvariable=self.folder_var, width=45).pack(side=tk.LEFT, fill=tk.X, expand=True)
        ttk.Button(folder_row, text="Browse...", command=self._browse_folder).pack(side=tk.LEFT, padx=(5, 0))

        # Download button
        btn_frame = ttk.Frame(self.container)
        btn_frame.pack(pady=10)

        self.download_btn = ttk.Button(
            btn_frame, text="Download Transcripts", command=self._on_download,
            state=tk.DISABLED
        )
        self.download_btn.pack(side=tk.LEFT, padx=5)

        ttk.Button(
            btn_frame, text="Back", command=self._show_credentials_screen
        ).pack(side=tk.LEFT, padx=5)

    def _browse_folder(self):
        folder = filedialog.askdirectory(
            title="Select Download Folder",
            initialdir=os.path.expanduser("~")
        )
        if folder:
            self.folder_var.set(folder)

    def _on_scan(self):
        start_str = self.start_date_var.get().strip()
        try:
            start_date = datetime.strptime(start_str, "%Y-%m-%d").date()
        except ValueError:
            messagebox.showwarning("Invalid Date", "Please enter a valid date in YYYY-MM-DD format.")
            return

        if start_date > date.today():
            messagebox.showwarning("Future Date", "Start date cannot be in the future.")
            return

        user_display = self.user_var.get()
        user = self.user_display_map.get(user_display)
        if not user:
            messagebox.showwarning("No User", "Please select a user.")
            return

        user_id = user.get("id", user.get("email", ""))

        self.scan_btn.config(state=tk.DISABLED)
        self.stats_label.config(text="Scanning recordings...", foreground="gray")
        self.root.update_idletasks()

        def _scan_progress(msg):
            def _update(m=msg):
                if self._current_screen != "config":
                    return
                try:
                    self.stats_label.config(text=m, foreground="gray")
                except tk.TclError:
                    pass
            self.root.after(0, _update)

        def do_scan():
            try:
                meetings = self.api.list_recordings(
                    user_id, start_date,
                    progress_callback=_scan_progress
                )
                self.meetings = meetings
                self.root.after(0, lambda: self._on_scan_complete(meetings))
            except ZoomAPIError as e:
                self.root.after(0, lambda: self._on_scan_error(str(e)))
            except Exception as e:
                self.root.after(0, lambda: self._on_scan_error(f"Unexpected error: {e}"))

        threading.Thread(target=do_scan, daemon=True).start()

    def _on_scan_complete(self, meetings):
        if self._current_screen != "config":
            return
        self.scan_btn.config(state=tk.NORMAL)

        total_meetings = len(meetings)
        transcript_count = 0
        for m in meetings:
            for rf in m.get("recording_files", []):
                if rf.get("file_type") == "TRANSCRIPT":
                    transcript_count += 1
                    break  # Count meeting once even if multiple transcript files

        self.stats_label.config(
            text=f"Found {total_meetings} meetings with cloud recordings, "
                 f"{transcript_count} with transcripts available.",
            foreground="black"
        )

        if transcript_count > 0:
            self.download_btn.config(state=tk.NORMAL)
        else:
            self.download_btn.config(state=tk.DISABLED)

    def _on_scan_error(self, message):
        if self._current_screen != "config":
            return
        self.scan_btn.config(state=tk.NORMAL)
        self.stats_label.config(text="", foreground="gray")
        messagebox.showerror("Scan Error", message)

    def _on_download(self):
        folder = self.folder_var.get().strip()
        if not folder:
            messagebox.showwarning("No Folder", "Please select a download folder.")
            return

        # Validate folder is writable
        try:
            os.makedirs(folder, exist_ok=True)
            test_file = os.path.join(folder, ".write_test")
            with open(test_file, "w") as f:
                f.write("test")
            os.remove(test_file)
        except OSError as e:
            messagebox.showerror(
                "Folder Error",
                f"Cannot write to the selected folder:\n{e}"
            )
            return

        self._show_download_screen(folder)

    # ─── Screen 3: Download Progress ─────────────────────────────────────

    def _show_download_screen(self, folder):
        self._clear_container()
        self._current_screen = "download"
        self.cancel_download = False

        title = ttk.Label(
            self.container, text="Downloading Transcripts",
            font=("Helvetica", 16, "bold")
        )
        title.pack(pady=(0, 10))

        # Progress bar
        self.progress_var = tk.DoubleVar(value=0)
        self.progress_bar = ttk.Progressbar(
            self.container, variable=self.progress_var,
            maximum=100, length=400, mode="determinate"
        )
        self.progress_bar.pack(fill=tk.X, padx=20, pady=(0, 5))

        self.progress_label = ttk.Label(self.container, text="Starting...", font=("Helvetica", 10))
        self.progress_label.pack()

        # Stats row
        stats_frame = ttk.Frame(self.container)
        stats_frame.pack(pady=5)

        self.success_var = tk.StringVar(value="Downloaded: 0")
        self.skipped_var = tk.StringVar(value="Skipped: 0")
        self.failed_var = tk.StringVar(value="Failed: 0")

        ttk.Label(stats_frame, textvariable=self.success_var, foreground="green").pack(side=tk.LEFT, padx=10)
        ttk.Label(stats_frame, textvariable=self.skipped_var, foreground="gray").pack(side=tk.LEFT, padx=10)
        ttk.Label(stats_frame, textvariable=self.failed_var, foreground="red").pack(side=tk.LEFT, padx=10)

        # Log area
        log_frame = ttk.Frame(self.container)
        log_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=10)

        self.log_text = tk.Text(
            log_frame, height=12, wrap=tk.WORD, state=tk.DISABLED,
            font=("Menlo", 10), bg="#f5f5f5"
        )
        scrollbar = ttk.Scrollbar(log_frame, orient=tk.VERTICAL, command=self.log_text.yview)
        self.log_text.config(yscrollcommand=scrollbar.set)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.log_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        # Buttons
        btn_frame = ttk.Frame(self.container)
        btn_frame.pack(pady=5)

        self.cancel_btn = ttk.Button(
            btn_frame, text="Cancel", command=self._on_cancel_download
        )
        self.cancel_btn.pack(side=tk.LEFT, padx=5)

        self.open_folder_btn = ttk.Button(
            btn_frame, text="Open Folder", command=lambda: self._open_folder(folder),
            state=tk.DISABLED
        )
        self.open_folder_btn.pack(side=tk.LEFT, padx=5)

        self.done_btn = ttk.Button(
            btn_frame, text="Back to Settings", command=self._show_config_screen,
            state=tk.DISABLED
        )
        self.done_btn.pack(side=tk.LEFT, padx=5)

        # Start download thread
        self.download_thread = threading.Thread(
            target=self._download_worker, args=(folder,), daemon=True
        )
        self.download_thread.start()

    def _log(self, message):
        """Thread-safe log append."""
        def _append():
            if self._current_screen != "download":
                return
            try:
                self.log_text.config(state=tk.NORMAL)
                self.log_text.insert(tk.END, message + "\n")
                self.log_text.see(tk.END)
                self.log_text.config(state=tk.DISABLED)
            except tk.TclError:
                pass  # Widget destroyed
        self.root.after(0, _append)

    def _update_progress(self, current, total, label_text):
        """Thread-safe progress update."""
        def _update():
            if self._current_screen != "download":
                return
            try:
                pct = (current / total * 100) if total > 0 else 0
                self.progress_var.set(pct)
                self.progress_label.config(text=label_text)
            except tk.TclError:
                pass
        self.root.after(0, _update)

    def _update_stats(self, success, skipped, failed):
        """Thread-safe stats update."""
        def _update():
            if self._current_screen != "download":
                return
            try:
                self.success_var.set(f"Downloaded: {success}")
                self.skipped_var.set(f"Skipped: {skipped}")
                self.failed_var.set(f"Failed: {failed}")
            except tk.TclError:
                pass
        self.root.after(0, _update)

    def _download_worker(self, folder):
        """Background worker that downloads all transcripts."""
        success_count = 0
        skipped_count = 0
        failed_count = 0
        log_entries = []

        # Gather all transcript files from meetings
        download_tasks = []
        for meeting in self.meetings:
            topic = meeting.get("topic", "Untitled")
            start_time_str = meeting.get("start_time", "")
            meeting_date = ""
            if start_time_str:
                try:
                    dt = datetime.fromisoformat(start_time_str.replace("Z", "+00:00"))
                    meeting_date = dt.strftime("%Y-%m-%d")
                except (ValueError, TypeError):
                    meeting_date = "Unknown-Date"

            transcript_files = [
                rf for rf in meeting.get("recording_files", [])
                if rf.get("file_type") == "TRANSCRIPT"
            ]

            if not transcript_files:
                skipped_count += 1
                log_entries.append(f"SKIPPED (no transcript): {meeting_date} - {topic}")
                self._log(f"[SKIP] {meeting_date} - {topic} (no transcript)")
                self._update_stats(success_count, skipped_count, failed_count)
                continue

            for tf in transcript_files:
                dl_url = tf.get("download_url", "")
                if not dl_url:
                    failed_count += 1
                    log_entries.append(f"FAILED (no download URL): {meeting_date} - {topic}")
                    self._log(f"[FAIL] {meeting_date} - {topic} (no download URL)")
                    self._update_stats(success_count, skipped_count, failed_count)
                    continue
                download_tasks.append({
                    "topic": topic,
                    "date": meeting_date or "Unknown-Date",
                    "download_url": dl_url,
                    "meeting": meeting,
                })

        total_tasks = len(download_tasks) + skipped_count + failed_count
        processed = skipped_count + failed_count

        if not download_tasks:
            self._log("No transcripts to download.")
            self._update_progress(1, 1, "Complete - no transcripts found")
            self._download_complete()
            # Write log even if empty
            self._write_log_file(folder, log_entries)
            return

        self._update_progress(processed, total_tasks, f"Downloading 0/{len(download_tasks)} transcripts...")

        for i, task in enumerate(download_tasks):
            if self.cancel_download:
                self._log("Download cancelled by user.")
                log_entries.append("--- CANCELLED ---")
                break

            topic = task["topic"]
            meeting_date = task["date"]
            download_url = task["download_url"]

            safe_topic = sanitize_filename(topic)
            filename = f"{meeting_date}_{safe_topic}.vtt"
            filepath = os.path.join(folder, filename)
            filepath = make_unique_path(filepath)

            self._log(f"[DOWNLOADING] {meeting_date} - {topic}")
            self._update_progress(
                processed, total_tasks,
                f"Downloading {i + 1}/{len(download_tasks)}: {topic[:40]}..."
            )

            try:
                self.api.download_transcript(download_url, filepath)
                success_count += 1
                log_entries.append(f"DOWNLOADED: {meeting_date} - {topic} -> {os.path.basename(filepath)}")
                self._log(f"[OK] Saved: {os.path.basename(filepath)}")
            except ZoomAPIError as e:
                failed_count += 1
                log_entries.append(f"FAILED: {meeting_date} - {topic} - Error: {e}")
                self._log(f"[FAIL] {meeting_date} - {topic}: {e}")
            except Exception as e:
                failed_count += 1
                log_entries.append(f"FAILED: {meeting_date} - {topic} - Error: {e}")
                self._log(f"[FAIL] {meeting_date} - {topic}: {e}")

            processed += 1
            self._update_stats(success_count, skipped_count, failed_count)
            self._update_progress(processed, total_tasks, f"Downloading {i + 1}/{len(download_tasks)}...")

            time.sleep(0.3)  # Rate limiting between downloads

        # Write summary log
        self._write_log_file(folder, log_entries)

        if self.cancel_download:
            final_msg = f"Cancelled: {success_count} downloaded, {skipped_count} skipped, {failed_count} failed"
        else:
            final_msg = f"Complete: {success_count} downloaded, {skipped_count} skipped, {failed_count} failed"
        self._update_progress(total_tasks, total_tasks, final_msg)
        self._log(f"\n{final_msg}")
        self._log(f"Log saved to: {os.path.join(folder, 'download_log.txt')}")
        self._download_complete()

    def _write_log_file(self, folder, log_entries):
        """Write the download summary log."""
        try:
            os.makedirs(folder, exist_ok=True)
            log_path = os.path.join(folder, "download_log.txt")
            with open(log_path, "w") as f:
                f.write(f"Zoom Transcript Download Log\n")
                f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                f.write(f"{'=' * 60}\n\n")
                for entry in log_entries:
                    f.write(f"{entry}\n")
                f.write(f"\n{'=' * 60}\n")
                f.write(f"Total entries: {len(log_entries)}\n")
        except OSError as e:
            self._log(f"Warning: Could not write log file: {e}")

    def _download_complete(self):
        """Called when download is done."""
        def _finish():
            if self._current_screen != "download":
                return
            try:
                self.cancel_btn.config(state=tk.DISABLED)
                self.open_folder_btn.config(state=tk.NORMAL)
                self.done_btn.config(state=tk.NORMAL)
            except tk.TclError:
                pass
        self.root.after(0, _finish)

    def _on_cancel_download(self):
        self.cancel_download = True
        self.cancel_btn.config(state=tk.DISABLED)

    def _open_folder(self, folder):
        """Open the download folder in Finder."""
        if sys.platform == "darwin":
            subprocess.run(["open", folder])
        elif sys.platform == "win32":
            subprocess.run(["explorer", folder])
        else:
            subprocess.run(["xdg-open", folder])

    # ─── Utilities ───────────────────────────────────────────────────────

    def _clear_container(self):
        """Remove all widgets from the container."""
        # Signal any running download thread to stop
        self.cancel_download = True
        for widget in self.container.winfo_children():
            widget.destroy()


def main():
    root = tk.Tk()
    app = ZoomTranscriptApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()
