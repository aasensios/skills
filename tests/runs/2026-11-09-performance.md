# Task 6: performance checklist

Date: 2026-11-09. Nine items (seven static, two tier 3), seven current defaults verified by web search (Vite 8 on Rolldown with `advancedChunks`, `rollup-plugin-visualizer`, Core Web Vitals thresholds unchanged at LCP 2.5 s, INP 200 ms, CLS 0.1).

## asensio.me, `perf`

Pass. PERF-1 (medium, S): "public/fonts/inter-variable.woff2 is 345,588 bytes; `fc-scan` lists coverage of Greek and Cyrillic ranges; src/layouts/layout.astro:46 preloads it ... the page is `lang="en`". Items 8 and 9 "Not checked: needs --runtime". Item 6 hosting headers "not available on this host (GitHub Pages)". The Giphy versus README mismatch appeared as a low note, consistent with the security finding.

## asensio.me, `perf --runtime`

Pass with one environment limit. Tier 3 ran: `build` succeeded in about 17 s, `astro preview` served `dist/`, the agent measured per-file and gzip sizes (JS 3.4 KB gzip, CSS 5.9 KB, HTML 10 KB), first-load transfer (the font is about 86% of it) and CLS 0.0001 through the browser pane. Item 9 "not checked: no Lighthouse performance run was possible (chrome-devtools connection timed out after 60 s on two calls)". PERF-2 (low) measured four `media.giphy.com` still requests on first paint from resource timing.

Fix after this run: item 9 now names a fallback, `PerformanceObserver` entries through the browser pane, and asks the report to state which method was used, so a missing Lighthouse tool degrades to partial numbers instead of nothing.

## Fixture with no build script, `perf --runtime`

Pass. Items 8 and 9 "Not checked: no build script"; items 1 to 7 "Not checked: not applicable" with a reason each; verdict `Good`. The agent did not run the unrelated `lint` script.

## Observations

- Under `--runtime` the agent used the project's own `build` and `preview` scripts, nothing installed, and `dist/` is ignored by the repo's `.gitignore`.
- Tier 3 depends on which browser tools the host session exposes. The report says what it could and could not measure, which is the designed behaviour.
