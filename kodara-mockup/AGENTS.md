# Agent Guidelines

## Development Server Management

### Requirement: Restart Server on Feature Updates
Whenever a new feature is implemented, especially those involving:
- Changes to configuration files (e.g., `vite.config.ts`, `tailwind.config.js`)
- New file creations (components, contexts, hooks)
- Significant refactoring of core logic
- Updates to demo configurations that might be cached

**The development server MUST be restarted.**

This ensures that:
1.  Vite's HMR (Hot Module Replacement) doesn't get into an inconsistent state.
2.  New files are properly indexed and served.
3.  The user sees the most up-to-date version of the application without needing to manually troubleshoot caching issues.

### How to Restart
1.  Kill the existing process: `pkill -f vite`
2.  Start the server again: `./node_modules/.bin/vite --host 127.0.0.1`
