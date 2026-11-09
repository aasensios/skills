# Final review fix pass

Date: 2026-11-09. A fresh reviewer read the whole branch against the design and plan and returned "with fixes": two Critical and nine Important items. Fixed here, each verified by a run.

## Fixed

1. **npm release-age unit (Critical).** `security.md` item 3 said "set the equivalent setting to 1440 minutes"; npm's `min-release-age` is in days. Now per manager: pnpm `minimumReleaseAge: 1440` (minutes), npm `min-release-age=1` (days), yarn and bun looked up before naming. A pnpm setting of `0` is now a finding too.
2. **Scope rules contradicted each other (Critical).** The overview and tier 2 said everything stays inside the "audited root", while step 3 sent root-level areas to the workspace root. `SKILL.md` now distinguishes the repository root (where `.git` lives, the boundary for reads and commands) from the report root (the path argument, where the report is written); root-level areas run commands at the repository root, the others at the report root.
3. **Tier 2 command set was ambiguous.** Now exactly: `outdated`, `audit`, the dedupe check, and the project's `lint` and `typecheck` scripts. Tests are not run.
4. **Tier 2 and 3 could write to the repo.** Scripts containing `--fix`, `--write` or `-w` are skipped; build output may land only in paths `.gitignore` covers.
5. **Package manager on a pin and lockfile mismatch.** Tier 2 uses the lockfile's manager; the Stack row has a form for both ("pin: npm@x; lockfile: pnpm").
6. **Missing reason strings.** The template's "Not checked" list now carries every reason the rules produce, and `Tiers:` accepts "1".
7. **Template contradicted step 6 about Notes.** Notes now holds over-cap findings and lows under `Good`; lows under `Needs change` stay numbered within the cap.
8. **INP in a lab run.** Performance item 9 uses Total Blocking Time as the lab proxy and lists INP as "Not checked: needs field data".
9. **`advancedChunks` is the older alias.** Performance item 3 and the defaults table now name `output.codeSplitting.groups`.
10. **Fixtures cited by logs were not committed.** Added `tests/fixtures/lockfile-conflict/`, `hanging-script/` and `no-build/`, with a `tests/fixtures/README.md` matrix.
11. **Previous report read as input (regraded from Minor).** The overview now says an existing `improve-report.md` is never read as input.
12. **README out of date (regraded from Minor).** Now describes the chat summary and the path argument's root-level behaviour.

`SKILL.md` stands at 894 words.

## Verification runs

- `packages/web deps ci perf` on the monorepo fixture: report at `packages/web/improve-report.md`; "dependencies and ci (root-level areas) would have run at the repository root ... performance would have run at the report root"; "packages/web/improve-report.md already existed and is tracked by git. It was not read."
- `deps` on the committed lockfile-conflict fixture: Stack row "pin: npm@10.9.0; lockfile: pnpm"; DEP-1 (medium, S) "`packageManager` pins npm@10.9.0, but the only lockfile is pnpm-lock.yaml".
- Full pass on asensio.me: every criterion met again; tier 2 "ran: `pnpm outdated`, `pnpm audit`, `pnpm dedupe --check`, and `pnpm run check`"; "Skipped: `build` (writes `dist` and belongs to tier 3), `test` (tests are never run), `dev`, `preview` (servers) and `prepare` (`vp config` modifies git config)"; "A previous `improve-report.md` existed (untracked, never read) and was replaced." Skipped lines quoted from the report: "Skipped as documented choices: none" in every area, with "SEC-3 cites README.md:5" under security.

## Deferred

The reviewer's Minor items are listed in the project ledger as deferred, with one regrade each way recorded there. One observation from the last run is left as is: the project's own `check` script formats every file, so it fails on the previous report before this run replaces it; the agent reported that honestly and marked lint as not checked.
