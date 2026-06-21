# Security Policy

## Scope

This document defines security practices for the Couples App repository and deployment.

The project is a static HTML SPA that uses Supabase as a backend and runtime credential injection for production.

## Threat Model

Primary risk categories:

- Credential exposure in source code
- Credential exposure in git history
- Accidental commit of local config files
- Weak runtime configuration handling
- Unvalidated deployment configuration
- Misleading operational documentation

## Data and Access Model

The application stores shared couple data in Supabase table `couple_data`.

Data includes:

- Profile and display settings
- Todos and shopping data
- Events and notes
- Memories and love notes
- Expense, debt, and bill tracking data

Access is currently controlled by:

- Supabase anon key for API access
- PIN gate in UI for shared app access
- Session storage marker for unlocked state

## Credentials

Credentials required at runtime:

- `SUPABASE_URL`
- `SUPABASE_KEY`
- `COUPLES_APP_PIN`

Credentials must not be hardcoded in tracked files.

Credentials must not be committed in git history.

Credentials must not be stored in markdown examples as real values.

## Local Development Security

Use local `config.js` only for development.

`config.js` must stay untracked.

`config.js` must be ignored by `.gitignore`.

Local setup:

1. Copy `config.example.js` to `config.js`
2. Insert real local values
3. Verify `.gitignore` prevents staging of `config.js`
4. Run `git status` before commit

Required checks:

- `git check-ignore -v config.js`
- `git status --short`

## Production Security

Production runtime config is injected from `functions/api/env.js`.

`/api/env` returns a script that initializes `window.__ENV`.

Environment values are escaped before output.

Recommended headers:

- `Content-Type: application/javascript; charset=utf-8`
- `Cache-Control: max-age=300`

No secret should be embedded in static HTML source.

No secret should be committed in deployment config files.

## Secure Coding Rules

- Read credentials from `window.__ENV`
- Fail fast if required env values are missing
- Keep `console.error` for real runtime failures
- Remove debug-only logging from production code
- Avoid storing long-lived secrets in browser storage

## Git Hygiene

Before each push:

1. `git status --short`
2. `git diff --staged`
3. Search for token-like patterns in staged content
4. Confirm no local config files staged

Repository checks:

- `git log --all --full-history -- config.js`
- `git log --all -S SUPABASE_KEY --oneline`
- `git log --all -S SUPABASE_URL --oneline`

## Incident Response

If exposure is suspected:

1. Rotate Supabase keys immediately
2. Replace deployment secrets
3. Invalidate local copies of leaked credentials
4. Rewrite history if real secrets were committed
5. Verify no reachable commit still contains leaked values
6. Document root cause and prevention changes

## Audit Checklist

Use this list for recurring repository security checks.

- [ ] `config.js` is ignored
- [ ] `config.example.js` contains placeholders only
- [ ] No hardcoded key in `index.html`
- [ ] No hardcoded key in `functions/api/env.js`
- [ ] No key-like token in tracked markdown files
- [ ] No debug console logging in production code
- [ ] README language is measured and accurate
- [ ] License file present
- [ ] Security and project guidelines present

## Deployment Verification

Post-deploy checks:

1. App loads without config error
2. `/api/env` responds with script payload
3. `window.__ENV` contains expected keys
4. Browser console has no auth bootstrap errors
5. Supabase requests return expected status codes

## Storage and Retention Notes

- Session auth marker uses `sessionStorage`
- No password is persisted in repository files
- Data persistence happens in Supabase only

## Security Boundaries

Current model is suitable for personal/shared planning use.

This repository does not implement enterprise identity or RBAC.

PIN-based app gating should not be treated as high-assurance authentication.

## Future Security Improvements

- Add stronger access model if multi-user auth is introduced
- Add stricter request authorization if backend expands
- Add automated pre-commit secret scanning
- Add CI checks for key-pattern regressions
- Add content security policy review for deployment

## Contact and Ownership

Repository owner is responsible for:

- Secret rotation
- Deployment secret updates
- Security review cadence
- Incident handling

## Revision History

- 2026-06-21: Initial formal policy added

## Appendix A: Operational Controls

### A.1 Access Control

- Use least privilege for dashboard and project administration.
- Limit who can edit deployment secrets.
- Review access list on a recurring cadence.

### A.2 Secret Rotation Cadence

- Rotate Supabase anon key if exposure is suspected.
- Rotate all deployment secrets after repository transfer.
- Rotate credentials after accidental screenshot or paste leakage.

### A.3 Secret Handling Rules

- Never paste real keys in issue comments.
- Never include real keys in commit messages.
- Never include real keys in markdown examples.
- Never include secrets in analytics or telemetry payloads.

### A.4 Build and Deploy Controls

- Treat deployment settings as security-sensitive.
- Verify environment variables are set in production project scope.
- Confirm no fallback hardcoded credentials exist before release.

## Appendix B: Review Procedures

### B.1 Weekly Security Review

1. Pull latest main branch.
2. Run status and tracked file checks.
3. Scan tracked source for token-like patterns.
4. Scan for debug logging regressions.
5. Validate docs still match implementation.

### B.2 Monthly Deep Review

1. Re-run git history keyword checks.
2. Review commit messages for professionalism.
3. Verify all required docs are present.
4. Verify local secret files are still ignored.
5. Test deployment env bootstrap endpoint.

### B.3 Pre-release Security Gate

- [ ] Runtime config read path verified.
- [ ] No credential-like string in tracked source.
- [ ] No local secret files staged.
- [ ] Security docs updated for architecture changes.

## Appendix C: Data Protection Controls

### C.1 Transport Security

- Use HTTPS endpoints only.
- Do not allow mixed-content API calls.

### C.2 Input and Output Safety

- Keep user content escaped when rendered in HTML contexts.
- Validate and clamp numeric values for financial fields.
- Reject invalid date and amount states before persistence.

### C.3 Error Messaging

- User messages should be informative but not leak internals.
- Keep stack-like technical detail in console error only.

## Appendix D: Emergency Runbook

### D.1 Immediate Response Timeline

- Within 15 minutes: rotate the affected key.
- Within 30 minutes: update deployment secrets.
- Within 60 minutes: validate live app with new credentials.
- Within 24 hours: complete post-incident report.

### D.2 Post-incident Checklist

- [ ] Incident root cause identified.
- [ ] Key rotation confirmed.
- [ ] History remediation assessed.
- [ ] Prevention tasks added to roadmap.

## Appendix E: Security Command Reference

- `git status --short`
- `git ls-files`
- `git check-ignore -v config.js`
- `git log --all --full-history -- config.js`
- `git log --all -S SUPABASE_KEY --oneline`
- `git log --all -S SUPABASE_URL --oneline`

## Appendix F: Change Approval Rules

- Security-affecting changes require explicit verification notes.
- Credential loading changes require local and deployment checks.
- `.gitignore` secret-rule changes require peer review when possible.

## Appendix G: Training Notes

- Keep examples sanitized and non-secret.
- Avoid confidence claims without evidence.
- Prefer reproducible command outputs.

## Appendix H: Security Maintenance Calendar

- Week 1: secret and status checks.
- Week 2: docs consistency check.
- Week 3: deployment endpoint verification.
- Week 4: roadmap and policy updates.

## Appendix I: Verification Log Template

Use this template when recording security checks.

- Date:
- Reviewer:
- Branch:
- Result summary:
- Open risks:
- Follow-up tasks:

## Appendix J: Sign-off Criteria

- all secret handling checks pass
- no unapproved risk exceptions remain
- action items entered into roadmap
