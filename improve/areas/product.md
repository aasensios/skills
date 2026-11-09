# Product

Prefix: PROD. Owns: visual consistency through tokens, dark mode, responsive layout, loading, empty and error states, form feedback, navigation, copy clarity. Not this area: focus visibility, contrast, reduced motion, target size (`accessibility`); image and font weight (`performance`).

## Items

1. **Design tokens.** Look at: the stylesheets for custom properties covering colour, spacing, type scale and radius, and for literal values (`#hex`, `px` spacing, `font-size` numbers) used in components where a token exists. Finding when: no token layer exists, or more than a handful of literals bypass the tokens. Impact: medium. Suggest: tokens as CSS custom properties on `:root`, one per role, and components that only reference tokens.
2. **Dark mode.** Look at: a theme mechanism (`prefers-color-scheme`, `data-theme`, `color-scheme`, `light-dark()`), and whether every colour token has a dark value; images and brand colours with a dark variant. Finding when: a theme exists but some surfaces, borders, images or brand colours keep their light value in the dark theme, or the choice does not persist across loads when a toggle exists. Impact: medium. Suggest: `color-scheme: light dark` with `light-dark()` for every colour token, a `data-theme` override for the toggle, and the choice persisted.
3. **Responsive layout.** Look at: media and container queries, fixed widths, horizontal overflow risks (long words, tables, code), the 320 px to 400 px range. Finding when: a layout has no narrow breakpoint, a fixed width exceeds a phone viewport, or a component overflows horizontally. Impact: high when content is cut off, medium otherwise. Suggest: container queries for components, fluid widths, `overflow-wrap: anywhere` for long strings.
4. **Loading, empty and error states.** Look at: every async view or list for a loading indicator, an empty message with a next step, and an error message with a retry. Finding when: a state is missing, or every failure shows the same message. Impact: high for a missing error state, medium otherwise. Suggest: one component per state, with the error message naming what failed and what to do.
5. **Form feedback.** Look at: forms for inline validation on blur or submit, messages next to the field, the submit button's busy state, success confirmation. Finding when: validation errors appear only after submit at the top of the page, or a submit can fire twice. Impact: high. Suggest: field-level messages, a disabled busy state on submit, a confirmation after success.
6. **Navigation.** Look at: the current page or section marked (`aria-current`, active style), consistent placement, a way back from every screen, deep-linkable state in the URL for filters, tabs and pages. Finding when: the current location is not marked, or state that users share is not in the URL. Impact: medium. Suggest: `aria-current="page"`, URL search params for shareable state.
7. **Copy clarity.** Look at: button and link labels, headings, error messages, empty states, placeholder text. Finding when: a label is generic ("Submit", "Click here", "Error"), a placeholder is the only label, or two labels mean the same thing. Impact: low. Suggest: verb-first labels naming the outcome, a visible label instead of a placeholder.
8. **Non-functional controls.** Look at: click handlers that only log, menu items and buttons with no handler, links to `#`. Finding when: a visible control does nothing. Impact: high. Suggest: wire it, hide it, or disable it with a reason.

## Current defaults

| Need | Tool or technique | Verified |
|---|---|---|
| Tokens | CSS custom properties on `:root`, one per role | 2026-11-09 |
| Theming | `color-scheme: light dark` with `light-dark()`; `data-theme` for a user override | 2026-11-09 |
| Component responsiveness | container queries (`@container`) | 2026-11-09 |
| Shareable state | URL search params | 2026-11-09 |
| Current location | `aria-current="page"` | 2026-11-09 |
| Fluid type and spacing | `clamp()` | 2026-11-09 |
