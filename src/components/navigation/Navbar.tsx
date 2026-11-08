import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import { navSections } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/utils/cn'

const sectionIds = navSections.map((s) => s.id)

export function Navbar() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const active = useActiveSection(sectionIds, isHome)
  const progress = useScrollProgress()

  // Fecha o menu ao navegar (ajuste de estado durante o render, sem efeito).
  const [lastKey, setLastKey] = useState(location.key)
  if (lastKey !== location.key) {
    setLastKey(location.key)
    setOpen(false)
  }

  // Esc fecha o menu e devolve o foco ao botão.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          to="/"
          onClick={() => {
            if (isHome && !location.hash) window.scrollTo({ top: 0 })
          }}
          className="font-display text-sm font-bold tracking-widest text-neon"
          aria-label="LR://SYS — início"
        >
          LR<span className="text-foreground">://SYS</span>
        </Link>

        <ul className="hidden gap-6 md:flex">
          {navSections.map(({ id, label }) => {
            const isActive = isHome && active === id
            return (
              <li key={id}>
                <Link
                  to={{ pathname: '/', hash: id }}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'relative py-2 font-mono text-xs tracking-widest uppercase transition-colors',
                    isActive ? 'text-neon' : 'text-muted-foreground hover:text-neon',
                  )}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-0 -bottom-0.5 h-px origin-left bg-neon transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 p-2 text-neon md:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      <ul
        id={menuId}
        hidden={!open}
        className="border-t border-border bg-background px-4 py-2 md:hidden"
      >
        {navSections.map(({ id, label }) => {
          const isActive = isHome && active === id
          return (
            <li key={id}>
              <Link
                to={{ pathname: '/', hash: id }}
                onClick={() => setOpen(false)}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'block py-3 font-mono text-sm tracking-widest uppercase',
                  isActive ? 'text-neon' : 'text-muted-foreground hover:text-neon',
                )}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>

      <div
        aria-hidden="true"
        className="glow-neon h-px bg-neon"
        style={{ width: `${progress * 100}%` }}
      />
    </header>
  )
}
