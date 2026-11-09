# Task 10: fixtures and variation scenarios

Date: 2026-11-09. Fixtures under `tests/fixtures/`, copied into scratch and initialised as git repos before each run.

## `a11y perf` on asensio.me

Pass. Exactly two area sections. Accessibility surfaced the `aria-current=""` and story-bar contrast findings again plus two new medium ones (caption with no live region, animated WebP with no pause), so ranking within an area varies between runs while every finding keeps a file and line. Performance repeated the Inter font finding and raised the Giphy requests as PERF-1.

## `packages/web` on the monorepo fixture, first run

Report written at `packages/web/improve-report.md`, as expected. Gap: `dependencies`, `ci` and `security` reported `Good` with every item "outside audited root", because the first scope rule covered only the no-path case. Fix: `SKILL.md` step 3 now says those three areas always include the workspace root; the spec is amended with the reason.

## `packages/web deps ci` on the monorepo fixture, rerun

Pass. DEP-1 no lockfile and CI-1 no pipeline read from the workspace root, report inside `packages/web`, root `improve-report.md` untouched.

## No arguments on the monorepo fixture

First run: no question asked, because `packages/ui` is a library and `packages/web` was the only app-like package. The skill was right and the fixture was wrong, so `packages/admin` (a second Vite app) was added. Rerun: the run stopped at step 3 with one question naming both apps and the reason `ui` is excluded, after printing the stack table and before any audit.

## No arguments on the plain HTML fixture

Pass. Stack table: "none found (a single static HTML file)" and "none found, no lockfile" for the package manager. All seven areas completed. Dependencies items 1 to 8 "not applicable (no package.json ...)". Findings with line numbers on the one file: inert links, missing `alt`, clickable `<div>`, no `lang`, Google Fonts stylesheet without SRI.

## `i18n` on the i18n fixture

Pass. I18N-1 (medium): "locales/en.json:5 defines `"logout": "Log out"`; locales/es.json has only `title`, `greeting` and `items`". Plural forms, hand-built date, static `lang` and the unreachable Spanish catalogue also found. Translation items 6 to 9 ran because the locale setup was detected.

## Carried to Task 11

- The README-versus-Giphy contradiction now appears under `security`, `performance` and `product` in separate runs. The full run will show whether one fact is reported three times; a tie-break is the likely fix.
