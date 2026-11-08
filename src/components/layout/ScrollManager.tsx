import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { prefersReducedMotion } from '@/utils/motion'

/**
 * Controla a rolagem nas navegações:
 * - com #hash: rola até a seção (inclusive vindo de outra página);
 * - mudança de página sem hash: volta ao topo;
 * - mudança só de ?query (ex.: filtro de projetos): mantém a posição.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const prevPath = useRef<string | null>(null)

  useEffect(() => {
    const pathChanged = prevPath.current !== pathname
    prevPath.current = pathname

    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      let tries = 0
      let frame = 0
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
            block: 'start',
          })
          return
        }
        if (tries++ < 20) frame = requestAnimationFrame(tryScroll)
      }
      tryScroll()
      return () => cancelAnimationFrame(frame)
    }

    if (pathChanged) window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash, key])

  return null
}
