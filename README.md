# Credits
[old_portfolio](https://github.com/charanravi-online/old_portfolio) by [@charanravi-online](https://github.com/charanravi-online) - Inspired the design.

# Portfolio

Personal portfolio built with [Astro](https://astro.build): plain HTML, CSS and a little vanilla JS, no UI framework.
It's a single scrolling page (About → Projects → Experience → Contact) with a fixed side nav, plus a page per project
rendered from its README. Deployed to GitHub Pages at <https://joshuadlima.github.io/Portfolio/>.

## Commands

| Command           | Action                                              |
| :---------------- | :-------------------------------------------------- |
| `npm install`     | Install dependencies                                |
| `npm run dev`     | Start the dev server at `localhost:4321/Portfolio/` |
| `npm run check`   | Type-check components and validate content          |
| `npm run build`   | Build the production site to `./dist/`              |
| `npm run preview` | Preview the production build locally                |

## Updating content

Almost everything is Markdown or a single config file. Nothing below requires touching a component.

| What                                              | Where                                     |
| :------------------------------------------------ | :---------------------------------------- |
| Name, email, status line, social links, resume    | `src/config/site.ts`                      |
| Headline and About paragraphs                     | `src/content/about.md`                    |
| Projects                                          | `src/content/projects/<name>/index.md`    |
| Jobs                                              | `src/content/experience/<name>.md`        |
| Contact photo                                     | `src/assets/` (then point `site.ts` at it) |

Frontmatter is validated by the schemas in `src/content.config.ts`. A typo or a missing field fails
`npm run dev` / `npm run build` with a clear message. Search for `TODO: replace me` to find placeholder content.

### Edit the About section

`src/content/about.md`: the `headline` frontmatter is the large statement at the top of the page. Each paragraph in
the body becomes a block under "about.", laid out in two staggered columns on desktop.

### Add a project (from its README)

1. Create a folder: `src/content/projects/my-project/`. The folder name becomes the URL `/projects/my-project/`.
2. Copy the project's `README.md` into it as `index.md`.
3. Copy any images the README references into the same folder, keeping relative paths like `./demo.png`.
   Astro optimizes them at build time.
4. Delete the README's leading `# Title` line, since the page renders the title for you.
5. Add frontmatter at the top:

```yaml
---
title: My Project
summary: One or two sentences shown on the project card.
date: 2025-06-01
tags: [TypeScript, CLI]
repo: https://github.com/joshuadlima/my-project # optional, GitHub icon on the card
demo: https://my-project.example.com # optional, external-link icon on the card
cover: ./cover.png # optional, image shown above the README
featured: true # optional, pins it to the top of the list
draft: true # optional, hidden from production builds
---
```

### Add a job

Create `src/content/experience/company-role.md`. The body is what you did there, usually a bullet list:

```markdown
---
company: Acme Corp
role: Software Engineer
location: Remote # optional
start: 2023-07-01
end: 2024-12-31 # omit for your current role ("Present")
url: https://acme.example # optional, links the company name
logo: ./acme-logo.png # optional, image next to this file; white/light logos suit the dark theme
---

- Achievement one
- Achievement two
```

Roles are ordered automatically: current roles first, then by date.

### Add or reorder a section

1. Create `src/sections/MySection.astro`, wrapping its content in `<Section id="my-section" title="my section">`.
2. Add it to `src/pages/index.astro`.
3. Add `{ id: 'my-section', label: 'My section' }` to `sections` in `src/config/site.ts` so it appears in the side nav,
   and extend the `Section['id']` type there.

## Project structure

```text
src/
  config/site.ts        site-wide settings (name, links, section list)
  content.config.ts     content schemas
  content/              about.md, projects/, experience/ (Markdown)
  lib/                  content queries, date formatting, URL helper
  styles/               tokens.css (colours/spacing), global.css, prose.css (rendered Markdown)
  components/           small, single-purpose .astro components (SideNav, Logo, Section, ProjectCard…)
  sections/             the four home-page sections
  layouts/BaseLayout    page shell: logo, side nav, main, footer
  pages/                index (the single page), projects/[id] (README pages), 404
```

- **Theme:** colours and spacing are CSS variables in `src/styles/tokens.css`.
- **Links:** always build internal URLs with `withBase()` from `src/lib/url.ts`, so they work under the `/Portfolio/` sub-path.
- **Content queries:** pages get content through `src/lib/content.ts` (it handles draft filtering and sorting),
  never by calling `getCollection` directly.
- **JavaScript:** the only client JS is in `SideNav.astro` (mobile menu and highlighting the section in view).

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages.
One-time setup: in the repo, go to **Settings → Pages → Source** and choose **GitHub Actions**.

If you move to a `joshuadlima.github.io` repo or a custom domain, update `site` and remove `base` in `astro.config.mjs`.

## Known limitations

GitHub-only README features like `> [!NOTE]` alerts and mermaid diagrams render as plain blockquotes or code blocks.
Supporting them would need a remark/rehype plugin, which is a build-time addition, not a UI framework.
