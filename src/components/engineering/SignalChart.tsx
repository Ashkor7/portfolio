import { toPolyline, type Sample } from '@/features/lab/simulation'

const W = 300
const H = 80

/**
 * Gráfico leve (SVG puro) da resposta simulada:
 * - linha contínua: PWM aplicado ao motor (0–100%);
 * - linha em degrau: sinal digital do sensor (0/1).
 */
export function SignalChart({ history, sensorOn }: { history: Sample[]; sensorOn: boolean }) {
  const pwm = toPolyline(
    history.map((s) => s.pwm),
    { width: W, height: H, max: 100 },
  )
  // Sinal digital desenhado na faixa inferior do gráfico.
  const digital = toPolyline(
    history.map((s) => s.sensor * 22),
    { width: W, height: H, max: 100, padding: 4 },
  )
  const last = history[history.length - 1]

  return (
    <figure className="mt-2">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full border border-border bg-background/60"
        role="img"
        aria-label={`Gráfico da resposta simulada. PWM atual: ${Math.round(last?.pwm ?? 0)}%. Sensor: ${sensorOn ? 'ligado' : 'desligado'}.`}
      >
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1="0"
            x2={W}
            y1={H * f}
            y2={H * f}
            stroke="var(--neon)"
            strokeOpacity=".08"
          />
        ))}
        <polyline
          points={digital}
          fill="none"
          stroke="var(--terminal)"
          strokeOpacity=".7"
          strokeWidth="1.5"
          strokeLinejoin="bevel"
        />
        <polyline
          points={pwm}
          fill="none"
          stroke={sensorOn ? 'var(--industrial)' : 'var(--neon)'}
          strokeWidth="2"
          className="transition-[stroke] duration-500"
        />
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-4 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
        <span className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-4 bg-industrial" aria-hidden="true" /> PWM (%)
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-4 bg-terminal opacity-70" aria-hidden="true" />{' '}
          DIN_01 (sensor)
        </span>
      </figcaption>
    </figure>
  )
}
