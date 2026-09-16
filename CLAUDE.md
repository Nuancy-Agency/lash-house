## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Hardening: never let JS-only rules hide real content

`.reveal` (scroll-in effect) and any Alpine `x-cloak`-gated element (mobile nav, sticky booking CTA) must never be the *only* thing standing between the visitor and real content/CTAs. If the script fails (CSP, ad-blocker, slow/broken network, JS disabled), that content must still be reachable.

- `Layout.astro`'s `<head>` already ships a `<noscript>` block forcing `.reveal` to `opacity:1`, hiding the JS-only toggle button (`data-js-toggle`), and force-opening the mobile nav (`#menu-mobile[x-cloak]`) and the sticky mobile booking CTA (`#cta-sticky-mobile[x-cloak]`, in `CTAFinal.astro`). Keep it in sync: any new `x-cloak`-gated nav/CTA panel needs its `id` added to that block's selectors.
- Note: `global.css`'s comment on `.reveal` claims content "starts visible, JS only adds the transition" — that was never true (the rule starts at `opacity:0`); don't trust that comment, trust the `<noscript>` override instead, and fix the comment if you touch that rule.
- When adding a new reveal/menu/floating-CTA pattern, either make it visible-by-default with JS only adding the transition class, or extend the existing `<noscript>` block — from the first version, not as a later fix.
- Found 2026-09-16 via `/impeccable harden`: this exact bug existed in all 5 Nuance Agency sites (shared site-forge template); Lash House additionally lost its floating Fresha CTA entirely without JS. Logged in Obsidian `Atualizações.md` → "Checklist Técnico (Todos os Sites)".
