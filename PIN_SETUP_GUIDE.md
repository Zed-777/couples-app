# 🔐 PIN Authentication Setup Guide

## Overview

The Couples App now uses **PIN-based authentication** with environment-injected secrets. This replaces individual user accounts with a **shared 4-6 digit PIN** that works on any device.

**Architecture**: 
- PIN entered once per session
- Stored in `sessionStorage` (auto-clears on tab close)
- Never hardcoded; injected via Cloudflare Pages environment variables
- Site-specific naming (`COUPLES_APP_PIN`) allows reuse for other apps

---

## Setup Steps

### 1️⃣ Local Development (Already Configured)

**File**: `config.js` (local, untracked)

```javascript
window.__ENV = {
    SUPABASE_URL: '[YOUR_SUPABASE_URL]',
  SUPABASE_KEY: '[YOUR_ANON_KEY]',
  COUPLES_APP_PIN: '123456'  // ← Change to your PIN
};
```

**To test locally:**
1. Open `index.html` in browser
2. Enter PIN (default: `123456`)
3. App loads and stays unlocked until tab closes

---

### 2️⃣ Production Deployment (Cloudflare Pages)

**Required**: Add `COUPLES_APP_PIN` to Cloudflare environment variables

#### Steps:

1. **Go to Cloudflare Pages Dashboard**
    - Open your Cloudflare account dashboard
    - Select your Pages project

2. **Navigate to Settings → Environment variables**
   - Click "Add environment variable"

3. **Add the PIN environment variable:**
   - **Name**: `COUPLES_APP_PIN`
   - **Value**: Your desired PIN (e.g., `789012`)
   - **Environments**: Select `Production` (and `Preview` if you want PIN on preview builds)

4. **Redeploy** (or wait for next push to main branch)
   - The function `functions/api/env.js` will now inject your PIN

---

## How It Works

### User Flow

```
User visits site
    ↓
sessionStorage checked for COUPLES_APP_AUTH
    ↓
NOT AUTHENTICATED? 
    ↓
PIN Modal appears (blocking overlay)
    ↓
User enters PIN + clicks "Unlock"
    ↓
JavaScript validates against window.__ENV.COUPLES_APP_PIN
    ↓
CORRECT?
    ✓ YES  → Set sessionStorage → Hide modal → Load app
    ✗ NO   → Show error → Clear input → Allow retry
    ↓
App fully accessible until tab closes
```

### Session Management

| Scenario | Behavior |
|----------|----------|
| **New tab opened** | PIN required (fresh sessionStorage) |
| **Tab refreshed** | PIN required (sessionStorage cleared by refresh) |
| **Tab stays open** | No PIN required (sessionStorage persists) |
| **Browser closed** | All sessions cleared (secure) |
| **Multiple tabs** | Each tab has independent session |

---

## Multi-App Reuse Pattern

This PIN auth system is **designed for reuse** across multiple apps sharing Supabase:

### For a second app (e.g., Family Planner):

1. **Create new environment variable on Cloudflare:**
   - Name: `FAMILY_PLANNER_PIN`
   - Value: Different PIN (e.g., `654321`)

2. **Update app code:**
   ```javascript
   // In config.js for Family Planner
   window.__ENV = {
    SUPABASE_URL: '[SHARED_SUPABASE_URL]',
    SUPABASE_KEY: '[SHARED_ANON_KEY]',
    FAMILY_PLANNER_PIN: '[APP_PIN]'  // ← Site-specific naming
   };
   ```

3. **Update PIN functions:**
   ```javascript
   const PIN_ENV_VAR = 'FAMILY_PLANNER_PIN';  // ← Just change this
   function checkPIN() {
     const correctPIN = window.__ENV?.[PIN_ENV_VAR] || '';
     // ... rest same
   }
   ```

**Benefits:**
- Each app has its own PIN
- Users don't need per-app authentication (PIN is universal)
- Shared Supabase tables stay organized by app
- No database needed for auth—pure environment-based

---

## Security Notes

✅ **Strong Points:**
- PIN not in Git (secure)
- PIN not visible in browser code (environment-injected)
- Session-only (auto-clears)
- Works on any device with PIN
- Simple attack surface

⚠️ **Limitations:**
- No per-user audit trail (shared PIN can't track who accessed)
- Not GDPR-suitable for multi-user apps
- PIN visible in browser console (acceptable for shared couples app)
- No rate limiting (could add in future)

---

## Testing Checklist

- [ ] Local: PIN modal appears on first load
- [ ] Local: Wrong PIN shows error
- [ ] Local: Correct PIN unlocks app
- [ ] Local: Refresh page → PIN required again
- [ ] Local: Open app → close tab → reopen → PIN required
- [ ] Deployed: Cloudflare env variable set
- [ ] Deployed: PIN modal appears on your deployed Pages domain
- [ ] Deployed: Correct PIN from config.js unlocks app
- [ ] Deployed: Close/reopen tab → PIN required again

---

## Troubleshooting

### "PIN not configured. Contact admin."
**Problem**: `COUPLES_APP_PIN` not in Cloudflare environment variables  
**Solution**: 
1. Check Cloudflare Pages dashboard → Settings → Environment variables
2. Confirm `COUPLES_APP_PIN` is added and saved
3. Redeploy or wait ~1 minute for variable to propagate

### PIN modal stuck after entering PIN
**Problem**: App not loading after correct PIN  
**Solution**:
1. Open browser console (F12)
2. Check for errors in `init()` function
3. Likely cause: Supabase connection failed
4. Verify `SUPABASE_URL` and `SUPABASE_KEY` are set

### PIN works locally but not deployed
**Problem**: `config.js` not being loaded in production  
**Solution**:
1. `config.js` is only for local dev (in `.gitignore`)
2. Production MUST use Cloudflare environment variables
3. Check that `functions/api/env.js` is deployed and returns PIN

---

## Future Enhancements

- 🔄 Rate limiting: Disable PIN input for 30s after 3 wrong attempts
- 👤 Change PIN: Add PIN reset in settings
- 🔔 Notifications: Optional reminder to log out after inactivity
- 📱 Biometric: Allow Face/Touch ID unlock on supported devices
- 🔐 Master PIN: Admin PIN for different access level

