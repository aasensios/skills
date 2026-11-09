# Security

Prefix: SEC. Owns: secrets in tracked files, known vulnerabilities, security headers and CSP, XSS sinks, token storage, external link hardening, unpinned third-party actions, public env var leaks. Not this area: outdated, unused or duplicated packages (`dependencies`), pipeline shape (`ci`).

Findings in this area are never suppressed by a documented choice. When a documented choice causes one, the finding cites the document.

## Items

1. **Secrets in tracked files.** Look at: `git ls-files` for `.env`, `.env.*` (other than `.env.example`), `*.pem`, `*.key`, service account JSON; source and config for strings shaped like API keys, tokens or private keys (`sk_live_`, `AKIA`, `ghp_`, `-----BEGIN`, long base64 after `key`, `token`, `secret`). Finding when: any match is tracked. Impact: high. Suggest: remove the file from the tree, rotate the credential, add the pattern to `.gitignore`, and keep an `.env.example` with empty values.
2. **Known vulnerabilities.** Look at: `<pm> audit` output (tier 2). Finding when: any advisory of moderate severity or higher is reported. Impact: high for critical or high severity, medium otherwise. Group by advisory, name the vulnerable package and the fixed version. Suggest: upgrade to the fixed version; where the fix is only in a newer major, say so and point at the `dependencies` finding.
3. **Supply chain delay.** Look at: `minimumReleaseAge` in `pnpm-workspace.yaml` or `.npmrc`, `min-release-age` in npm config, the package manager version. Finding when: pnpm older than 11, or npm or yarn with no release age configured. Impact: medium. Suggest: pnpm 11 or later, which defaults to a 24 hour `minimumReleaseAge`; otherwise set the equivalent setting to 1440 minutes.
4. **Security headers and CSP.** Look at: hosting config (`_headers`, `vercel.json`, `netlify.toml`, `nginx.conf`, `next.config.*` headers, `astro.config.*` `security.csp`), `<meta http-equiv="Content-Security-Policy">` in the HTML shell. Finding when: a deployed site has no CSP and no `X-Content-Type-Options`, `Referrer-Policy` or `Permissions-Policy`. Impact: medium. Suggest: the framework's CSP feature when it has one (Astro `security.csp` with hashes), otherwise a `_headers` file or host config with CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`. Where the host cannot set headers (GitHub Pages), a CSP meta tag is the suggestion and the other headers are listed as "not available on this host".
5. **XSS sinks.** Look at: `dangerouslySetInnerHTML`, `v-html`, `{@html }`, `[innerHTML]`, `.innerHTML =`, `set:html`, `document.write`, `eval`, `new Function`. Finding when: a sink receives data that is not a literal or a sanitised value. Impact: high when the data comes from user input, a URL or an API; low when it is a build-time constant. Suggest: render as text, or sanitise with DOMPurify before the sink.
6. **Token storage.** Look at: `localStorage.setItem` and `sessionStorage.setItem` with keys or values named token, jwt, auth, session, api key. Finding when: a credential is stored in web storage. Impact: high. Suggest: an `HttpOnly`, `Secure`, `SameSite` cookie set by the server; for a static site with no server, keep the token in memory only.
7. **External links.** Look at: `target="_blank"` anchors without `rel="noopener"`, and `window.open` calls with URLs built from data. Finding when: a `target="_blank"` link lacks `rel="noopener"` in a browser target older than 2021, or `window.open` receives untrusted data without an allow-list. Impact: low for the attribute, medium for `window.open` with data. Suggest: `rel="noopener noreferrer"`; validate the origin before `window.open`.
8. **Third-party actions pinned.** Look at: every `uses:` in `.github/workflows/*.yml`. Finding when: a third-party action (not `actions/*` or `github/*`) is referenced by tag or branch instead of a 40-character commit SHA. Impact: medium. Suggest: pin to the commit SHA with the tag in a trailing comment, and let Renovate or Dependabot bump the SHA.
9. **Third-party origins.** Look at: every `https://` origin the shipped page contacts, from `src`, templates, layouts, `public` and config: `fetch`, `<img src>`, `<script src>`, `<link href>` to stylesheets or fonts, CSS `url()`, iframes, and any `.ts` or `.js` helper that builds such URLs. List the origins found. Finding when: a document (README, AGENTS.md, CLAUDE.md) claims there are no third-party requests but the list is not empty (impact medium, cites the document), or a third-party script or stylesheet loads without Subresource Integrity (impact medium). Suggest: correct the claim or self-host the asset; add `integrity` to third-party scripts and styles.
10. **Public env var leaks.** Look at: variables with the framework's public prefix (`PUBLIC_`, `NEXT_PUBLIC_`, `VITE_`, `NUXT_PUBLIC_`) in `.env*` and config. Finding when: a public-prefixed variable holds a secret-shaped value, or a server-only secret is read in client code. Impact: high. Suggest: drop the public prefix and read it only on the server.

## Current defaults

| Need | Tool or technique | Verified |
|---|---|---|
| Vulnerability check | `<pm> audit` | 2026-11-09 |
| Supply chain delay | pnpm 11 `minimumReleaseAge` (default 1440 minutes); npm `min-release-age` | 2026-11-09 |
| CSP on Astro | `security.csp` with hashes (stable since Astro 6) | 2026-11-09 |
| Headers on a static host | `_headers` file (Cloudflare, Netlify) or host config; meta CSP on GitHub Pages | 2026-11-09 |
| HTML sanitising | DOMPurify | 2026-11-09 |
| Action pinning | 40-character commit SHA with the tag as a comment | 2026-11-09 |
| Secret scanning in CI | gitleaks | 2026-11-09 |
