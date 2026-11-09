# Internationalization

Prefix: I18N. Owns: readiness of the code for more than one locale, and, when a locale setup exists, the completeness of the translations. Not this area: `lang` attribute correctness as an accessibility matter is shared; report it here only when it concerns locale switching.

Detection: a locale setup exists when the stack table found an i18n library, or the repo has a `locales/`, `messages/`, `i18n/` or `project.inlang/` folder, or the framework's i18n config (`i18n` in `astro.config.*`, `next.config.*`, `nuxt.config.*`, Angular `localize`). Items 6 to 9 run only then; otherwise they are "Not checked: not applicable".

## Readiness items

1. **Strings centralised.** Look at: user-facing strings in templates and components versus a central copy object, message catalogue or translation function. Finding when: user-facing strings are scattered through templates in a multi-locale app (impact medium), or built by concatenating fragments ("at " + company) anywhere (impact low, since word order differs by language). Suggest: one copy module or message catalogue with parameterised messages.
2. **Dates, numbers and plurals through `Intl`.** Look at: hand-written month names, `toFixed` for display, manual plural suffixes (`years` versus `year`), string splitting of dates. Finding when: formatting is hand-rolled where `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.PluralRules` or `Intl.RelativeTimeFormat` applies. Impact: low on a single-locale site, medium with a locale setup. Suggest: the matching `Intl` API with the page locale.
3. **Logical CSS properties.** Look at: `margin-left`, `padding-right`, `left:`, `text-align: left`, `border-left` in stylesheets. Finding when: physical properties set layout that should mirror in a right-to-left locale, in an app that has or plans a locale setup. Impact: low. Suggest: `margin-inline-start`, `padding-inline-end`, `inset-inline-start`, `text-align: start`.
4. **`lang` and `dir`.** Look at: `<html lang>` and `dir`, and whether they follow the active locale when one exists. Finding when: `lang` is static in a multi-locale app, or `dir` is missing for a right-to-left locale. Impact: medium with a locale setup, otherwise not applicable. Suggest: set both from the active locale in the layout.
5. **Locale routing.** Look at: per-locale paths or domains, `hreflang` alternates, a locale switcher, the default locale fallback. Finding when: more than one locale is served with no `hreflang` links or no way to switch. Impact: medium. Suggest: the framework's i18n routing with `hreflang` alternates.

## Translation items, only with a locale setup

6. **Missing keys.** Look at: each locale's catalogue against the source locale. Finding when: a key exists in the source locale and not in another. Impact: medium. Name the missing keys per locale. Suggest: add the keys; enforce parity in CI with the library's lint or extract command.
7. **Untranslated strings.** Look at: values in a non-source locale identical to the source value, and hardcoded strings outside the catalogue. Finding when: a non-trivial string is identical across locales or bypasses the catalogue. Impact: medium. Suggest: translate or mark as intentionally shared.
8. **Plural forms.** Look at: messages with counts for ICU plural or the library's plural syntax, and whether each locale provides the forms its plural rules need. Finding when: a count message uses a single form or a locale lacks a required category. Impact: medium. Suggest: ICU `{count, plural, one {...} other {...}}` with the categories from `Intl.PluralRules`.
9. **Message format.** Look at: the catalogue syntax. Finding when: messages use ad hoc placeholders (`%s`, `{0}`) with no library support for plurals and selects. Impact: low. Suggest: ICU MessageFormat, or the library's typed messages.

## Current defaults

| Need | Tool or technique | Verified |
|---|---|---|
| Formatting | `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.PluralRules`, `Intl.RelativeTimeFormat` | 2026-11-09 |
| Library for a new project | Paraglide JS (compile-time, tree-shakeable, framework-agnostic) | 2026-11-09 |
| Library with an existing catalogue and translator workflow | Lingui (PO files); i18next when the project already uses it | 2026-11-09 |
| Message syntax | ICU MessageFormat | 2026-11-09 |
| Layout mirroring | CSS logical properties | 2026-11-09 |
| Routing | the framework's i18n routing with `hreflang` alternates | 2026-11-09 |
