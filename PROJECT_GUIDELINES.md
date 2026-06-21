# Project Guidelines

## 1. Project Overview

Couples App is a single-page static HTML application for shared personal planning.

It uses a Supabase backend table (`couple_data`) and runtime environment injection for credentials.

This repository is optimized for simple deployment and low maintenance.

## 2. Goals

Primary goals:

- Keep app setup simple
- Keep code understandable in a single file
- Keep credentials out of tracked source
- Keep feature behavior stable across mobile and desktop

## 3. Technology Stack

- HTML/CSS/JavaScript in `index.html`
- Supabase REST API
- Cloudflare Pages Functions for env injection (`functions/api/env.js`)

## 4. Repository Files

Core tracked files:

- `index.html`
- `functions/api/env.js`
- `README.md`
- `MPDP.md`
- `PIN_SETUP_GUIDE.md`
- `SECURITY.md`
- `PROJECT_GUIDELINES.md`
- `AGENT_PRACTICE_STANDARDS.md`
- `config.example.js`
- `package.json`
- `LICENSE`
- `.gitignore`

Local untracked files should include:

- `config.js`
- local backup files
- IDE caches

## 5. Architecture

### 5.1 UI Model

The app is view-driven.

A top-level state object stores all loaded entities.

Rendering functions generate HTML per active view.

### 5.2 Data Model

Supabase table key/value entries are used for feature segments.

Examples:

- `profile`
- `todos_his`
- `todos_her`
- `events`
- `notes`
- `expenses`
- `debts`
- `bills`

### 5.3 Runtime Config

Credentials are read from `window.__ENV`.

If required values are missing, app bootstrap should fail with clear error.

## 6. Coding Standards

### 6.1 JavaScript

- Prefer small, focused functions
- Keep naming descriptive
- Keep side effects explicit
- Keep error paths visible with `try/catch`

### 6.2 Rendering

- Keep each view renderer isolated
- Keep state reads predictable
- Avoid duplicated calculations where possible

### 6.3 Error Handling

- User-facing message via toast/flash
- Technical detail via `console.error`
- No silent failures for persistence operations

## 7. Security Rules

- Never hardcode secrets
- Never commit `config.js`
- Keep examples placeholder-only
- Verify git status before commit

See `SECURITY.md` for full policy.

## 8. Development Workflow

### 8.1 Start

1. Create `config.js` from `config.example.js`
2. Set local values
3. Open app in browser
4. Validate Supabase connectivity

### 8.2 Implement

1. Identify target function(s)
2. Keep edits minimal and scoped
3. Preserve style and behavior outside requested scope
4. Add tests/checks where practical

### 8.3 Verify

For each change:

- Validate runtime behavior in browser
- Validate no syntax errors
- Validate persistence paths
- Validate no new secret leakage

### 8.4 Commit

Use professional commit format:

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `security: ...`

## 9. Quality Checklist

Before push:

- [ ] `git status --short` reviewed
- [ ] only intended files staged
- [ ] no local secrets staged
- [ ] no debug logging added
- [ ] no broken render path
- [ ] no syntax errors

## 10. Performance Guidance

- Avoid repeated heavy computations in render loops
- Reuse derived values where possible
- Keep list rendering bounded where practical
- Avoid unnecessary DOM churn

## 11. UX Guidance

- Keep action labels clear
- Keep card-level summaries concise
- Keep visual hierarchy stable across views
- Avoid regressions to existing navigation patterns

## 12. Data Consistency Guidance

- Clamp paid values to debt total where needed
- Prevent negative remaining amounts
- Prevent overpayment in update flows
- Keep top summary and card details derived from same source values

## 13. Testing Checklist by Feature

### 13.1 Expenses

- Add expense
- Delete expense
- Settle up flow
- Verify top expense balance

### 13.2 Debts

- Add debt
- Add payment
- Prevent overpayment
- Verify card text: paid, total, remaining
- Verify top debt aggregate card

### 13.3 Notes

- Add/edit/delete note
- Pinned behavior
- Filter behavior

### 13.4 Calendar

- Add event
- Delete event
- Verify date rendering

## 14. Deployment Workflow

### 14.1 Cloudflare Pages

- Push to main
- Wait for deployment completion
- Validate app load
- Validate `/api/env` output

### 14.2 Runtime Validation

- `window.__ENV` contains required keys
- API calls authenticate successfully
- No startup config exceptions

## 15. Documentation Policy

Keep docs measured and factual.

Avoid inflated claims.

Update docs when behavior changes.

Required docs:

- `README.md`
- `SECURITY.md`
- `PROJECT_GUIDELINES.md`
- `MPDP.md`

## 16. Branch and PR Guidance

Even for small repos:

- Keep changes scoped
- Keep commit messages specific
- Avoid mixing docs and logic when possible

## 17. Collaboration Rules

- Explain intent before major changes
- Preserve user-authored unrelated edits
- Never revert unknown changes without explicit request
- Surface blockers early

## 18. Maintenance Cadence

Suggested cadence:

- Weekly: quick status and security sanity check
- Monthly: dependency and deployment review
- Quarterly: doc and architecture cleanup

## 19. Commands Reference

Useful commands:

- `git status --short`
- `git log --oneline -20`
- `git check-ignore -v config.js`
- `git ls-files`

## 20. Out of Scope

Current repository intentionally does not include:

- Build pipeline
- TypeScript transpilation
- Server-side auth middleware

## 21. Revision History

- 2026-06-21: Initial formal guidelines document

## 22. Coding Patterns

### 22.1 State Mutation Pattern

- mutate state in one place per operation
- persist after mutation
- rollback on persistence failure when practical

### 22.2 Modal Workflow Pattern

- open modal with prefilled values
- validate inputs before mutation
- close modal only after successful operation when possible

### 22.3 Financial Calculation Pattern

- compute totals from normalized numeric values
- clamp to avoid negative remaining values
- use same formulas for summary and detail views

## 23. UI Consistency Rules

- use existing card spacing and border style tokens
- keep button labels action-oriented and short
- keep section labels uppercase and concise
- avoid introducing one-off visual patterns unless required

## 24. Accessibility Guidance

- ensure button text is clear without emoji context
- preserve readable contrast with existing variables
- avoid hiding critical status in color alone

## 25. Validation Rules by Field Type

### 25.1 Text Fields

- trim leading and trailing whitespace
- reject empty required text

### 25.2 Numeric Fields

- parse using existing helper conversion
- reject NaN and negative values where invalid
- clamp paid amounts to total debt

### 25.3 Date Fields

- require valid date for date-dependent entities
- use ISO-compatible date strings for persistence

## 26. Testing Matrix

### 26.1 Manual Happy Path

- new profile setup
- PIN unlock flow
- add and delete item per major feature

### 26.2 Manual Edge Cases

- empty fields
- overpayment attempt
- duplicate saves from rapid clicks

### 26.3 Regression Focus Areas

- home navigation shortcuts
- money summary cards
- note/love-note read and filter behavior

## 27. Documentation Update Matrix

When changing security behavior:

- update `SECURITY.md`
- update `README.md` setup notes

When changing architecture:

- update `PROJECT_GUIDELINES.md`
- update `MPDP.md` status section

When changing agent workflows:

- update `AGENT_PRACTICE_STANDARDS.md`

## 28. Release Checklist

- [ ] pull latest main
- [ ] apply scoped change
- [ ] run validation checks
- [ ] inspect staged diff
- [ ] commit with clear type prefix
- [ ] push and verify deployment

## 29. Rollback Strategy

Preferred rollback approach:

- use `git revert` for published commits
- avoid history rewrite on shared branch unless explicitly required

Rollback checklist:

- identify bad commit hash
- revert and run checks
- verify runtime behavior
- push revert commit

## 30. Common Failure Modes

- stale local config not matching deployment config
- mixed formulas between summary and detail cards
- accidentally reintroducing debug logs
- markdown docs drifting from actual behavior

## 31. Mitigation Playbook

- centralize formulas in one function where practical
- validate before and after every persistence operation
- maintain short feedback loops with incremental checks

## 32. Command Quick Reference

- `git status --short`
- `git log --oneline -15`
- `git diff --staged`
- `git check-ignore -v config.js`
- `git ls-files`

## 33. Contribution Boundaries

- keep non-requested cleanup out of feature commits
- preserve user edits unless instructed otherwise
- report unexpected file changes immediately

## 34. Future Enhancements Guidance

- prefer additive enhancements over disruptive rewrites
- preserve persisted data shape compatibility
- document migration steps for data model changes

## 35. Long-term Maintainability

- revisit large single-file constraints periodically
- split modules only when complexity justifies it
- preserve clear ownership of core formulas and state

## 36. Governance Notes

- this document is authoritative for workflow standards
- conflicting one-off notes should be reconciled here

## 37. Additional Revision History

- 2026-06-21: expanded workflow, testing, rollback, and governance sections

## 38. Audit Log Template

Use this template after major updates.

- Date:
- Scope:
- Files changed:
- Validation commands:
- Result:
- Residual risk:

## 39. Release Notes Template

- Summary:
- User-visible changes:
- Security changes:
- Migration notes:
- Rollback plan:

## 40. Additional Governance Notes

- keep this file aligned with actual workflow
- remove outdated instructions during review cycles
