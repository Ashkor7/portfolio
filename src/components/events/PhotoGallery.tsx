import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { EventPhoto } from '@/data/types'

const controlClass =
  'clip-btn inline-flex size-11 items-center justify-center bg-surface/90 text-neon transition-colors hover:bg-neon hover:text-primary-foreground focus-visible:shadow-[inset_0_0_0_2px_var(--foreground)] focus-visible:outline-none'

/** Grade de miniaturas com visualização ampliada acessível (Esc, setas, foco preso). */
export function PhotoGallery({ photos, label }: { photos: EventPhoto[]; label: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const thumbs = useRef<Array<HTMLButtonElement | null>>([])
  const dialog = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const lastOpened = useRef(0)

  const isOpen = open !== null

  useEffect(() => {
    if (!isOpen) return
    closeBtn.current?.focus()
    const thumbEls = thumbs.current
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      // Devolve o foco à miniatura da última foto vista.
      thumbEls[lastOpened.current]?.focus()
    }
  }, [isOpen])

  const show = (i: number) => {
    lastOpened.current = i
    setOpen(i)
  }
  const step = (delta: number) =>
    setOpen((i) => {
      if (i === null) return i
      const next = (i + delta + photos.length) % photos.length
      lastOpened.current = next
      return next
    })

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') setOpen(null)
    else if (e.key === 'ArrowRight') step(1)
    else if (e.key === 'ArrowLeft') step(-1)
    else if (e.key === 'Tab') {
      const focusable = dialog.current?.querySelectorAll<HTMLButtonElement>('button')
      if (!focusable?.length) return
      const first = focusable[0]!
      const last = focusable[focusable.length - 1]!
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  const current = open === null ? null : photos[open]

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label={label}>
        {photos.map((p, i) => (
          <li key={p.src}>
            <button
              ref={(el) => {
                thumbs.current[i] = el
              }}
              type="button"
              onClick={() => show(i)}
              aria-label={`Ampliar foto ${i + 1} de ${photos.length}: ${p.alt}`}
              className="group clip-hud block w-full bg-neon/20 p-px transition-colors hover:bg-neon/70 focus-visible:bg-neon focus-visible:outline-none"
            >
              <span className="clip-hud block overflow-hidden bg-background">
                <img
                  src={p.thumb}
                  alt=""
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && open !== null && (
        <div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${open + 1} de ${photos.length}`}
          onKeyDown={onKeyDown}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(null)
          }}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-background/95 p-4 backdrop-blur-sm"
        >
          <div className="flex w-full max-w-5xl items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
            <span aria-hidden="true">
              IMG_{String(open + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </span>
            <button
              ref={closeBtn}
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Fechar foto ampliada"
              className={controlClass}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <figure className="flex min-h-0 w-full max-w-5xl flex-1 flex-col items-center justify-center">
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              className="max-h-full min-h-0 w-auto max-w-full border border-neon/30 object-contain"
            />
            <figcaption className="mt-3 max-w-3xl text-center text-sm text-muted-foreground">
              {current.alt}
            </figcaption>
          </figure>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Foto anterior"
              className={controlClass}
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Próxima foto"
              className={controlClass}
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
