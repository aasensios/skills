# Performance

Prefix: PERF. Owns: bundle weight and heavy packages, client JavaScript that could be static, code splitting, images, fonts, caching, render-blocking resources, hydration strategy, Core Web Vitals. Not this area: outdated or unused packages (`dependencies`), reduced motion (`accessibility`).

## Items

Tier 1 and 2:

1. **Heavy packages with a lighter standard alternative.** Look at: `dependencies` for date, utility, HTTP, icon and animation libraries, and whether the platform covers the use (`Intl`, `fetch`, `structuredClone`, native array methods, inline SVG). Finding when: a package is shipped to the client for something the platform or a much smaller package does. Impact: medium. Suggest: the platform feature, named.
2. **Client JavaScript for static content.** Look at: hydration directives (`client:*` in Astro, `use client` in React Server Components, `<script>` tags in templates, islands) on components that render no interaction. Finding when: a component ships JavaScript to the browser without needing it. Impact: medium. Suggest: render it on the server or at build time with no hydration directive.
3. **Code splitting.** Look at: route-level or feature-level dynamic `import()`, the framework's lazy route config, a single entry that imports everything. Finding when: a multi-route app has no route-level splitting, or a large optional feature (editor, chart, map, dialog content) is in the initial bundle. Impact: medium. Suggest: a dynamic `import()` at the route or feature boundary; in Vite 8, `build.rolldownOptions.output.advancedChunks` for grouping.
4. **Images.** Look at: `<img>` tags and image components for `width` and `height`, `loading="lazy"` below the fold, `fetchpriority="high"` on the hero, modern formats (AVIF, WebP), responsive `srcset`, and originals committed at unneeded sizes. Finding when: a visible image lacks dimensions, a hero is lazy, or raster images ship unoptimised. Impact: medium. Suggest: the framework's image component (Astro `<Image>`, Next `next/image`, Nuxt `<NuxtImg>`) or Sharp at build time.
5. **Fonts.** Look at: `@font-face` rules, `<link rel="preload">` for fonts, third-party font CSS requests, `font-display`, subsetting, number of weights, and the byte size of each font file. Finding when: fonts come from a third-party stylesheet, lack `font-display`, ship more weights than used, or a single font file exceeds 100 KB on a page whose content uses one script (file size is the evidence; glyph coverage need not be verified). Impact: medium. Suggest: self-host woff2 with `font-display: swap`, a Latin subset, a variable font instead of several weights, preload only the above-the-fold face.
6. **Caching and asset hashing.** Look at: build output file names for content hashes, hosting config for `Cache-Control`, service worker config. Finding when: assets are unhashed, or hashed assets get no long-lived `Cache-Control`. Impact: low. Suggest: content-hashed file names (the bundler default) and `Cache-Control: public, max-age=31536000, immutable` on them in the host config. Where the host sets no headers (GitHub Pages), list it as "not available on this host".
7. **Render-blocking resources.** Look at: `<script>` tags in `<head>` without `defer`, `async` or `type="module"`, synchronous third-party scripts, stylesheets loaded from third parties. Finding when: a script or stylesheet blocks first paint without need. Impact: medium. Suggest: `type="module"` or `defer`, inline the small theme-setting script only, self-host the stylesheet.

Tier 3, with `--runtime` only:

8. **Bundle size by chunk.** Look at: the build output and a bundle analysis. Finding when: the initial JavaScript exceeds 100 KB compressed on a content site or 200 KB on an application, or one chunk holds an unrelated feature. Impact: medium. Suggest: `rollup-plugin-visualizer` (works on Rolldown in Vite 8) to find the weight, then items 1 to 3.
9. **Core Web Vitals in the lab.** Look at: a Lighthouse run against the built site served locally, mobile preset, when a Lighthouse tool is available; otherwise `PerformanceObserver` entries for `largest-contentful-paint`, `layout-shift` and `event` collected through the browser pane on the same served build, stating which method was used. Finding when: LCP above 2.5 s, INP above 200 ms or CLS above 0.1. Impact: high. Suggest: the specific opportunity named by the tool, mapped to items 4 to 7.

## Current defaults

| Need | Tool or technique | Verified |
|---|---|---|
| Bundler | Vite 8 on Rolldown; `advancedChunks` replaces `manualChunks` | 2026-11-09 |
| Bundle analysis | `rollup-plugin-visualizer` | 2026-11-09 |
| Images | the framework's image component, Sharp underneath | 2026-11-09 |
| Fonts | self-hosted woff2 via Fontsource or files, `font-display: swap`, variable font | 2026-11-09 |
| Lab measurement | Lighthouse (mobile preset) through the browser tools; Lighthouse CI in a pipeline | 2026-11-09 |
| Core Web Vitals thresholds | LCP 2.5 s, INP 200 ms, CLS 0.1 at the 75th percentile | 2026-11-09 |
| Static over hydrated | the framework's server or build-time rendering, no client directive | 2026-11-09 |
