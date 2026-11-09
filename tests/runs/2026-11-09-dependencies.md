# Task 3: dependencies checklist

Date: 2026-11-09. Eight items, seven current defaults verified by web search the same day (Knip, Renovate, `packageManager` with Corepack no longer bundled in Node 25+, dedupe commands).

## asensio.me (installed clone), `deps`

Pass. `Needs change` with five findings, none caused by the zero dependency choice: DEP-1 no update automation (medium), DEP-2 TypeScript one major behind (medium, `pnpm outdated` evidence), DEP-3 no `packageManager` (low), DEP-4 no Node pin (low), DEP-5 duplicate majors in the lockfile (low). "Skipped as documented choices: none (README 'Zero npm dependencies shipped' concerns runtime dependencies and does not contradict any suggestion here)". Tests row now reads `src/lib/*.test.ts`.

## gmail-clone (installed clone), `deps`

Pass. `Needs change`, five findings with `npm outdated` evidence, grouped by family: DEP-2 FontAwesome, DEP-3 Karma and Jasmine, DEP-4 Angular 10 to 22 "one family, bound together by peer dependencies". Two low items fell outside the cap and were listed under Notes. Item 5 traced all 39 declared packages to a use.

Harness note: `npm install --ignore-scripts` used to create `node_modules` normalised `package-lock.json` before the run; the agent noticed and did not touch it.

## Lockfile conflict fixture, `deps`

Pass. DEP-1 (medium, S): "`packageManager` pins `npm@10.9.0`, but the lockfile and the `catalog:` workspace are pnpm's", citing package.json:21 and pnpm-lock.yaml:7-11.

## Observations

- Grouping same-family packages into one finding keeps gmail-clone under the cap without losing the Angular story.
- `pnpm dedupe --check` was run as a read-only package manager command on asensio.me. Acceptable under tier 2.
