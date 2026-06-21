# Agent Practice Standards

## 1. Purpose

This document defines how coding agents should operate in this repository.

Goals:

- keep security practices consistent
- keep changes reliable and reviewable
- avoid regressions and accidental data exposure
- enforce clear communication and verification

## 2. Working Principles

### 2.1 Diagnose Before Editing

- identify root cause before proposing changes
- avoid symptom-only fixes
- confirm assumptions with direct evidence
- document what is known and what is uncertain

### 2.2 Keep Scope Tight

- change only files relevant to the request
- avoid unrelated refactors during targeted fixes
- preserve existing style unless there is a required reason to alter it

### 2.3 Verify Every Claim

- do not claim success without checks
- prefer deterministic checks over guesswork
- run syntax or lint checks where available

### 2.4 Preserve User Intent

- follow explicit user request first
- ask clarifying questions only when truly blocked
- do not undo user changes unless requested

## 3. Environment Awareness

- distinguish local, deployment, and runtime contexts
- never assume local shell state equals user browser state
- mention when a result is inferred rather than directly verified

## 4. Security Standards

### 4.1 Credentials

- never hardcode secrets in tracked code
- read runtime credentials from `window.__ENV`
- keep `config.js` untracked and ignored
- maintain `config.example.js` with placeholders only

### 4.2 Git Hygiene

Before commit:

- run `git status --short`
- inspect staged diff
- verify no secret files are staged

### 4.3 Logging

- remove debug logging (`console.log`, `console.debug`, `console.table`, `console.info`) from production paths
- keep `console.error` for actionable failures

## 5. Code Quality Standards

### 5.1 Function Design

- use descriptive names
- keep functions focused
- keep side effects explicit
- avoid hidden global mutation unless intentional and documented

### 5.2 Error Handling

- wrap persistence calls with `try/catch`
- show clear user-facing error messages
- preserve developer-facing context in `console.error`

### 5.3 Rendering Logic

- derive view values from one source of truth
- avoid duplicate formulas across cards and summaries
- clamp computed values where overflow/negative values could occur

## 6. Documentation Standards

Required docs in this repo:

- `README.md`
- `SECURITY.md`
- `PROJECT_GUIDELINES.md`
- `MPDP.md`

Rules:

- use measured language
- avoid inflated claims
- keep setup instructions reproducible
- update docs when behavior changes

## 7. Commit Standards

Format:

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `security: ...`
- `refactor: ...`

Commit expectations:

- one clear purpose per commit
- message describes user-facing or security impact
- no noisy or vague messages

## 8. Review Checklist

Before marking work complete:

- [ ] request requirements fully covered
- [ ] changed files are expected and minimal
- [ ] no secret exposure in changed code
- [ ] no debug-only output introduced
- [ ] code compiles/renders without syntax errors
- [ ] user-visible behavior verified where possible

## 9. Anti-Patterns

Do not:

- suppress warnings without diagnosis
- claim behavior not actually tested
- mix unrelated edits into one change
- force destructive git actions without explicit approval
- keep temporary debug code in final patch

## 10. Recovery Protocol

If a change regresses behavior:

1. acknowledge immediately
2. isolate faulting commit or hunk
3. revert safely (prefer `git revert` over history rewriting)
4. re-implement with narrower scope
5. validate before pushing

## 11. Collaboration Standards

- summarize progress in small checkpoints
- call out risks and assumptions
- propose next steps with clear options
- keep tone direct and professional

## 12. Repository-Specific Notes

- app entry point is `index.html`
- runtime env injection is `functions/api/env.js`
- local credentials are expected in untracked `config.js`
- money/debt views rely on consistent aggregate formulas

## 13. Verification Commands

Common checks:

- `git status --short`
- `git log --oneline -15`
- `git check-ignore -v config.js`
- scan for debug logging in `index.html`
- scan for key-like patterns in tracked files

## 14. Escalation Rules

Escalate to user when:

- requirement is ambiguous and materially changes implementation
- destructive action is requested implicitly but not explicitly approved
- environment limitation blocks direct verification

## 15. Definition of Done

Work is done when:

- requested behavior is implemented
- security posture is preserved or improved
- validation checks pass
- changes are committed with clear message
- docs are updated if behavior/process changed

## 16. Revision History

- 2026-06-21: formalized repository-aligned standards

## 17. Execution Protocol

### 17.1 Discovery Phase

- gather direct evidence before editing
- inspect exact file paths affected
- confirm whether change is additive, corrective, or rollback

### 17.2 Planning Phase

- define smallest safe edit set
- identify validation commands before code changes
- note dependencies between edits

### 17.3 Implementation Phase

- edit focused locations first
- avoid broad formatting passes
- keep code style aligned with file conventions

### 17.4 Validation Phase

- run file-level validation first
- run repository-level status checks second
- report both success and residual risk

## 18. Communication Standards

- provide short progress updates during multi-step work
- state what was changed and why
- call out blockers immediately
- avoid overstating confidence

## 19. Safety Rules for Git Actions

- do not run destructive reset commands unless explicitly requested
- prefer `git revert` for rollback on published branches
- stage only intended files
- leave unrelated untracked files untouched

## 20. Standards for Review Requests

When user asks for review:

- prioritize findings over summary
- list issues by severity
- include exact impacted file paths
- mention testing gaps explicitly

## 21. Standards for Documentation Edits

- keep statements verifiable
- avoid promises that cannot be measured
- keep setup steps runnable
- align docs with current code behavior

## 22. Validation Evidence Requirements

Claims should include one of:

- command output
- file-level diagnostics
- reproducible behavior checks

Avoid:

- assertions without checks
- assumptions based only on memory

## 23. Quality Gates for Financial Features

- amounts parsed through shared numeric helper
- no negative remaining values displayed
- no over-100 percent progress bars
- top summary and card details remain formula-consistent

## 24. Quality Gates for Security Features

- runtime env values required for secrets
- no secret-like tracked literals
- local secret files remain ignored
- deployment injection path remains functional

## 25. Common Mistakes and Prevention

Mistake:

- editing too many files for a small request

Prevention:

- define exact target files before patching

Mistake:

- introducing behavior drift while fixing UI text

Prevention:

- isolate formatting/text edits from logic edits

Mistake:

- passing review without explicit checks

Prevention:

- always run diagnostics before final response

## 26. Recovery Checklist

If user reports regression:

1. acknowledge issue directly
2. inspect current file state
3. isolate causative commit or patch
4. apply minimal rollback or correction
5. validate and push
6. summarize delta only

## 27. Definition of Professional Output

- accurate
- scoped
- reproducible
- secure
- traceable in git history

## 28. Escalation Conditions

Escalate when:

- credential handling is unclear
- deployment behavior cannot be verified locally
- user request conflicts with safety constraints

## 29. Command Hygiene

- prefer deterministic commands
- avoid shell constructs that may hang
- break large checks into smaller commands when needed

## 30. Final Delivery Checklist

- [ ] requirement met exactly
- [ ] no unrelated files changed
- [ ] checks executed and clean (or gaps documented)
- [ ] commit message is clear and professional
- [ ] user receives concise summary and next-step options if relevant

## 31. Additional Revision History

- 2026-06-21: expanded execution, communication, quality gates, and recovery protocols

## 32. Extended Execution Rules

- prefer explicit file references in summaries
- verify changed files match request intent
- call out any files intentionally excluded from commit

## 33. Extended Testing Rules

- run targeted checks first
- run broader checks only when needed
- avoid skipping validation after late-stage edits

## 34. Extended Communication Rules

- keep progress updates factual and brief
- communicate what is next before doing it
- avoid repeating unchanged plans

## 35. Extended Risk Reporting Rules

- report known gaps plainly
- distinguish blocker from non-blocker
- suggest concrete next actions for unresolved risks

## 36. Extended Git Discipline Rules

- inspect `git status --short` before staging
- stage explicit paths over blanket adds when possible
- keep commit scope aligned with single objective

## 37. Extended Documentation Rules

- synchronize docs with behavior changes in same change set
- update setup instructions when env or config flow changes
- maintain consistent terminology across files

## 38. Extended Code Review Rules

- identify logic divergence between summary and detail views
- identify hidden assumptions in calculations
- identify edge cases introduced by clamping or rounding

## 39. Extended Rollback Rules

- if rollback is requested, prefer reversible operations
- verify rollback with diagnostics before push
- summarize exactly what was rolled back

## 40. Extended Completion Criteria

- user request handled end-to-end
- validations executed and reviewed
- commit and push completed if requested
- response includes precise outcome statement

## 41. Agent Self-Check Template

Before final response, confirm:

- requirement satisfied
- no hidden drift introduced
- validation evidence collected
- final status communicated clearly

## 42. Operational Notes

- this standards file applies to all future edits in this repo
- exceptions should be explicit and documented

## 43. Practical Examples

Example: Safe secret handling update

1. read current env loader
2. identify interpolation risk
3. add escaping utility
4. validate output formatting
5. verify no secrets in tracked source

Example: UI regression recovery

1. reproduce issue in target renderer
2. isolate offending hunk
3. apply minimal correction
4. run syntax checks
5. push targeted fix commit

Example: Documentation sync

1. update behavior in code
2. update README setup guidance
3. update SECURITY policy notes
4. verify file set before commit

## 44. Continuous Improvement

- capture recurring failure patterns
- convert lessons into checklist updates
- keep standards concise but complete
