import { useEffect, useState, type RefObject } from 'react'

/** true enquanto o elemento estiver visível. Usado para pausar animações fora da tela. */
export function useInView(ref: RefObject<Element | null>, rootMargin = '0px'): boolean {
  const [inView, setInView] = useState(false)
  // Sem IntersectionObserver (navegadores antigos), considera sempre visível.
  const supported = typeof IntersectionObserver !== 'undefined'
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!supported) return
    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      rootMargin,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin, supported])
  return supported ? inView : true
}
