# Task 7: accessibility checklist

Date: 2026-11-09. Twelve items (eleven static, one tier 3), six current defaults verified by web search (WCAG 2.2 AA, target size 2.5.8 at 24 px, axe-core through Playwright, Lighthouse's accessibility audit as a subset of axe rules).

## asensio.me, `a11y`

Pass. Five findings, each with a file and line and, where relevant, a computed ratio: A11Y-1 (medium) "`story.toggleAttribute("aria-current", s === i)` writes `aria-current=""`" at index.astro:574; A11Y-2 (medium) story bar track "1.22:1 on `#faf7f0` and 1.34:1 on `#0e131b` (computed)"; A11Y-3 (low) story buttons about 16 px wide against the 24 px target; A11Y-4 (low) `aria-pressed` plus a swapped label on the pause button; A11Y-5 (low) `outline: none` on focused dialogs, with the fix `:focus:not(:focus-visible)`. The Checked line explains what passed per item, including that the chart is decorative with the list carrying the content. Item 12 "needs --runtime".

## gmail-clone, `a11y`

Pass. Five `high` and `medium` findings with file and line: hover-only row actions (`display: none` at gmail-material-components.scss:104-111), removed focus outline on the search field, four unnamed icon buttons, click-only heading and icon, unannounced loading and error states. Six further medium findings fell outside the cap and were listed with evidence.

Loophole: over-cap findings went on the Checked line here and under Notes in the gmail-clone dependencies run. `SKILL.md` step 6 now says they go under Notes, one line each with evidence. Word count after the edit: 892.

## Observations

- Both runs refused to run tier 2 because the project's lint has no accessibility rules, and said so. That is the right reading of "only commands whose purpose is evident".
- Contrast ratios were computed from literal token values as the item asks; no "check contrast" hedges appeared.
