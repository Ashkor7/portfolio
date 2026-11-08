import { ExternalLink, Lock } from 'lucide-react'
import type { Project } from '@/data/types'
import { Badge } from '@/components/ui/Badge'
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { cn } from '@/utils/cn'
import { ProjectImage } from './ProjectImage'

export function ProjectCard({ project }: { project: Project }) {
  const notStarted = project.status === 'Planned' || project.status === 'Concept'
  const titleId = `project-${project.slug}-title`

  return (
    <article
      aria-labelledby={titleId}
      className="group clip-hud h-full bg-neon/20 p-px transition-all focus-within:bg-neon hover:bg-neon/60"
    >
      <div className="clip-hud flex h-full flex-col bg-surface [--ghost-bg:var(--surface)]">
        <div className="relative overflow-hidden">
          <ProjectImage
            image={project.cover}
            className="aspect-[16/10]"
            imgClassName={cn(
              'aspect-[16/10] transition-transform duration-500 group-hover:scale-105',
              notStarted ? 'opacity-60 saturate-50' : 'opacity-80',
            )}
          />
          <span className="absolute top-3 left-3 bg-background/80 px-2 py-1 font-mono text-[10px] text-neon">
            {project.id}
          </span>
          <span className="absolute top-3 right-3 bg-background/80">
            <StatusBadge status={project.status} />
          </span>
          {project.cover.illustrative && (
            <span className="absolute bottom-3 left-3 bg-background/80 px-2 py-0.5 font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
              Concept art
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 id={titleId} className="font-display text-lg font-bold uppercase">
            {project.name}
          </h3>
          {project.statusNote && (
            <p className="mt-1 font-mono text-[11px] tracking-wider text-industrial uppercase">
              {project.statusNote}
            </p>
          )}
          <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologias">
            {project.tech.map((t) => (
              <li key={t}>
                <Badge tone="cyber">{t}</Badge>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
            <ButtonLink
              to={`/projects/${project.slug}`}
              aria-label={`Detalhes do projeto ${project.name}`}
            >
              Detalhes
            </ButtonLink>
            {project.github && (
              <ButtonAnchor
                variant="ghost"
                href={project.github}
                aria-label={`Repositório do ${project.name} no GitHub (abre em nova aba)`}
              >
                <GithubIcon className="size-4" />
                GitHub
              </ButtonAnchor>
            )}
            {project.demo && (
              <ButtonAnchor
                variant="ghost"
                href={project.demo}
                aria-label={`Demonstração do ${project.name} (abre em nova aba)`}
              >
                <ExternalLink className="size-4" aria-hidden="true" />
                Demo
              </ButtonAnchor>
            )}
            {!project.github && project.githubNote && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                <Lock className="size-3.5" aria-hidden="true" />
                {project.githubNote}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
