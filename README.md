# Couples App

Couples App is a stable single-page HTML application for shared planning and relationship tracking.

It is designed for deployment on static hosts (for example Cloudflare Pages) with runtime environment injection for Supabase credentials.

## Status

- **Demo / learning project.** MVP, actively in development.
- There is no login: every visitor uses the same public Supabase anon key, so anyone with the link can read and change the data. Do not store real personal information in it.
- Moving to real accounts (Supabase Auth with per-couple row-level security) is the next security milestone. See [SECURITY.md](SECURITY.md).

## Features

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

- [SUPPORT.md](SUPPORT.md): support and sponsorship guidance

- [MPDP.md](MPDP.md): project roadmap and progress tracking

- [config.example.js](config.example.js): local config template (safe placeholders)

- [.gitignore](.gitignore): ignore rules for secrets and local artifacts

## Local Development

1. Copy [config.example.js](config.example.js) to `config.js`.

2. Fill in real values for:

   - `SUPABASE_URL`

   - `SUPABASE_KEY` (the anon key, never the service_role key)

3. Serve the repo root with any static server, or open [index.html](index.html) directly if your browser setup allows local script loading.

Example local config shape:

```javascript
window.__ENV = {
  SUPABASE_URL: 'YOUR_SUPABASE_URL',
  SUPABASE_KEY: 'YOUR_SUPABASE_ANON_KEY'
};
```

## Deployment

Cloudflare Pages setup:

1. Deploy repository root to Cloudflare Pages.

2. Add project secrets in Cloudflare Pages settings:

   - `SUPABASE_URL`

   - `SUPABASE_KEY`

3. Confirm the function endpoint [functions/api/env.js](functions/api/env.js) is active at `/api/env`.

4. Verify the app initializes correctly with runtime config.

## Security Notes

- The anon key and project URL reach every visitor's browser by design. They are not secrets; access control has to come from Supabase Auth and RLS.
- Never put the service_role key, passwords or PINs in `/api/env` or in client code.
- User content is HTML-escaped before rendering, and record ids are sanitised before use in inline handlers.
- [_headers](_headers) sets a Content-Security-Policy and other security headers on Cloudflare Pages and Netlify.
- Do not commit `config.js`.

- Keep all credentials in local ignored files or deployment secrets.

- Rotate keys immediately if exposure is suspected.

- See [SECURITY.md](SECURITY.md) for operational security policy.

## Status

Current phase and development history are tracked in [MPDP.md](MPDP.md).
