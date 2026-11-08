import { Fragment } from 'react'
import type { Readout } from '@/features/lab/simulation'
import { cn } from '@/utils/cn'

type BlockKey = keyof Readout['activeBlocks']

const blocks: Array<{ key: BlockKey; label: string; on: string }> = [
  { key: 'sensor', label: 'SENSOR', on: 'border-terminal text-terminal' },
  { key: 'mcu', label: 'MCU', on: 'border-neon text-neon' },
  { key: 'control', label: 'CONTROLE', on: 'border-cyber text-cyber-soft' },
  { key: 'actuator', label: 'ATUADOR', on: 'border-industrial text-industrial' },
]

/** Conector entre blocos; anima quando há sinal fluindo. */
function Link({ live }: { live: boolean }) {
  return (
    <svg viewBox="0 0 24 12" className="h-3 w-6 shrink-0" aria-hidden="true">
      <path
        d="M0 6H20"
        stroke={live ? 'var(--neon)' : 'var(--muted-foreground)'}
        strokeOpacity={live ? 1 : 0.4}
        strokeWidth="2"
        className={live ? 'anim-dash' : undefined}
      />
      <path
        d="M17 2L22 6L17 10"
        fill="none"
        stroke={live ? 'var(--neon)' : 'var(--muted-foreground)'}
        strokeWidth="2"
      />
    </svg>
  )
}

/**
 * Diagrama de blocos SENSOR → MCU → CONTROLE → ATUADOR.
 * MCU e CONTROLE ficam sempre energizados (cores do original); SENSOR e
 * ATUADOR acendem conforme o estado da simulação.
 */
export function BlockDiagram({ readout }: { readout: Readout }) {
  const { activeBlocks } = readout
  // Sinal flui: sensor→MCU quando há detecção; MCU→controle e controle→atuador enquanto o motor gira.
  const linkLive = [activeBlocks.sensor, activeBlocks.control, activeBlocks.actuator]
  return (
    <ol
      className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-x-1 gap-y-3 sm:flex sm:gap-1"
      aria-label="Diagrama de blocos do sistema"
    >
      {blocks.map((b, i) => {
        const energized = b.key === 'mcu' || b.key === 'control' || activeBlocks[b.key]
        const live = activeBlocks[b.key]
        return (
          <Fragment key={b.key}>
            <li
              className={cn(
                'border-2 px-2 py-4 text-center font-mono text-xs transition-all duration-500 sm:flex-1',
                energized ? b.on : 'border-muted-foreground text-muted-foreground',
                live && 'shadow-[0_0_16px_-6px_currentColor]',
              )}
            >
              {b.label}
              <span className="sr-only">{live ? ' — ativo' : ' — inativo'}</span>
            </li>
            {i < blocks.length - 1 && (
              // No mobile (grade 2×2) a seta MCU → CONTROLE quebraria a linha; fica oculta.
              <li
                aria-hidden="true"
                className={cn('justify-center', i === 1 ? 'hidden sm:flex' : 'flex')}
              >
                <Link live={linkLive[i] ?? false} />
              </li>
            )}
          </Fragment>
        )
      })}
    </ol>
  )
}
