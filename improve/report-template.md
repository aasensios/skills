# Improve report

<repo name> · <YYYY-MM-DD> · Areas: <list or "all"> · Tiers: <1, 2, 3 or "1, 2">

## Stack

| Aspect | Detected | Evidence |
|---|---|---|
| Framework | <name and version, or "none found"> | <file> |
| Package manager | <name, lockfile> | <file> |
| Runtime | <version source, or "none pinned"> | <file> |
| CI | <providers, or "none found"> | <files> |
| Tests | <runner, or "none found"> | <file> |
| Lint and format | <tools, or "none found"> | <files> |
| i18n | <library, or "none found"> | <file> |
| Deploy | <hints, or "none found"> | <file> |
| Workspaces | <packages, or "single package"> | <file> |

## Verdicts

| Area | Verdict | Findings |
|---|---|---|
| <Area> | Good / Needs change | <n> |

## <Area> — <Verdict>

### <PREFIX>-<n> <Title>

Impact: <high / medium / low> · Effort: <S / M / L>
Evidence: <path:line, or a command output excerpt>
Why: <one or two sentences>
Suggestion: <one tool or technique, and the one-line change>

Checked: <item numbers and names performed>
Not checked: <item numbers with reason: needs --runtime, command failed, command timed out, not applicable>
Skipped as documented choices: <suppressed suggestions, each with the document that states the choice, or "none">
Notes: <low impact items under a Good verdict, or "none">
