# Skills

A collection of [Claude Code skills](https://docs.claude.com/en/docs/claude-code/skills), each invoked as a slash command. Each skill lives in its own folder with a `SKILL.md` that holds its instructions.

## `/improve`

**Status:** briefing only, not implemented yet.

A versatile skill that audits a codebase and lists the possible improvements. It reports, it does not apply changes.

It covers these areas:

- Dependencies
- CI
- UI
- UX
- Performance
- Accessibility
- Internationalization
- Localization

It has to work in any modern framework, so it detects the stack it is running on instead of assuming one.
