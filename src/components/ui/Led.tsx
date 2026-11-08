import type { Tone } from '@/data/types'
import { cn } from '@/utils/cn'

const toneBg: Record<Tone, string> = {
  neon: 'bg-neon',
  terminal: 'bg-terminal',
  industrial: 'bg-industrial',
  cyber: 'bg-cyber',
}

/** Indicador luminoso pulsante (decorativo). */
export function Led({ tone = 'terminal', className }: { tone?: Tone; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('anim-led inline-block size-2 shrink-0 rounded-full', toneBg[tone], className)}
    />
  )
}
