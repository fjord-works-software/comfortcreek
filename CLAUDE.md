# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Astro dev server (port 4321)
npm run dev:cms      # Start local Decap CMS backend only
npm run dev:all      # Start both Astro and CMS backend concurrently
npm run build        # Production build to dist/
npm run preview      # Preview the production build locally
```

There are no tests or linters configured.

## Architecture

This is a static Astro 5 site for a counseling practice (Comfort Creek Counseling). Output is fully static (`output: 'static'`).

**Content layer** — All editable content lives in `src/data/` as Markdown or JSON files. Astro's content collections (defined in `src/content.config.ts`) load these at build time via `glob` loaders. Collections: `pages`, `team`, `blog`. Pages fetch their content with `getEntry('pages', '<slug>')`.

**CMS** — The `/admin` route (`src/pages/admin/index.astro`) loads [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (a Decap CMS-compatible replacement). Its collection config lives in `public/admin/config.yml`. The CMS writes directly to the files in `src/data/`. OAuth for the GitHub backend goes through a Cloudflare Worker at `sveltia-cms-auth.fjordworkssoftware.workers.dev`. To edit content locally, run `npm run dev:all` so the local Decap backend proxies writes to disk.

**Settings** — `src/data/settings.json` holds site-wide values (practice name, email, phone, address, Web3Forms key). `Layout.astro` imports this directly and passes `practice_name` and `email` down to `Header` and `Footer` as props.

**Contact form** — Powered by [Web3Forms](https://web3forms.com). The form only renders if `settings.web3forms_key` is non-empty; otherwise a fallback message with a mailto link is shown. The key is managed via the CMS under Site Settings.

**Adding a new page** — Create `src/data/pages/<slug>.md` with the required frontmatter, add `src/pages/<slug>.astro` that calls `getEntry('pages', '<slug>')`, and add a corresponding entry under the `pages` collection in `public/admin/config.yml`.

**Team members** — Each member is a separate `.md` file in `src/data/team/`. They are sorted by the `order` frontmatter field (ascending, nulls last) and rendered on the About Us page with their bio body as rendered Markdown.

## Shared components and utilities

**`PageHeader`** (`src/components/PageHeader.astro`) — renders the blue `page-header` banner used at the top of every content page. Accepts `title: string` and optional `intro: string`. All content pages and blog pages use this component; don't inline the `page-header` div directly.

**`formatDate`** (`src/utils/formatDate.ts`) — formats a `Date` to a long US locale string (e.g. "May 31, 2026"). Used by both blog pages; import this rather than calling `toLocaleDateString` inline.

## Styles

The brand color is defined as `--brand` in `:root` (`src/styles/global.css`) and used by `.hero-wrapper` and `.page-header`. Change the color there, not in component files.

The contact page uses `.form-warning` (amber) for the unconfigured-form state and `.form-success` (green) for a future success message — they are separate classes with different semantics.
