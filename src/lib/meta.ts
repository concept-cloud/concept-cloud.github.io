import { useEffect } from 'react'
import { site } from '../data/site'

interface DocumentMeta {
  title?: string
  description?: string
  path: string
  noindex?: boolean
}

// MARK: Helpers

function setMeta(selector: string, value: string) {
  document.head.querySelector(selector)?.setAttribute('content', value)
}

// MARK: Hook

export function useDocumentMeta({ title, description = site.description, path, noindex = false }: DocumentMeta) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.title}`
    const url = `${site.url}${path}`

    document.title = fullTitle
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', fullTitle)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:url"]', url)
    setMeta('meta[name="twitter:title"]', fullTitle)
    setMeta('meta[name="twitter:description"]', description)
    document.head.querySelector('link[rel="canonical"]')?.setAttribute('href', url)

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (noindex) {
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.append(robots)
      }
      robots.content = 'noindex'
    } else {
      robots?.remove()
    }
  }, [title, description, path, noindex])
}
