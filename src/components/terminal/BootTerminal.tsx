import { useEffect, useState } from 'react'
import { Led } from '@/components/ui/Led'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const SESSION_KEY = 'lr-sys:boot-played'
const CHAR_DELAY_MS = 35

function alreadyPlayed(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function markPlayed() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    /* armazenamento indisponível: a animação apenas toca de novo */
  }
}

/**
 * Terminal de inicialização. A digitação dura ~3 s, pode ser pulada, não toca
 * com prefers-reduced-motion e só toca uma vez por sessão.
 * Leitores de tela recebem o texto completo de uma vez.
 */
export function BootTerminal({ lines, title = 'terminal' }: { lines: string[]; title?: string }) {
  const reduced = useReducedMotion()
  const [skipped, setSkip] = useState(alreadyPlayed)
  const skip = skipped || reduced
  const [done, setDone] = useState<string[]>([])
  const [current, setCurrent] = useState('')

  const finished = skip || done.length >= lines.length

  useEffect(() => {
    if (skip) return
    let line = 0
    let char = 0
    const typed: string[] = []
    const timer = window.setInterval(() => {
      const text = lines[line]
      if (text === undefined) {
        window.clearInterval(timer)
        markPlayed()
        return
      }
      char++
      setCurrent(text.slice(0, char))
      if (char >= text.length) {
        typed.push(text)
        setDone([...typed])
        setCurrent('')
        line++
        char = 0
      }
    }, CHAR_DELAY_MS)
    return () => window.clearInterval(timer)
  }, [lines, skip])

  const shown = skip ? lines : done

  return (
    <div className="clip-hud border border-terminal/30 bg-background/90 font-mono text-sm">
      <div className="flex items-center gap-2 border-b border-terminal/20 px-4 py-2 text-xs text-muted-foreground">
        <Led tone="industrial" />
        <Led tone="neon" />
        <Led />
        <span className="ml-2 truncate">{title}</span>
        {!finished && (
          <button
            type="button"
            onClick={() => {
              setSkip(true)
              markPlayed()
            }}
            className="mr-3 ml-auto shrink-0 px-1 tracking-widest uppercase hover:text-neon focus-visible:text-neon"
          >
            skip
            <span className="sr-only"> animação de inicialização</span>
          </button>
        )}
      </div>
      <p className="sr-only">{lines.join(' ')}</p>
      <div className="space-y-1 p-4 break-words text-terminal" aria-hidden="true">
        {shown.map((line, i) => (
          <p key={i}>&gt; {line}</p>
        ))}
        <p>
          &gt; {finished ? '' : current}
          <span className="anim-blink">▌</span>
        </p>
      </div>
    </div>
  )
}
