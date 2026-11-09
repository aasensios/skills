---
name: improve
description: Use when asked how a web frontend repository stands across dependencies, CI, product, performance, accessibility, internationalization and security.
argument-hint: "[areas...] [path] [--runtime] [--report [file]]"
disable-model-invocation: true
---

# Improve

Audit a web frontend repository and report, per area, `Good` or `Needs change`, with evidence-backed findings that each name one current alternative. This skill reports in chat. It never installs, never writes to the repository beyond ignored build output, and never runs a script whose purpose is not evident from its definition. Reads and commands stay inside the repository root (where `.git` lives); the only outside files read are this skill's own. A previous report is never read as input.

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
- An existing directory becomes the report root (default: the repository root). An area name wins over a same-named directory; `./name` forces the path.
- `--runtime` enables tier 3.
- `--report [file]` also saves the report to `file`, default `~/.improve/<repo>-<date>.md`, never inside the repository unless the path says so.
- Any other token stops the run before any work, printing this table.

## Tiers

1. **Static.** Always: config, lockfile, CI files, source, styles, templates.
2. **Commands.** Only when `node_modules` exists: the package manager's `outdated`, `audit` and dedupe check, and the project's `lint` and `typecheck` scripts. Tests are not run. Scripts containing `--fix`, `--write` or `-w` are skipped. When the `packageManager` pin and the lockfile disagree, use the lockfile's manager. Two minute timeout each. Skipped or failed items: "Not checked" with a template reason. Root-level areas run commands at the repository root, the others at the report root.
3. **Runtime.** Only with `--runtime`: build, serve, measure with Lighthouse and axe through the browser tools, bundle analysis. Needs a `build` script and output paths `.gitignore` covers; otherwise "Not checked" with the reason.

## Procedure

1. **Orient.** Read README, AGENTS.md, CLAUDE.md and CONTRIBUTING; record each stated deliberate choice. A choice suppresses only the suggestions that contradict it, never an area. A document contradicted by the code is a finding. `security` findings are never suppressed; one caused by a documented choice cites the document.
2. **Detect the stack** and print the Stack table before any finding; "none found" is a valid cell.
3. **Scope.** `dependencies`, `ci` and `security` are root-level and always audit the repository root as well as the report root; the other four audit the report root only. In a workspace with no path and more than one app-like package, ask once which package, before any audit (also with `--runtime`). This is the only question the run may ask.
4. **Run the tiers**: 1 and 2, and 3 when enabled.
5. **Audit each area.** Load `areas/<area>.md` and work its numbered items in order. Record every item as checked or "Not checked: <reason>".
6. **Rank and cap.** At most five findings per area, ordered by impact then effort. Drop any finding without an evidence line. List suggestions suppressed in step 1 under "Skipped as documented choices". Over-cap findings go under Notes, one line each with evidence.
7. **Verdict.** `Needs change` when a `medium` or `high` finding remains; `low` findings then stay numbered within the cap. `Good` otherwise, with `low` findings under Notes. No third verdict: an area that does not apply is `Good` with all items not checked.
8. **Report.** Print the report in chat in the shape of `report-template.md`; with `--report`, also save it.

## Rubric

| Impact | Meaning |
|---|---|
| high | Affects users or exposes the project today: a broken or inaccessible flow, a known vulnerability, a leaked secret, a failing Core Web Vital, no pipeline at all |
| medium | Measurable degradation or maintenance risk: an outdated major, a missing CI gate, a heavy dependency with a lighter standard alternative |
| low | Polish: consistency, naming, a nicer default |

Effort: `S` under an hour, `M` a day, `L` longer.

## Findings

A finding has an ID `<PREFIX>-<n>`, a title, impact, effort, Evidence (`path:line` or a command output excerpt), Why and Suggestion (one tool or technique from the area's current-defaults table, and the one-line change). One suggestion, never a menu. "Check", "verify" or "likely" items are "Not checked", not findings.

## Currency

A defaults entry verified within six months is used as is; otherwise one lookup (Context7, else web search) before naming the tool, or append "unverified as of this run". Platform features and web standards come before tools.

## Tie-breaks

- Known vulnerabilities: `security`. Outdated, unused, duplicated: `dependencies`.
- Bundle weight of a heavy package: `performance`.
- Dependabot and Renovate config: `dependencies`.
- Reduced motion, focus visibility, contrast: `accessibility`.
- GitHub Actions pinned by commit SHA: `security`.
- A document contradicted by the page's third-party requests: `security`, once; other areas cite it, never repeat it.

## Summary

The report opens with one line on the stack, the Verdicts table and the top three findings, so a reader who stops there has the verdict. Area sections follow; Checked and Not checked take one line each.
