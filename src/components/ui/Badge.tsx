import type { ReactNode } from 'react'
import type { Tone } from '@/data/types'
import { cn } from '@/utils/cn'

const toneClass: Record<Tone, string> = {
  neon: 'text-neon border-neon/40',
  cyber: 'text-cyber-soft border-cyber/50',
  industrial: 'text-industrial border-industrial/50',
  terminal: 'text-terminal border-terminal/40',
}

export function Badge({
  children,
  tone = 'neon',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 border px-2 py-0.5 font-mono text-[11px] tracking-widest uppercase',
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
