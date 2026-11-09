# Task 2: skill core

Date: 2026-11-09. `SKILL.md` at 855 words plus one sentence added after run 1 (see below). Area file: a two-item stub for `dependencies`.

## Symlink and unknown token

`claude -p "/improve nosuch" --max-turns 3` in a scratch clone of asensio.me printed "Stopped before any work: `nosuch` isn't an area, an alias, `--runtime`, or a directory in this repo. No files were read and no report was written." followed by the area table. The symlink into `~/.claude/skills` resolves and the slash command expands in print mode.

## Run 1: `deps` on an installed clone

Matches. Stack table printed before any finding. Report follows the template section for section. One finding, DEP-1, with command evidence: "`pnpm outdated` reports `typescript (dev)  6.0.3  7.0.2`; pinned at package.json:17". Verdict `Needs change`, impact medium.

Two things to carry forward:
- Tests row says "no test files in the checkout" although `src/lib/*.test.ts` exist. Detection looked for a `tests/` folder, not test files.
- The agent read the original checkout's git status ("which the original's git status lists as untracked"). Added to the Overview after this run: "Everything it reads and every command it runs stays inside the audited root; the only files read outside it are this skill's own."

## Run 2: `deps` on a clone without `node_modules`

Matches. "Not checked: 2 Outdated majors (Not checked: tier 2 requires `node_modules`, which does not exist, and the skill never installs)". Verdict `Good` from item 1 alone. Same wrong Tests row as run 1.

## Run 3: `deps` with a previous report present

Matches. Chat summary: "A previous `improve-report.md` existed and was replaced. It was untracked." Ran after the Overview sentence was added; no outside reads reported.

## Step 6: hanging project script

Fixture: a `package.json` whose `lint` script is `sleep 300`, with an empty `node_modules`. Stub item 2 pointed at the lint output. Result: "Not checked: 2 Lint script output: command timed out (`npm run lint` is defined as `sleep 300` ... killed at the 120 second limit)". Verdict `Good` from item 1. The agent reported the command took 120 s and was bounded by a process-group kill.

## Open for later tasks

- Tests detection by file glob, not by folder name (Task 11 loophole list).
