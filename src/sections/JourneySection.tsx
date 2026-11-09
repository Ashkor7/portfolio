import { useState, type ReactNode } from 'react'
import { Led } from '@/components/ui/Led'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { journey } from '@/data/journey'
import type { JourneyEvent } from '@/data/types'
import { cn } from '@/utils/cn'

type JourneyFilter = 'all' | JourneyEvent['status']

const statusLabel: Record<JourneyEvent['status'], string> = {
  done: 'REALIZADO',
  progress: 'EM ANDAMENTO',
  planned: 'PLANEJADO',
}

function dateLabel(event: JourneyEvent) {
  if (event.date) return event.date
  return event.status === 'planned' ? 'PRÓXIMO PASSO' : 'EM CURSO'
}

export function JourneySection({ events = journey }: { events?: JourneyEvent[] }) {
  const [filter, setFilter] = useState<JourneyFilter>('all')
  const visible = filter === 'all' ? events : events.filter((e) => e.status === filter)

  // A legenda do original vira filtro: clicar de novo no item ativo volta a mostrar tudo.
  const options: Array<{ value: JourneyFilter; label: string; marker: ReactNode }> = [
    { value: 'done', label: 'Realizado', marker: <Led /> },
    { value: 'progress', label: 'Em andamento', marker: <Led tone="neon" /> },
    {
      value: 'planned',
      label: 'Planejado',
      marker: <span className="size-2 rounded-full border border-industrial" aria-hidden="true" />,
    },
  ]

  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="mx-auto max-w-4xl scroll-mt-20 px-4 py-24 sm:px-6"
    >
      <SectionHeader
        id="journey-title"
        code="06"
        title="Academic Journey"
        sub="Linha do tempo com o que já aconteceu, o que está em andamento e o que está planejado."
      />
      <div
        className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs"
        role="group"
        aria-label="Filtrar linha do tempo"
      >
        {options.map((opt) => {
          const pressed = filter === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={pressed}
              onClick={() => setFilter(pressed ? 'all' : opt.value)}
              className={cn(
                'flex min-h-9 items-center gap-2 border px-3 transition-colors',
                pressed
                  ? 'border-neon/60 bg-neon/10 text-foreground'
                  : 'border-transparent hover:text-neon',
              )}
            >
              {opt.marker}
              {opt.label}
            </button>
          )
        })}
        {filter !== 'all' && (
          <button
            type="button"
            onClick={() => setFilter('all')}
            className="min-h-9 px-2 tracking-widest text-muted-foreground uppercase hover:text-neon"
          >
            Mostrar tudo
          </button>
        )}
      </div>

      <ol className="relative border-l border-neon/30 pl-8">
        {visible.map((event) => (
          <li key={event.title} className="relative mb-10 last:mb-0">
            <Reveal>
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-1.5 -left-[calc(2rem+7px)] size-3.5 rounded-full',
                  event.status === 'done' && 'glow-neon bg-terminal',
                  event.status === 'progress' && 'border-2 border-neon bg-neon/30',
                  event.status === 'planned' && 'border-2 border-industrial bg-background',
                )}
              />
              <p className="font-mono text-xs text-neon">
                {dateLabel(event)} · {statusLabel[event.status]}
                <span className="text-muted-foreground"> · {event.category.toUpperCase()}</span>
              </p>
              <h3
                className={cn(
                  'mt-1 font-display text-lg font-bold',
                  event.status === 'planned' && 'text-muted-foreground',
                )}
              >
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
