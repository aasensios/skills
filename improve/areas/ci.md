# CI

Prefix: CI. Owns: presence and shape of the pipeline, caching, required checks on pull requests, preview deploys, slow or redundant jobs, secrets handling. Not this area: pinning third-party actions by commit SHA (`security`), Dependabot and Renovate config (`dependencies`).

Detection: name every provider found among `.github/workflows/*.yml`, `.gitlab-ci.yml`, `Jenkinsfile`, `bitbucket-pipelines.yml`, `.circleci/config.yml`, `azure-pipelines.yml`. Read each file found.

## Items

1. **A pipeline exists.** Look at: the provider files above. Finding when: none exists. Impact: high. Suggest: a GitHub Actions workflow on `pull_request` and `push` to the default branch (or the provider the repo already hosts on) that installs with the lockfile, then lints, type checks, tests and builds.
2. **Checks run before merge.** Look at: the workflow triggers and the jobs that run on `pull_request`. Finding when: lint, typecheck, test or build runs only on push to the default branch, or only in a deploy job, so broken code can land. Impact: high. Suggest: one check workflow on `pull_request` with a single aggregating job that `needs` the others, used as the required status check.
3. **All gates present.** Look at: the steps against the `package.json` scripts: install with the lockfile (`--frozen-lockfile`, `npm ci`), lint, typecheck, test, build. Finding when: a script exists in `package.json` but no job runs it. Impact: medium. Suggest: add the missing step; where Vite+ is detected, `vp check` and `vp test` as the two gates.
4. **Dependency caching.** Look at: `actions/setup-node` `cache:` input, `pnpm/action-setup` `cache: true`, or the provider's cache keys. Finding when: install runs with no cache, or two cache strategies overlap. Impact: medium. Suggest: `actions/setup-node` with `cache: <pm>` after the package manager is installed; exactly one cache strategy.
5. **Job timeouts and concurrency.** Look at: `timeout-minutes` on jobs, `concurrency` on the workflow. Finding when: no `timeout-minutes`, or no `concurrency` on a pull request workflow. Impact: low. Suggest: `timeout-minutes` on every job; `concurrency` with `cancel-in-progress: true` for pull request checks and `false` for deploys.
6. **Preview deploys.** Look at: a deploy step scoped to pull requests, or a hosting integration (Pages, Netlify, Vercel, Cloudflare). Finding when: the project deploys but pull requests get no preview. Impact: low. Suggest: the host's pull request preview feature.
7. **Redundant or serial work.** Look at: steps repeated across jobs, builds run twice, jobs chained with `needs` that share nothing. Finding when: the same build or install runs more than once per workflow without reuse, or independent jobs are serialised. Impact: low. Suggest: one install per job with the cache, artifacts for the build output, independent jobs in parallel.
8. **Secrets handling.** Look at: `${{ secrets.* }}` usage, secrets echoed to logs, secrets passed to third-party actions that do not need them, `permissions:` block. Finding when: a secret is printed or passed where unneeded, or the workflow has no `permissions` block and so gets the default write token. Impact: medium. Suggest: a top-level `permissions: contents: read` with job-level grants, and secrets only in the step that needs them.

## Current defaults

| Need | Tool or technique | Verified |
|---|---|---|
| Hosted CI for GitHub repos | GitHub Actions | 2026-11-09 |
| Reproducible install | `pnpm install --frozen-lockfile`, `npm ci`, `yarn install --immutable`, `bun install --frozen-lockfile` | 2026-11-09 |
| Node and cache setup | `pnpm/action-setup` then `actions/setup-node` with `node-version` and `cache: pnpm` (or `cache: npm`); one cache strategy per workflow | 2026-11-09 |
| Single required check | an aggregating job that `needs` the real jobs | 2026-11-09 |
| Runaway protection | `timeout-minutes` on every job; `concurrency` with `cancel-in-progress: true` for checks, `false` for deploys | 2026-11-09 |
| Gates on a Vite+ project | `vp check` and `vp test` | 2026-11-09 |
| Least privilege | top-level `permissions: contents: read`, write scopes per job | 2026-11-09 |
