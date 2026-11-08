import { useEffect } from 'react'
import { site } from '@/config/site'

interface PageMeta {
  title: string
  description: string
  /** Caminho da página (ex.: /projects/game-library) para canonical e og:url. */
  path: string
  type?: 'website' | 'article'
  image?: string
  noindex?: boolean
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function setLink(rel: string, href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!href) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

/**
 * Atualiza título e metadados da página atual (SPA).
 * Os valores padrão também estão no index.html para crawlers que não executam JS.
 */
export function usePageMeta({
  title,
  description,
  path,
  type = 'website',
  image,
  noindex,
}: PageMeta) {
  useEffect(() => {
    const abs = (p: string) => (site.url ? `${site.url}${p}` : p)
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:image', abs(image ?? site.ogImage))
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'robots', noindex ? 'noindex' : 'index, follow')
    if (site.url) setMeta('property', 'og:url', abs(path))
    setLink('canonical', site.url ? abs(path) : null)
  }, [title, description, path, type, image, noindex])
}
