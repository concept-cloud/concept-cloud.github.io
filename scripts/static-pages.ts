import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import type { Plugin } from 'vite'
import { projects } from '../src/data/projects.ts'
import { site } from '../src/data/site.ts'

interface PageMeta {
  title: string
  description: string
  path: string
  noindex?: boolean
}

// MARK: HTML helpers

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function setAttribute(html: string, selector: RegExp, value: string) {
  return html.replace(selector, (_match, start: string, end: string) => `${start}${escapeHtml(value)}${end}`)
}

function applyMeta(template: string, meta: PageMeta) {
  const url = `${site.url}${meta.path}`
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
  html = setAttribute(html, /(<meta name="description" content=")[^"]*(")/, meta.description)
  html = setAttribute(html, /(<meta property="og:title" content=")[^"]*(")/, meta.title)
  html = setAttribute(html, /(<meta property="og:description" content=")[^"]*(")/, meta.description)
  html = setAttribute(html, /(<meta property="og:url" content=")[^"]*(")/, url)
  html = setAttribute(html, /(<meta name="twitter:title" content=")[^"]*(")/, meta.title)
  html = setAttribute(html, /(<meta name="twitter:description" content=")[^"]*(")/, meta.description)
  html = setAttribute(html, /(<link rel="canonical" href=")[^"]*(")/, url)
  if (meta.noindex) {
    html = html.replace(/\s*<link rel="canonical" href="[^"]*" \/>/, '')
    html = html.replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>')
  }
  return html
}

function writePage(outDir: string, path: string, html: string) {
  const dir = join(outDir, path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

// MARK: Sitemap

function buildSitemap(paths: string[]) {
  const lastmod = new Date().toISOString().slice(0, 10)
  const entries = paths
    .map((path) => `  <url>\n    <loc>${site.url}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
}

// MARK: Plugin

export function staticPages(): Plugin {
  let outDir = 'dist'

  return {
    name: 'static-pages',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const template = readFileSync(join(outDir, 'index.html'), 'utf8')
      const projectPaths = projects.map((project) => `/projects/${project.slug}/`)

      projects.forEach((project, index) => {
        const html = applyMeta(template, {
          title: `${project.title} — ${site.name}`,
          description: project.summary,
          path: projectPaths[index] ?? '/',
        })
        writePage(outDir, `projects/${project.slug}`, html)
      })

      writeFileSync(
        join(outDir, '404.html'),
        applyMeta(template, {
          title: `Page not found — ${site.name}`,
          description: site.description,
          path: '/404.html',
          noindex: true,
        }),
      )

      writeFileSync(join(outDir, 'sitemap.xml'), buildSitemap(['/', ...projectPaths]))

      const pending = projects.filter((project) => project.placeholders.length > 0)
      if (pending.length > 0) {
        this.warn(`Projects with content placeholders: ${pending.map((project) => project.slug).join(', ')}`)
      }
    },
  }
}
