# Skills

A collection of [Claude Code skills](https://docs.claude.com/en/docs/claude-code/skills), each invoked as a slash command. Each skill lives in its own folder with a `SKILL.md` that holds its instructions.

## `/improve`

Audits a web frontend repository and reports, per area, whether it is `Good` or `Needs change`, with evidence-backed findings that each name one current tool or technique to adopt. It reports; it never installs, never changes the repository beyond the report it writes, and never runs a script whose purpose is not evident.

### Install

```bash
ln -s ~/dev/skills/improve ~/.claude/skills/improve
```

### Use

```
/improve [areas...] [path] [--runtime]
```

| Area | Aliases | Covers |
|---|---|---|
| `dependencies` | `deps` | lockfile and pinning, outdated majors, unused and duplicated packages, update automation |
| `ci` | `pipeline` | pipeline presence and shape, gates before merge, caching, timeouts, secrets handling |
| `product` | `ui`, `ux` | tokens, dark mode, responsive layout, loading, empty and error states, form feedback, navigation, copy |
| `performance` | `perf` | heavy packages, client JavaScript for static content, code splitting, images, fonts, caching, Core Web Vitals |
| `accessibility` | `a11y` | landmarks, headings, labels, alt text, focus, keyboard, contrast, ARIA, reduced motion, `lang`, target size |
| `internationalization` | `i18n`, `l10n` | `Intl` usage, centralised strings, logical CSS, `lang` and `dir`, locale routing; translation completeness when a locale setup exists |
| `security` | `sec` | secrets in the tree, known vulnerabilities, supply chain delay, CSP and headers, XSS sinks, token storage, third-party origins, action pinning |

No area means all seven. A path narrows the run to a package in a monorepo. Area names win over same-named folders; `./name` forces a path.

### Depth

- **Static** always: reads config, lockfile, CI files, source and styles.
- **Commands** when the project defines them and `node_modules` exists: `outdated`, `audit`, lint, typecheck. Two minute timeout each.
- **Runtime** only with `--runtime`: builds, serves and measures with the browser tools (bundle sizes, Core Web Vitals, axe).

### Output

`improve-report.md` at the audited root, replaced on every run and never committed by the skill. It opens with a stack detection table and a verdict table, then one section per area with up to five ranked findings, each carrying an ID (`DEP-1`, `A11Y-2`), impact, effort, evidence, why, and one suggestion. Every area lists what was checked and what was not, so a `Good` is auditable.

### Layout

```
improve/
  SKILL.md              shared procedure, arguments, tiers, rubric, verdict rule, report contract
  report-template.md    the report shape
  areas/<area>.md       numbered checklist items and a verified current-defaults table per area
tests/
  run-prompt.md         how a skill run is exercised by a fresh agent
  baseline-prompt.md    the run without the skill that the skill was written against
  runs/                 one log per test run
  fixtures/             small repos for the variation scenarios
```
