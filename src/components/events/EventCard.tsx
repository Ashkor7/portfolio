import { CalendarDays, MapPin, Trophy, UserRound } from 'lucide-react'
import type { PortfolioEvent } from '@/data/types'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { EventLinks } from './EventLinks'

export function EventCard({ event }: { event: PortfolioEvent }) {
  const titleId = `event-${event.slug}-title`
  const preview = event.photos.filter((p) => p !== event.cover).slice(0, 3)

  return (
    <article
      aria-labelledby={titleId}
      className="group clip-hud bg-industrial/30 p-px transition-all focus-within:bg-industrial hover:bg-industrial/70"
    >
      <div className="clip-hud grid bg-surface [--ghost-bg:var(--surface)] lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col">
          <div className="relative overflow-hidden">
            <img
              src={event.cover.src}
              alt={event.cover.alt}
              width={event.cover.width}
              height={event.cover.height}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: event.cover.position }}
              className="aspect-[16/10] w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-3 left-3 bg-background/80 px-2 py-1 font-mono text-[10px] text-neon">
              {event.id}
            </span>
            {event.result && (
              <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-industrial px-2 py-1 font-mono text-[11px] font-bold tracking-widest text-primary-foreground uppercase">
                <Trophy className="size-3.5" aria-hidden="true" />
                {event.result}
              </span>
            )}
          </div>
          {preview.length > 0 && (
            <ul className="grid grid-cols-3 gap-px bg-border" aria-hidden="true">
              {preview.map((p) => (
                <li key={p.src}>
                  <img
                    src={p.thumb}
                    alt=""
                    width={p.width}
                    height={p.height}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: p.position }}
                    className="aspect-[4/3] w-full object-cover opacity-70"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col p-5 sm:p-6">
          <div className="flex flex-wrap gap-2">
            <Badge tone="industrial">{event.category}</Badge>
            {event.project && <Badge tone="cyber">{event.project.name}</Badge>}
          </div>
          <h3 id={titleId} className="mt-4 font-display text-xl font-bold uppercase sm:text-2xl">
            {event.name}
          </h3>
          <dl className="mt-4 grid gap-2 font-mono text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <dt>
                <CalendarDays className="size-4 text-neon" aria-hidden="true" />
                <span className="sr-only">Data</span>
              </dt>
              <dd>{event.date}</dd>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <dt>
                  <MapPin className="size-4 text-neon" aria-hidden="true" />
                  <span className="sr-only">Local</span>
                </dt>
                <dd>{event.location}</dd>
              </div>
            )}
            <div className="flex items-center gap-2">
              <dt>
                <UserRound className="size-4 text-neon" aria-hidden="true" />
                <span className="sr-only">Função</span>
              </dt>
              <dd>{event.role}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-muted-foreground">{event.summary}</p>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
            <ButtonLink
              to={`/events/${event.slug}`}
              aria-label={`Fotos e detalhes do ${event.name}`}
            >
              Fotos e detalhes
            </ButtonLink>
            <EventLinks event={event} />
          </div>
        </div>
      </div>
    </article>
  )
}
