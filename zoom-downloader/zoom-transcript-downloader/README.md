# Zoom Transcript Downloader

A macOS desktop application that downloads Zoom cloud recording transcripts via the Zoom API.

## Prerequisites

- Python 3.8+ (with tkinter, which ships with Python on macOS)
- A Zoom Server-to-Server OAuth app (see setup below)

## Setup

### 1. Create a Zoom Server-to-Server OAuth App

1. Go to [marketplace.zoom.us](https://marketplace.zoom.us/) and sign in
2. Click **Develop** > **Build App**
3. Choose **Server-to-Server OAuth** and click **Create**
4. Give your app a name (e.g., "Transcript Downloader")
5. Note down the **Account ID**, **Client ID**, and **Client Secret**
6. Go to the **Scopes** tab and add the following scopes:
   - `cloud_recording:read:list_recording_files`
   - `cloud_recording:read:list_user_recordings`
   - `user:read:list_users:admin`
7. Click **Activate** to activate the app

### 2. Install Python Dependencies

```bash
cd zoom-transcript-downloader
pip install -r requirements.txt
```

### 3. Run the Application

```bash
python main.py
```

## Usage

1. **Connect**: Enter your Account ID, Client ID, and Client Secret, then click "Connect"
2. **Configure**: Select a user from the dropdown, set a start date, choose a download folder, and click "Scan Recordings" to see what's available
3. **Download**: Click "Download Transcripts" to begin downloading all available VTT transcript files

## File Organization

Transcripts are saved as `.vtt` files named: `YYYY-MM-DD_Meeting-Topic.vtt`

A `download_log.txt` summary is created in the download folder listing every meeting processed.

## Troubleshooting

- **"Authentication failed"**: Double-check your Account ID, Client ID, and Client Secret. Make sure the app is activated.
- **"No users found"**: Ensure the `user:read:list_users:admin` scope is enabled on your Zoom app.
- **"No transcripts"**: Cloud recording transcription must be enabled in your Zoom account settings (Settings > Recording > Cloud recording > Audio transcript).
