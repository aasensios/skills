# Dependencies

Prefix: DEP. Owns: outdated majors, unused and duplicated packages, lockfile presence and package manager pinning, runtime pinning, update automation. Not this area: known vulnerabilities (`security`), bundle weight of a heavy package (`performance`).

## Items

1. **Lockfile present and single.** Look at: the root for `pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`, `bun.lock` or `bun.lockb`, and whether it is tracked by git. Finding when: none exists, more than one exists, or it is ignored. Impact: medium. Suggest: commit exactly one lockfile, the one of the package manager in use.
2. **Package manager pinned and matching.** Look at: `packageManager` and `devEngines.packageManager` in `package.json`, against the lockfile from item 1. Finding when: no pin exists (impact low), or the pin names a different package manager than the lockfile (impact medium). Suggest: set `packageManager` to the manager and exact version that produced the lockfile.
3. **Runtime pinned.** Look at: `engines.node` in `package.json`, `.nvmrc`, `.node-version`, and the CI workflow's Node setup. Finding when: none pins a version, or CI and the pin disagree. Impact: low. Suggest: `engines.node` plus a `.node-version` file read by CI.
4. **Outdated majors.** Look at: `<pm> outdated` output (tier 2). Finding when: a dependency is one or more majors behind. Impact: medium per package; group the same-family packages into one finding. Suggest: upgrade one major at a time, following the package's migration guide.
5. **Unused dependencies.** Look at: each entry of `dependencies` and `devDependencies` against imports, config files and scripts; when a `knip` script or config exists, its output (tier 2). Finding when: a package is declared and never referenced. Impact: low. Suggest: remove it, and adopt Knip to keep it that way.
6. **Duplicated packages.** Look at: the lockfile for a package resolved at more than one version; for npm, `npm dedupe --dry-run` (tier 2). Finding when: a package resolves to two or more majors. Impact: low. Suggest: the package manager's dedupe command.
7. **Update automation.** Look at: `renovate.json`, `.renovaterc*`, `.github/renovate.json5`, `.github/dependabot.yml`. Finding when: none exists. Impact: medium. Suggest: Renovate with the `config:recommended` preset and grouped minor updates.
8. **Dev tooling listed as a runtime dependency.** Look at: `dependencies` for build tools, type packages, test runners and linters. Finding when: such a package sits in `dependencies`. Impact: low. Suggest: move it to `devDependencies`.

## Current defaults

| Need | Tool or technique | Verified |
|---|---|---|
| Lockfile | the package manager's own lockfile, committed | 2026-11-09 |
| Package manager pinning | `packageManager` field in `package.json`; Corepack is no longer bundled with Node 25+, so pnpm's own version management or an explicit install in CI enforces it | 2026-11-09 |
| Runtime pinning | `engines.node` plus `.node-version` | 2026-11-09 |
| Outdated check | `<pm> outdated` | 2026-11-09 |
| Unused dependencies and exports | Knip | 2026-11-09 |
| Duplicates | `pnpm dedupe --check`, `npm dedupe --dry-run`, `yarn dedupe --check`, `bun dedupe --check` | 2026-11-09 |
| Update automation | Renovate (`config:recommended`); Dependabot is acceptable when the repo already uses it | 2026-11-09 |
