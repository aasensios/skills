# Improve report

<repo name> · <YYYY-MM-DD> · Areas: <list or "all"> · Tiers: <"1", "1, 2" or "1, 2, 3">

## Summary

Stack: <one line: framework, package manager, CI, tests, lint, i18n, deploy>

| Area | Verdict | Findings |
|---|---|---|
| <Area> | Good / Needs change | <n> |

Top findings:
1. <ID> (<impact>, <effort>): <one sentence with the suggestion>
2. ...
3. ...

## Stack

| Aspect | Detected | Evidence |
|---|---|---|
| Framework | <name and version, or "none found"> | <file> |
| Package manager | <name, lockfile; on a mismatch "pin: npm@x; lockfile: pnpm"> | <file> |
| Runtime | <version source, or "none pinned"> | <file> |
| CI | <providers, or "none found"> | <files> |
| Tests | <runner and test file glob, or "none found"> | <file> |
| Lint and format | <tools, or "none found"> | <files> |
| i18n | <library, or "none found"> | <file> |
| Deploy | <hints, or "none found"> | <file> |
| Workspaces | <packages, or "single package"> | <file> |

## <Area> — <Verdict>

### <PREFIX>-<n> <Title>

Impact: <high / medium / low> · Effort: <S / M / L>
Evidence: <path:line, or a command output excerpt>
Why: <one or two sentences>
Suggestion: <one tool or technique, and the one-line change>

Checked: <item numbers and names performed, one line>
Not checked: <item numbers, each with one reason: needs --runtime, not applicable (say why), no node_modules, command failed, command timed out, script writes files, no build script, build output not ignored>
Skipped as documented choices: <suppressed suggestions, each with the document that states the choice, or "none">
Notes: <findings beyond the cap, one line each with evidence; low impact items under a Good verdict; or "none">
