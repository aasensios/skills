# Accessibility

Prefix: A11Y. Owns: semantics and landmarks, heading order, labels, alt text, focus visibility, keyboard reachability, colour contrast, ARIA misuse, reduced motion, `lang`, target size. Reference: WCAG 2.2 level AA. Not this area: visual consistency, copy, layout (`product`).

## Items

1. **Landmarks and document structure.** Look at: the HTML shell and page templates for `<main>`, `<nav>`, `<header>`, `<footer>`, or their ARIA roles; a skip link on pages with repeated navigation. Finding when: content sits in `<div>` soup with no `<main>`, or navigation repeats on every page with no skip link. Impact: medium. Suggest: the native landmark elements; a skip link as the first focusable element.
2. **Heading order.** Look at: `<h1>` to `<h6>` in rendered order per page, including inside dialogs and sections. Finding when: no `<h1>`, more than one `<h1>` on a page, or a level is skipped. Impact: low. Suggest: one `<h1>`, levels that step by one.
3. **Form labels.** Look at: every `<input>`, `<select>`, `<textarea>` for a `<label for>`, wrapping label, `aria-label` or `aria-labelledby`; error messages linked with `aria-describedby`. Finding when: a control has no accessible name, or errors are shown only by colour. Impact: high. Suggest: a visible `<label>`; `aria-describedby` for hints and errors.
4. **Alt text.** Look at: `<img>` and the framework's image component for `alt`; decorative images `alt=""`; icon-only buttons and links for an accessible name. Finding when: an image lacks `alt`, an informative image has empty `alt`, or an icon-only control has no name. Impact: high. Suggest: descriptive `alt`, `alt=""` for decoration, `aria-label` on icon-only controls.
5. **Visible focus.** Look at: CSS for `outline: none` or `outline: 0` without a replacement `:focus-visible` style; custom controls for a focus style. Finding when: focus is removed and not replaced, or the replacement has under 3:1 contrast. Impact: high. Suggest: a `:focus-visible` outline of at least 2 px with 3:1 contrast against the surroundings.
6. **Keyboard reachability.** Look at: click handlers on `<div>`, `<span>`, `<svg>` or `<img>` without `tabindex` and key handling; dialogs for `<dialog>` or a focus trap, Escape to close, focus return; hover-only disclosures. Finding when: an interactive element is not a button, link or input and has no keyboard path, or a dialog does not trap and return focus. Impact: high. Suggest: `<button>` or `<a>`; the native `<dialog>` with `showModal()`.
7. **Colour contrast.** Look at: the design tokens for text and background pairs in each theme, muted and placeholder text, text on brand colours. Compute the ratio where the values are literal. Finding when: body text under 4.5:1, large text or UI components under 3:1. Impact: high. Suggest: adjust the token so the pair meets the ratio; keep one token per role so a fix applies everywhere.
8. **ARIA misuse.** Look at: `role` and `aria-*` attributes against the element they sit on; `aria-hidden` on focusable content; `aria-live` on regions that change; redundant roles on native elements; scripts that write token-valued attributes (`aria-current`, `aria-pressed`, `aria-expanded`, `aria-selected`) with `toggleAttribute`, which stores an empty string that assistive technology reads as `false`. Finding when: an attribute is invalid for the element, holds an empty or non-token value, hides focusable content, or a status region changes with no live announcement. Impact: medium. Suggest: the native element without ARIA where one exists; `setAttribute` with the token value; `role="status"` for passive updates.
9. **Reduced motion.** Look at: CSS animations and transitions, autoplaying media and animated images, `@media (prefers-reduced-motion: reduce)` coverage, a pause control on anything that moves longer than five seconds. Finding when: motion plays with no reduced-motion fallback, or looping animation has no pause. Impact: medium. Suggest: wrap motion in `@media (prefers-reduced-motion: no-preference)`; a visible pause button for autoplay.
10. **Language.** Look at: `<html lang>` and `lang` on passages in another language. Finding when: `lang` is missing or wrong. Impact: medium. Suggest: `lang` on `<html>` matching the content.
11. **Target size.** Look at: icon buttons, pagination, close buttons and their CSS size and spacing. Finding when: a target is under 24 by 24 CSS pixels with no spacing exception. Impact: low. Suggest: a 24 px minimum, 44 px where space allows.

Tier 3, with `--runtime` only:

12. **Automated scan.** Look at: an axe-core run against the built site, on each route and with each dialog open. Finding when: axe reports a serious or critical violation not already covered above. Impact: as axe grades it. Suggest: the fix axe names, mapped to items 1 to 11.

## Current defaults

| Need | Tool or technique | Verified |
|---|---|---|
| Standard | WCAG 2.2 level AA; target size 2.5.8 at 24 px | 2026-11-09 |
| Automated scan | axe-core through `@axe-core/playwright`; Lighthouse's accessibility audit is a subset of the same rules | 2026-11-09 |
| Dialogs | native `<dialog>` with `showModal()` | 2026-11-09 |
| Focus style | `:focus-visible` | 2026-11-09 |
| Motion | `prefers-reduced-motion` media query | 2026-11-09 |
| Status updates | `role="status"` and `aria-live="polite"` | 2026-11-09 |
