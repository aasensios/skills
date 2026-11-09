# Fixtures

Each folder is a small repository used by the variation scenarios. Copy one into a scratch folder, run `git init && git add -A && git commit -m init` there, then dispatch the run prompt against it.

| Fixture | Exercises |
|---|---|
| `monorepo/` | path argument, root-level areas at the workspace root, the one question with two app-like packages |
| `plain-html/` | no `package.json`: tier 2 not applicable, all areas complete |
| `i18n/` | a locale setup with a missing key in `es.json` |
| `lockfile-conflict/` | `packageManager` pins npm while the lockfile is pnpm's: a `medium` dependencies finding |
| `hanging-script/` | a `lint` script that sleeps: the two minute timeout and "command timed out" |
| `no-build/` | `--runtime` with no `build` script: tier 3 items "Not checked: no build script" |
