import { useRef } from 'react'
import { Fan, Info, RotateCcw } from 'lucide-react'
import { BlockDiagram } from '@/components/engineering/BlockDiagram'
import { SignalChart } from '@/components/engineering/SignalChart'
import { Badge } from '@/components/ui/Badge'
import { HudCard } from '@/components/ui/HudCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useSimulation } from '@/features/lab/useSimulation'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

const motorColor = {
  IDLE: 'text-muted-foreground',
  ACTIVE: 'text-industrial',
  STOPPING: 'text-cyber-soft',
}
const statusColor = {
  AGUARDANDO: 'text-terminal',
  OPERANDO: 'text-industrial',
  DESACELERANDO: 'text-cyber-soft',
}

export function LabSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, '100px')
  const { state, readout, toggle, reset } = useSimulation(inView)
  const on = state.sensor
  // Velocidade da hélice proporcional ao PWM (puramente visual).
  const spinSeconds = readout.pwm > 0 ? Math.max(0.25, 1.6 - readout.pwm / 70) : 0

  return (
    <section
      ref={ref}
      id="lab"
      aria-labelledby="lab-title"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6"
    >
      <SectionHeader
        id="lab-title"
        code="05"
        title="Engineering Lab"
        sub="Laboratório virtual para experimentos de faculdade, simulações e protótipos com microcontroladores."
      />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <HudCard tone="industrial">
          <p className="font-mono text-xs tracking-widest text-industrial">
            BLOCK DIAGRAM // MALHA ABERTA
          </p>
          <BlockDiagram readout={readout} />
          <p className="mt-6 font-mono text-xs text-muted-foreground">SINAL SIMULADO</p>
          <SignalChart history={state.history} sensorOn={on} />
        </HudCard>

        <HudCard tone="terminal">
          <Badge tone="industrial">DEMONSTRAÇÃO</Badge>
          <h3 className="mt-4 font-display text-lg font-bold uppercase">Controle de Atuador</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Ative o sensor de presença e veja o sistema responder. Esta é uma simulação ilustrativa,
            não um hardware real.
          </p>

          <button
            type="button"
            onClick={toggle}
            aria-pressed={on}
            className={cn(
              'clip-btn mt-6 flex min-h-12 w-full items-center justify-between border px-4 font-mono text-sm transition-all',
              'focus-visible:shadow-[inset_0_0_0_2px_var(--foreground)] focus-visible:outline-none',
              on
                ? 'border-terminal bg-terminal/10 text-terminal'
                : 'border-border text-muted-foreground hover:border-terminal/60 hover:text-terminal',
            )}
          >
            <span className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={cn(
                  'inline-block size-2.5 rounded-full transition-colors',
                  on ? 'glow-neon bg-terminal' : 'bg-muted-foreground/40',
                )}
              />
              SENSOR_01
            </span>
            <span>{on ? '[ ON ]' : '[ OFF ]'}</span>
          </button>

          <dl className="mt-4 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground">SINAL DIGITAL (DIN_01)</dt>
              <dd className={on ? 'text-terminal' : 'text-muted-foreground'}>
                {on ? '1 · HIGH' : '0 · LOW'}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground">ATUADOR / MOTOR</dt>
              <dd className={cn('flex items-center gap-2', motorColor[readout.motor])}>
                <Fan
                  aria-hidden="true"
                  className={cn('size-4', spinSeconds > 0 && 'anim-spin')}
                  style={spinSeconds ? { animationDuration: `${spinSeconds}s` } : undefined}
                />
                {readout.motor}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground">SAÍDA PWM</dt>
              <dd className="text-neon tabular-nums">{readout.pwm}%</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted-foreground">STATUS</dt>
              <dd className={statusColor[readout.status]}>{readout.status}</dd>
            </div>
          </dl>
          <div
            className="mt-3 h-1.5 border border-border bg-background/60"
            role="meter"
            aria-label="Saída PWM"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={readout.pwm}
          >
            <div className="h-full bg-neon" style={{ width: `${readout.pwm}%` }} />
          </div>
          {/* Anuncia só mudanças de estado, não cada valor intermediário do PWM. */}
          <p className="sr-only" aria-live="polite">
            Sensor {on ? 'ligado' : 'desligado'}. Motor {readout.motor}. Status {readout.status}.
          </p>

          <button
            type="button"
            onClick={reset}
            className="mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase hover:text-neon focus-visible:text-neon"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Reiniciar simulação
          </button>

          <p className="mt-3 flex gap-2 border-t border-border pt-3 text-[11px] leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0 text-industrial" aria-hidden="true" />
            Simulação ilustrativa: a resposta do PWM usa uma curva de primeira ordem apenas para
            visualização. Não representa um modelo físico validado nem hardware real.
          </p>
        </HudCard>
      </div>
    </section>
  )
}
