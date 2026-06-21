# Couples App

Couples App is a stable single-page HTML application for shared planning and relationship tracking.

It is designed for deployment on static hosts (for example Cloudflare Pages) with runtime environment injection for Supabase credentials.

## Features

- Shared PIN gate for session access
- Todo management (his/her)
- Shopping list
- Goals and progress steps
- Calendar events
- Notes and love notes
- Memories and bucket items
- Expenses, debts, and bills
- Date jar ideas

## Tech Stack

- Frontend: single-file HTML, CSS, and JavaScript in [index.html](index.html)
- Backend: Supabase REST API table (`couple_data`)
- Hosting: Cloudflare Pages + Pages Functions

## Repository Structure

- [index.html](index.html): main SPA UI and client logic
- [functions/api/env.js](functions/api/env.js): runtime environment injector for deployment
- [MPDP.md](MPDP.md): project roadmap and progress tracking
- [PIN_SETUP_GUIDE.md](PIN_SETUP_GUIDE.md): PIN setup and deployment instructions
- [config.example.js](config.example.js): local config template (safe placeholders)
- [.gitignore](.gitignore): ignore rules for secrets and local artifacts

## Local Development

1. Copy [config.example.js](config.example.js) to `config.js`.
2. Fill in real values for:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `COUPLES_APP_PIN`
3. Serve the repo root with any static server, or open [index.html](index.html) directly if your browser setup allows local script loading.

Example local config shape:

```javascript
window.__ENV = {
  SUPABASE_URL: 'https://YOUR_PROJECT.supabase.co',
  SUPABASE_KEY: 'YOUR_SUPABASE_ANON_KEY',
  COUPLES_APP_PIN: '123456'
};
```

## Deployment

Cloudflare Pages setup:

1. Deploy repository root to Cloudflare Pages.
2. Add project secrets in Cloudflare Pages settings:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `COUPLES_APP_PIN`
3. Confirm the function endpoint [functions/api/env.js](functions/api/env.js) is active at `/api/env`.
4. Verify the app initializes correctly with runtime config.

## Security Notes

- Do not commit `config.js`.
- Keep all credentials in local ignored files or deployment secrets.
- Rotate keys immediately if exposure is suspected.
- See [SECURITY.md](SECURITY.md) for operational security policy.

## Status

Current phase and development history are tracked in [MPDP.md](MPDP.md).

