import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, ArrowRight, Check, CircleDashed, ExternalLink, Lock } from 'lucide-react'
import type { Project } from '@/data/types'
import { Badge } from '@/components/ui/Badge'
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button'
import { HudCard } from '@/components/ui/HudCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { statusMeta } from '@/data/status'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { ProjectImage } from './ProjectImage'

interface Neighbor {
  slug: string
  name: string
}

/**
 * Página de detalhes reutilizável. `extra` permite um bloco específico por
 * projeto sem duplicar o layout (ver pages/ProjectDetailPage.tsx).
 */
export function ProjectDetail({
  project,
  prev,
  next,
  extra,
}: {
  project: Project
  prev?: Neighbor
  next?: Neighbor
  extra?: ReactNode
}) {
  const blocks: Array<[string, string]> = [
    ['Problema', project.problem],
    ['Objetivo', project.goal],
    ['Arquitetura', project.architecture],
    ['Desafios', project.challenges],
  ]
  const done = project.features.filter((f) => f.state === 'done')
  const planned = project.features.filter((f) => f.state === 'planned')

  return (
    <article aria-labelledby="project-title">
      <Link
        to={{ pathname: '/', hash: 'projects' }}
        className="inline-flex min-h-11 items-center gap-2 font-mono text-xs text-muted-foreground uppercase hover:text-neon"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Project Database
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs text-neon">{project.id}</span>
        <StatusBadge status={project.status} />
        {project.categories.map((c) => (
          <Badge key={c} tone="cyber">
            {c}
          </Badge>
        ))}
      </div>
      <h1
        id="project-title"
        className="mt-4 font-display text-4xl font-black break-words uppercase sm:text-5xl"
      >
        {project.name}
      </h1>
      {project.altName && (
        <p className="mt-1 font-mono text-sm text-industrial">{project.altName}</p>
      )}
      <p className="mt-3 max-w-2xl text-muted-foreground">{project.summary}</p>

      <figure className="mt-8">
        <ProjectImage
          image={project.cover}
          eager
          className="clip-hud aspect-[16/9] border border-border"
          imgClassName="aspect-[16/9]"
        />
        {project.cover.illustrative && (
          <figcaption className="mt-2 font-mono text-[11px] text-muted-foreground">
            // Ilustração conceitual — não é uma captura de tela do projeto.
          </figcaption>
        )}
      </figure>

      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tecnologias principais">
        {project.tech.map((t) => (
          <li key={t}>
            <Badge>{t}</Badge>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-3xl leading-relaxed">{project.description}</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {blocks.map(([title, text], i) => (
          <HudCard key={title} tone={i % 2 ? 'cyber' : 'neon'}>
            <h2 className="font-mono text-xs tracking-widest text-neon">
              0{i + 1} // {title.toUpperCase()}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">{text}</p>
          </HudCard>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <HudCard tone="terminal">
          <h2 className="font-mono text-xs tracking-widest text-terminal">05 // FUNCIONALIDADES</h2>
          {done.length > 0 && (
            <ul className="mt-4 space-y-2 text-sm" aria-label="Implementadas">
              {done.map((f) => (
                <li key={f.label} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-terminal" aria-hidden="true" />
                  <span>
                    {f.label}
                    <span className="sr-only"> (implementado)</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
          {planned.length > 0 && (
            <>
              <p className="mt-5 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                Planejado / ainda não implementado
              </p>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground" aria-label="Planejadas">
                {planned.map((f) => (
                  <li key={f.label} className="flex gap-3">
                    <CircleDashed
                      className="mt-0.5 size-4 shrink-0 text-industrial"
                      aria-hidden="true"
                    />
                    <span>
                      {f.label}
                      <span className="sr-only"> (planejado)</span>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </HudCard>

        <HudCard tone="industrial">
          <h2 className="font-mono text-xs tracking-widest text-industrial">06 // STATUS ATUAL</h2>
          <p className="mt-3 text-sm">
            <span className="font-mono text-neon">{statusMeta[project.status].pt}</span>
            {project.statusNote && (
              <span className="text-muted-foreground"> · {project.statusNote}</span>
            )}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{project.currentState}</p>
          {project.techDetails && (
            <dl className="mt-5 space-y-3">
              {project.techDetails.map((g) => (
                <div key={g.group}>
                  <dt className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                    {g.group}
                  </dt>
                  <dd className="mt-1 text-sm">{g.items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          )}
        </HudCard>
      </div>

      {project.screenshots.length > 0 && (
        <section className="mt-10" aria-labelledby="shots-title">
          <h2 id="shots-title" className="font-mono text-xs tracking-widest text-neon">
            // CAPTURAS
          </h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {project.screenshots.map((shot) => (
              <ProjectImage
                key={shot.src}
                image={shot}
                className="clip-hud aspect-[16/10] border border-border"
                imgClassName="aspect-[16/10]"
              />
            ))}
          </div>
        </section>
      )}

      {extra}

      <div className="mt-10 flex flex-wrap items-center gap-3">
        {project.github ? (
          <ButtonAnchor href={project.github}>
            <GithubIcon className="size-4" />
            Ver no GitHub
            <span className="sr-only"> (abre em nova aba)</span>
          </ButtonAnchor>
        ) : (
          project.githubNote && (
            <p className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Lock className="size-4" aria-hidden="true" />
              {project.githubNote}
            </p>
          )
        )}
        {project.demo && (
          <ButtonAnchor href={project.demo} variant="ghost">
            <ExternalLink className="size-4" aria-hidden="true" />
            Ver demonstração
            <span className="sr-only"> (abre em nova aba)</span>
          </ButtonAnchor>
        )}
        <ButtonLink to={{ pathname: '/', hash: 'projects' }} variant="ghost">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Voltar aos projetos
        </ButtonLink>
      </div>

      {(prev || next) && (
        <nav
          aria-label="Outros projetos"
          className="mt-12 flex flex-wrap justify-between gap-4 border-t border-border pt-6 font-mono text-xs uppercase"
        >
          {prev ? (
            <Link
              to={`/projects/${prev.slug}`}
              className="inline-flex min-h-11 items-center gap-2 text-muted-foreground hover:text-neon"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span className="sr-only">Projeto anterior: </span>
              {prev.name}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to={`/projects/${next.slug}`}
              className="inline-flex min-h-11 items-center gap-2 text-muted-foreground hover:text-neon"
            >
              <span className="sr-only">Próximo projeto: </span>
              {next.name}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          )}
        </nav>
      )}
    </article>
  )
}
