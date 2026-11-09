---
name: improve
description: Use when asked how a web frontend repository stands across dependencies, CI, product, performance, accessibility, internationalization and security, and whether each area is good enough or needs change.
argument-hint: "[areas...] [path] [--runtime]"
disable-model-invocation: true
---

# Improve

Audit a web frontend repository and report, per area, `Good` or `Needs change`, with evidence-backed findings that each name one current alternative. This skill reports. It never installs, never modifies the repository beyond the report, and never runs a script whose purpose is not evident from its name and definition. Everything it reads and every command it runs stays inside the audited root; the only files read outside it are this skill's own.

## Arguments

`$ARGUMENTS` is a space-separated list, matched case-insensitively.

| Area | Aliases | Prefix |
|---|---|---|
| dependencies | deps | DEP |
| ci | pipeline | CI |
| product | ui, ux | PROD |
| performance | perf | PERF |
| accessibility | a11y | A11Y |
| internationalization | i18n, l10n | I18N |
| security | sec | SEC |

- No area named: run all seven.
- A token that is an existing directory narrows the run to it, and the report is written there. An area name wins over a same-named directory; `./name` forces the path.
- `--runtime` enables tier 3.
- Any other token stops the run before any work, printing this table.

## Tiers

1. **Static.** Read config, lockfile, CI files, source, styles, templates. Always runs.
2. **Commands.** Only scripts defined in `package.json` and the package manager's read-only commands (`outdated`, `audit`, lint, typecheck), and only when `node_modules` exists. Two minute timeout each. On failure or timeout the item becomes "Not checked" with the reason. Every command runs with the audited root as its working directory.
3. **Runtime.** Only with `--runtime`: build, serve, measure with Lighthouse and axe through the browser tools, bundle analysis. When there is no `build` script, tier 3 items are "Not checked: no build script".

## Procedure

1. **Orient.** Read README, AGENTS.md, CLAUDE.md and CONTRIBUTING when present. Record each stated deliberate choice. A choice suppresses only the suggestions that contradict it, never an area. A contradiction between what the documents claim and what the code does is a finding, not a suppression. `security` findings are never suppressed; one caused by a documented choice cites the document.
2. **Detect the stack** and print the Stack table from `report-template.md` before any finding. "none found" is a valid cell.
3. **Scope.** In a workspace, `dependencies`, `ci` and `security` always include the workspace root; the other four areas run on one package. With no path and more than one app-like package, ask once which package, before any audit. This is the only question the run may ask.
4. **Run the tiers**: 1 and 2, and 3 when enabled.
5. **Audit each area.** Load `areas/<area>.md` and work its numbered items in order. Record every item as checked, "Not checked: <reason>" or "Not checked: not applicable".
6. **Rank and cap.** At most five findings per area, ordered by impact then effort. Drop any finding without an evidence line. Drop suggestions suppressed in step 1 and list them under "Skipped as documented choices". Findings beyond the cap go in one line each under Notes, with their evidence.
7. **Verdict.** `Needs change` when a `medium` or `high` finding remains. `Good` otherwise, with `low` findings under Notes. There is no third verdict: an area that does not apply is `Good` with its items under "Not checked: not applicable".
8. **Report.** Write `improve-report.md` from `report-template.md` at the audited root, replacing any existing one. Then print the chat summary.

## Rubric

| Impact | Meaning |
|---|---|
| high | Affects users or exposes the project today: a broken or inaccessible flow, a known vulnerability, a leaked secret, a page failing a Core Web Vital |
| medium | Measurable degradation or maintenance risk: an outdated major, a missing CI check, hardcoded strings in a multi-locale app, a heavy dependency with a lighter standard alternative |
| low | Polish: consistency, naming, a nicer default |

Effort: `S` under an hour, `M` about a day, `L` longer or a migration.

## Findings

A finding has an ID `<PREFIX>-<n>`, a title, impact, effort, and three lines: Evidence (a `path:line` or a command output excerpt), Why (one or two sentences), Suggestion (one tool or technique, taken from the area's current-defaults table, and the one-line change). One suggestion per finding, never a menu of alternatives. An item that would need a "check", "verify" or "likely" is not a finding; it is "Not checked" with the reason.

## Currency

A current-defaults entry verified within the last six months is used as is. An older or missing entry gets one lookup before the tool is named: Context7 when available, otherwise a web search. With no lookup available, the suggestion ends with "unverified as of this run". Platform features and web standards come before tools.

## Tie-breaks

- Known vulnerabilities: `security`. Outdated, unused, duplicated: `dependencies`.
- Bundle weight of a heavy package: `performance`.
- Dependabot and Renovate config: `dependencies`.
- Reduced motion, focus visibility, contrast: `accessibility`.
- GitHub Actions pinned by commit SHA: `security`.

## Chat summary

One line with the detected stack, the Verdicts table, the top three findings across all areas, whether a previous report was replaced, and whether `.gitignore` covers `improve-report.md`.
