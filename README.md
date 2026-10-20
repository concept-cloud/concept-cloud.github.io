# gregoryhudler.dev

Personal developer portfolio for Gregory Hudler, Systems Administrator & Software Developer.

Built with React, TypeScript, Vite, Tailwind CSS, and React Router. Deployed to GitHub Pages with GitHub Actions at
[gregoryhudler.dev](https://gregoryhudler.dev).

> The previous My Concept Cloud marketing site that lived in this repository is preserved on the
> `backup/myconcept-cloud-site` branch.

---

## Local development

Requirements: Node.js 20.19 or newer (Node 24 recommended) and npm.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command             | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with hot reload                      |
| `npm run lint`      | Run ESLint                                                     |
| `npm run typecheck` | Run the TypeScript compiler without emitting files             |
| `npm run build`     | Type-check and build the production site into `dist/`          |
| `npm run preview`   | Serve the production build locally at http://localhost:4173    |
| `npm run check`     | Lint, type-check, and build in one step                        |

## Project structure

```
public/                 Static files copied as-is (CNAME, favicons, OG image, robots.txt, resume, screenshots)
scripts/
  static-pages.ts       Build plugin: writes per-project HTML pages, 404.html, and sitemap.xml
  og-image.html         Source for public/og-image.png
src/
  data/                 All editable site content (typed)
    site.ts             Name, title, description, contact links, navigation
    projects.ts         Featured projects and project detail pages
    experience.ts       Work and military experience
    education.ts        Degrees and awards
    github.ts           GitHub repository settings and featured overrides
    types.ts            Content types
  components/           Reusable design-system components
  sections/             Home page sections
  pages/                Route pages (home, project detail, 404)
  hooks/ lib/           GitHub API client, document metadata
```

## Updating content

All content lives in `src/data/`. TypeScript will flag missing or misspelled fields.

### Projects

Edit `src/data/projects.ts`. Each project supports:

| Field          | Required | Notes                                                                         |
| -------------- | -------- | ----------------------------------------------------------------------------- |
| `slug`         | yes      | URL segment: `/projects/<slug>/`. Changing it changes the URL.                |
| `title`        | yes      |                                                                               |
| `summary`      | yes      | One or two sentences. Used on cards and as the page’s meta description.      |
| `description`  | yes      | Array of paragraphs for the detail page. Use `[]` if not ready.               |
| `status`       | yes      | `live`, `beta`, `in-development`, `planning`, or `archived`                   |
| `platforms`    | yes      | e.g. `['iOS']`. Use `[]` if unconfirmed.                                      |
| `technologies` | yes      | Only list confirmed technologies. Use `[]` if unconfirmed.                    |
| `highlights`   | yes      | Bullet points for the detail page.                                            |
| `screenshots`  | yes      | `{ src, alt, caption? }[]`. See below.                                        |
| `icon`         | no       | Path to a square icon in `public/`.                                           |
| `githubUrl`    | no       | Omit for private repositories.                                                |
| `liveUrl`      | no       | Omit if there is no public live URL.                                          |
| `blogUrl`      | no       | Development blog page for the project.                                        |
| `featured`     | yes      | `true` shows the project on the home page.                                    |
| `placeholders` | yes      | Notes about unverified or missing content. Shown on the site as a marked box. |

**Content placeholders.** Anything listed in `placeholders` is displayed in a dashed "Content placeholder" box on the
project page, and the card shows "Details pending". The production build also prints a warning listing every project
that still has placeholders. Remove an item once that content is filled in, and set `placeholders: []` when the
project is complete.

**Screenshots.** Put images in `public/projects/<slug>/` and reference them from the root:

```ts
screenshots: [
  { src: '/projects/kin-kitchen/recipes.png', alt: 'Recipe list with dietary filters applied', caption: 'Recipe discovery' },
],
```

**Icons.** Set `icon` to a square image in `public/projects/<slug>/`. Keep full-resolution originals in
`design/project-icons/`, which is not deployed, and publish a resized copy (256px is plenty):

```bash
sips -Z 256 design/project-icons/kin-kitchen.png --out public/projects/kin-kitchen/icon.png
```

**Adding a project.** Copy an existing entry, give it a unique `slug`, and rebuild. The detail page, its static HTML
file, and its sitemap entry are generated automatically.

### Experience and education

Edit `src/data/experience.ts` and `src/data/education.ts`. Experience entries support `role`, `period`, `location`,
`summary`, `highlights`, `brief` (renders a smaller entry), and `placeholders`.

### Resume

Place the PDF at:

```
public/resume/Gregory-Hudler-Resume.pdf
```

It is served at `https://gregoryhudler.dev/resume/Gregory-Hudler-Resume.pdf`. To use a different filename, update
`links.resume` in `src/data/site.ts`.

### GitHub repositories

The GitHub section loads public repositories for the account in `src/data/github.ts` directly from the GitHub REST API
in the visitor’s browser. No token is used, so only public repository data is ever requested.

| Setting           | Description                                                                  |
| ----------------- | ---------------------------------------------------------------------------- |
| `pinned`          | Repository names shown first, in this order                                  |
| `hidden`          | Repository names never shown                                                 |
| `includeForks`    | Show forked repositories                                                     |
| `includeArchived` | Show archived repositories                                                   |
| `maxRepos`        | Maximum number of repositories displayed                                     |
| `overrides`       | Per-repository `description` replacement and `projectSlug` link to a project |

Responses are cached in `sessionStorage` for 15 minutes. Unauthenticated requests are limited to 60 per hour per IP
address. When the limit is reached or GitHub is unreachable, the section shows cached results if available, otherwise a
message with a link to the GitHub profile.

### Social preview image

`public/og-image.png` (1200×630) is rendered from `scripts/og-image.html`. To regenerate it after editing on macOS:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1200,630 \
  --screenshot=public/og-image.png "file://$PWD/scripts/og-image.html"
```

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which installs dependencies, lints, builds, and deploys
`dist/` to GitHub Pages. It can also be run manually from the **Actions** tab.

### One-time GitHub setup

1. Open **Settings → Pages** for `concept-cloud/concept-cloud.github.io`.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Under **Custom domain**, enter `gregoryhudler.dev` and save. With Actions deployments, this setting, not the
   `CNAME` file, controls the domain. The `CNAME` file in `public/` is kept for reference and portability.
4. After DNS resolves and the certificate is issued, check **Enforce HTTPS**.

Recommended: verify the domain at **Account Settings → Pages → Add a domain** to prevent domain takeover. GitHub gives
you a TXT record to add at Name.com (see below).

### How routing works on GitHub Pages

The site uses clean URLs (`/projects/kin-kitchen/`). At build time, `scripts/static-pages.ts` writes a real
`index.html` for every project route, with that project’s title, description, and Open Graph tags, so direct links
return HTTP 200 and share correctly. Unknown paths are served `404.html`, which loads the app and renders the
not-found page.

## Custom domain: Name.com

In Name.com, open **My Domains → gregoryhudler.dev → Manage DNS Records**.

1. **Remove conflicting records.** Delete any existing `A`, `AAAA`, `ALIAS`, `ANAME`, or `CNAME` records for the root
   (`@` or blank host) and for `www`, including Name.com parking records. Turn off **URL Forwarding** for the domain if
   it is enabled.
2. **Add the apex records** (host left blank or `@`):

   | Type | Host | Answer                |
   | ---- | ---- | --------------------- |
   | A    | @    | `185.199.108.153`     |
   | A    | @    | `185.199.109.153`     |
   | A    | @    | `185.199.110.153`     |
   | A    | @    | `185.199.111.153`     |
   | AAAA | @    | `2606:50c0:8000::153` |
   | AAAA | @    | `2606:50c0:8001::153` |
   | AAAA | @    | `2606:50c0:8002::153` |
   | AAAA | @    | `2606:50c0:8003::153` |

3. **Add `www`:**

   | Type  | Host | Answer                     |
   | ----- | ---- | -------------------------- |
   | CNAME | www  | `concept-cloud.github.io`  |

   GitHub Pages automatically redirects `www.gregoryhudler.dev` to `gregoryhudler.dev`.

4. **Domain verification (recommended):** add the TXT record GitHub provides, typically:

   | Type | Host                                       | Answer               |
   | ---- | ------------------------------------------ | -------------------- |
   | TXT  | `_github-pages-challenge-concept-cloud`    | *(value from GitHub)* |

5. **Verify** propagation, which can take from a few minutes to 24 hours:

   ```bash
   dig +short gregoryhudler.dev A
   dig +short gregoryhudler.dev AAAA
   dig +short www.gregoryhudler.dev CNAME
   ```

`.dev` domains are on the HSTS preload list, so browsers only load them over HTTPS. The site won’t be reachable in a
browser until GitHub has issued the certificate and **Enforce HTTPS** is enabled.

### Note on the user site

`concept-cloud.github.io` is the account’s user site. Once a custom domain is set here, `concept-cloud.github.io`
redirects to `gregoryhudler.dev`, and any GitHub Pages project sites on the `concept-cloud` account are served under
`gregoryhudler.dev/<repository>`.
