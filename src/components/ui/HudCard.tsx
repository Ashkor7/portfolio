import type { ReactNode } from 'react'
import type { Tone } from '@/data/types'
import { cn } from '@/utils/cn'

const frame: Record<Tone, string> = {
  neon: 'bg-neon/40',
  cyber: 'bg-cyber/50',
  industrial: 'bg-industrial/50',
  terminal: 'bg-terminal/40',
}

const hoverGlow: Record<Tone, string> = {
  neon: 'hover:bg-neon/70 focus-within:bg-neon/70',
  cyber: 'hover:bg-cyber/80 focus-within:bg-cyber/80',
  industrial: 'hover:bg-industrial/80 focus-within:bg-industrial/80',
  terminal: 'hover:bg-terminal/70 focus-within:bg-terminal/70',
}

/** Cartão com moldura de 1px e cantos chanfrados (padrão visual do original). */
export function HudCard({
  children,
  tone = 'neon',
  interactive = false,
  className,
  innerClassName,
}: {
  children: ReactNode
  tone?: Tone
  /** Realça a moldura em hover/foco. */
  interactive?: boolean
  className?: string
  innerClassName?: string
}) {
  return (
    <div
      className={cn(
        'clip-hud p-px transition-colors duration-300',
        frame[tone],
        interactive && hoverGlow[tone],
        className,
      )}
    >
      <div className={cn('clip-hud h-full bg-surface/95 p-5 sm:p-6', innerClassName)}>
        {children}
      </div>
    </div>
  )
}
