import { useEffect, useState } from 'react'

/** Progresso de rolagem da página entre 0 e 1. */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      setProgress(el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return progress
}
