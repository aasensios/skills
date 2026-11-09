# Dependencies (stub for Task 2)

Prefix: DEP. Owns: lockfile and outdated packages. Not this area: vulnerabilities (`security`), bundle weight (`performance`).

## Items
1. **Lockfile present.** Look at: the repo root for `pnpm-lock.yaml`, `package-lock.json`, `yarn.lock` or `bun.lock`. Finding when: none exists. Impact: medium. Suggest: commit the lockfile of the package manager in use.
2. **Outdated majors.** Look at: `<pm> outdated` output. Finding when: a dependency is one or more majors behind. Impact: medium. Suggest: upgrade one major at a time.

## Current defaults
| Need | Tool or technique | Verified |
|---|---|---|
| Lockfile | the package manager's own lockfile | 2026-11-09 |
