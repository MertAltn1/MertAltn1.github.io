# Halis Mert Altın — Portfolio

A single-page, data-driven personal portfolio built with React, Vite, React Router, Lucide icons, and plain CSS.

## Development

```bash
npm install
npm run dev
```

Run `npm run lint` and `npm run build` before publishing.

## Structure

```
src/
  sections/   one component per home-page section (Hero, Experience, Projects, …)
  pages/      HomePage composes the sections; detail routes and 404
  data/       all content — experiences, projects, skills, education, certificates, site
  styles/     index.css declares the @layer order and imports the rest
  hooks/      useTheme, useSectionNav, useScrollSpy
```

`src/data/sections.js` is the single source of truth for section ids and header
navigation — the header, scroll-spy, and footer all read from it.

### Styling

Plain CSS, no preprocessor and no utility framework. Cascade order is declared once
in `src/styles/index.css`:

```
@layer reset, base, layout, components, sections, utils;
```

Every design decision (colour, spacing, type scale, motion) is a custom property in
`src/styles/tokens.css`. Both themes are defined there — `:root` and
`:root[data-theme='dark']`. Change a token, and the whole site follows.

`src/styles/backdrop.css` holds the aurora + film grain behind the hero. It is pure
CSS: three blurred radial gradients animating only `transform`, so it stays on the
GPU. It freezes under `prefers-reduced-motion`.

## Routing and deployment

The site uses `HashRouter`. URLs after `/#/` are handled entirely in the browser, so
refreshing a detail page remains reliable on GitHub Pages without custom server
rewrites. Because the router owns the hash, in-page navigation cannot use
`href="#section"` anchors — `src/hooks/useSectionNav.js` scrolls imperatively instead.

Vite uses `/` as its base because this is intended for the `mertaltin1.github.io`
user site. Pushing to `main` triggers `.github/workflows/deploy.yml`.

## Content

All copy that changes lives in `src/data`. Two files still need real assets dropped
into `public/`:

| File | Purpose |
| --- | --- |
| `public/mert.jpg` | Hero portrait. Until it exists, the frame falls back to an `MA` monogram. |
| `public/HalisMertAltin-CV.pdf` | Target of the “Download CV” button. |

`site.linkedin` in `src/data/site.js` is still empty; the LinkedIn links stay hidden
until it is filled in.
