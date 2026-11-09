# Chat-only output

Date: 2026-11-09. After the first release, Alejandro asked for the report to be shown in chat rather than written into the repository, so nobody has to ignore or avoid committing a file. This also closes the one place the skill contradicted its own invariant of never modifying the repository.

## Change

- `SKILL.md`: the report is printed in chat in the shape of `report-template.md`; `--report [file]` also saves it, to the given file or to `~/.improve/<repo>-<date>.md`, never inside the repository unless the path says so. The gitignore note and the "previous report replaced" line are gone. 898 words.
- `report-template.md`: opens with a Summary (stack line, Verdicts table, top three), then the Stack table and the area sections.
- `README.md`, `tests/run-prompt.md` and the spec's Report section updated to match.
- Removed from the deferred list by this change: the project's own `check` script failing on a previous report.

## Verification

- `deps` on an installed asensio.me clone: the full report printed in chat with the Summary block first; closing line "I wrote no file. The report is chat output only, since `--report` was not passed. I did not modify the repository." `git status` in the clone: clean.
- `deps --report <scratch>/reports/asensio-deps.md` on a bare clone: same chat output; "Files written: yes, one file, outside the repository: .../reports/asensio-deps.md"; the file exists (3,576 bytes) and starts with the report heading. `git status` in the clone: clean.
