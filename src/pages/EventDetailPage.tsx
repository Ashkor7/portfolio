import { Link, useParams } from 'react-router'
import { ArrowLeft, Check, ExternalLink, Trophy } from 'lucide-react'
import { EventLinks } from '@/components/events/EventLinks'
import { PhotoGallery } from '@/components/events/PhotoGallery'
import { Badge } from '@/components/ui/Badge'
import { HudCard } from '@/components/ui/HudCard'
import { getEventBySlug } from '@/data/events'
import { person } from '@/config/site'
import { usePageMeta } from '@/hooks/usePageMeta'
import { cn } from '@/utils/cn'
import { NotFoundContent } from './NotFoundPage'

export function EventDetailPage() {
  const { slug } = useParams()
  const event = getEventBySlug(slug)

  usePageMeta(
    event
      ? {
          title: `${event.name} — Evento | ${person.name}`,
          description: event.summary,
          path: `/events/${event.slug}`,
          type: 'article',
          image: event.cover.src,
        }
      : {
          title: `Evento não encontrado | ${person.name}`,
          description: 'Este evento não existe no registro.',
          path: `/events/${slug ?? ''}`,
          noindex: true,
        },
  )

  const project = event?.project
  // Numeração dos blocos (// 01, // 02…) segue só os blocos exibidos.
  let block = 0
  const num = () => String(++block).padStart(2, '0')

  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto max-w-5xl px-4 pt-28 pb-24 outline-none sm:px-6"
    >
      {event ? (
        <article aria-labelledby="event-title">
          <Link
            to={{ pathname: '/', hash: 'events' }}
            className="inline-flex min-h-11 items-center gap-2 font-mono text-xs text-muted-foreground uppercase hover:text-neon"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Field Events
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-neon">{event.id}</span>
            <Badge tone="industrial">{event.category}</Badge>
            {event.result && (
              <Badge tone="industrial">
                <Trophy className="size-3.5" aria-hidden="true" />
                {event.result}
              </Badge>
            )}
          </div>
          <h1
            id="event-title"
            className="mt-4 font-display text-3xl font-black break-words uppercase sm:text-5xl"
          >
            {event.name}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{event.summary}</p>

          <figure className="mt-8">
            <img
              src={event.cover.src}
              alt={event.cover.alt}
              width={event.cover.width}
              height={event.cover.height}
              style={{ objectPosition: event.cover.position }}
              className="clip-hud aspect-[16/9] w-full border border-border object-cover"
            />
          </figure>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <HudCard>
              <h2 className="font-mono text-xs tracking-widest text-neon">
                {num()} // SOBRE O EVENTO
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {event.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </HudCard>
            <HudCard tone="industrial">
              <h2 className="font-mono text-xs tracking-widest text-industrial">
                {num()} // REGISTRO
              </h2>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-mono text-xs">
                {(
                  [
                    ['Data', event.date],
                    ['Local', event.location],
                    ['Organização', event.organizer],
                    ['Função', event.role],
                    ['Resultado', event.result],
                  ] as const
                )
                  .filter(([, value]) => value)
                  .map(([label, value]) => (
                    <div key={label} className="contents">
                      <dt className="text-muted-foreground uppercase">{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
              </dl>
            </HudCard>
          </div>

          {project && (
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <HudCard tone="cyber">
                <h2 className="font-mono text-xs tracking-widest text-cyber-soft">
                  {num()} // PROJETO
                </h2>
                <p className="mt-3 font-display text-xl font-bold uppercase">{project.name}</p>
                <p className="mt-1 font-mono text-xs text-industrial">{project.tagline}</p>
                <p className="mt-3 text-sm text-muted-foreground">{project.description}</p>
                {project.problem && (
                  <>
                    <h3 className="mt-5 font-mono text-[11px] tracking-widest text-cyber-soft uppercase">
                      O problema
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{project.problem}</p>
                  </>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-xs tracking-widest text-neon uppercase underline-offset-4 hover:underline"
                  >
                    <ExternalLink className="size-4" aria-hidden="true" />
                    {new URL(project.url).hostname}
                    <span className="sr-only"> (site da {project.name}, abre em nova aba)</span>
                  </a>
                )}
              </HudCard>
              {project.features && (
                <HudCard>
                  <h2 className="font-mono text-xs tracking-widest text-neon">
                    {num()} // COMO FUNCIONA
                  </h2>
                  <ol className="mt-3 space-y-3 text-sm">
                    {project.features.map((f, i) => (
                      <li key={f} className="flex gap-3">
                        <span className="font-mono text-xs text-neon" aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ol>
                </HudCard>
              )}
            </div>
          )}

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {project?.mvp && (
              <HudCard tone="neon">
                <h2 className="font-mono text-xs tracking-widest text-neon">
                  {num()} // MVP E PARTE TÉCNICA
                </h2>
                {project.tech && (
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tecnologias do MVP">
                    {project.tech.map((t) => (
                      <li key={t}>
                        <Badge tone="cyber">{t}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-4 text-sm text-muted-foreground">{project.mvp}</p>
              </HudCard>
            )}
            <HudCard tone="terminal" className={cn(!project?.mvp && 'lg:col-span-2')}>
              <h2 className="font-mono text-xs tracking-widest text-terminal">
                {num()} // RESULTADOS
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {event.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-terminal" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </HudCard>
          </div>

          {event.learnings && (
            <HudCard tone="industrial" className="mt-5">
              <h2 className="font-mono text-xs tracking-widest text-industrial">
                {num()} // O QUE LEVO DESSE EVENTO
              </h2>
              <ul className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                {event.learnings.map((l) => (
                  <li key={l} className="flex gap-3">
                    <span className="font-mono text-industrial" aria-hidden="true">
                      &gt;
                    </span>
                    <span className="text-muted-foreground">{l}</span>
                  </li>
                ))}
              </ul>
            </HudCard>
          )}

          {event.links.length > 0 && (
            <section aria-labelledby="event-links-title" className="mt-10">
              <h2 id="event-links-title" className="font-mono text-xs tracking-widest text-neon">
                {num()} // PUBLICAÇÕES
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                O relato completo, com mais detalhes do que foi feito, está nos posts:
              </p>
              <div className="mt-4 flex flex-wrap gap-3 [--ghost-bg:var(--background)]">
                <EventLinks event={event} />
              </div>
            </section>
          )}

          <section aria-labelledby="event-gallery-title" className="mt-12">
            <h2 id="event-gallery-title" className="font-mono text-xs tracking-widest text-neon">
              {num()} // GALERIA — {event.photos.length} FOTOS
            </h2>
            <div className="mt-4">
              <PhotoGallery photos={event.photos} label={`Fotos do ${event.name}`} />
            </div>
          </section>
        </article>
      ) : (
        <NotFoundContent
          code="EVENT_NOT_FOUND"
          message={`Nenhum evento com o identificador “${slug}” no registro.`}
        />
      )}
    </main>
  )
}
