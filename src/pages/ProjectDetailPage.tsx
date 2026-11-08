import type { ReactNode } from 'react'
import { useParams } from 'react-router'
import { FlaskConical } from 'lucide-react'
import { ProjectDetail } from '@/components/projects/ProjectDetail'
import { ButtonLink } from '@/components/ui/Button'
import { HudCard } from '@/components/ui/HudCard'
import { getProjectBySlug, projects } from '@/data/projects'
import { person } from '@/config/site'
import { usePageMeta } from '@/hooks/usePageMeta'
import { NotFoundContent } from './NotFoundPage'

/** Blocos específicos por projeto, encaixados no layout comum. */
const extras: Record<string, ReactNode> = {
  'engineering-lab': (
    <HudCard tone="industrial" className="mt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <FlaskConical className="size-5 shrink-0 text-industrial" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            Enquanto os projetos reais não são publicados, a página inicial tem uma demonstração
            interativa (ilustrativa) de sensor → MCU → controle → atuador.
          </p>
        </div>
        <ButtonLink to={{ pathname: '/', hash: 'lab' }} variant="ghost" className="shrink-0">
          Abrir laboratório
        </ButtonLink>
      </div>
    </HudCard>
  ),
}

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const index = project ? projects.indexOf(project) : -1

  usePageMeta(
    project
      ? {
          title: `${project.name} — Projeto | ${person.name}`,
          description: project.summary,
          path: `/projects/${project.slug}`,
          type: 'article',
          image: project.cover.src,
        }
      : {
          title: `Projeto não encontrado | ${person.name}`,
          description: 'Este projeto não existe no banco de dados.',
          path: `/projects/${slug ?? ''}`,
          noindex: true,
        },
  )

  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto max-w-5xl px-4 pt-28 pb-24 outline-none sm:px-6"
    >
      {project ? (
        <ProjectDetail
          project={project}
          prev={projects[index - 1]}
          next={projects[index + 1]}
          extra={extras[project.slug]}
        />
      ) : (
        <NotFoundContent
          code="RECORD_NOT_FOUND"
          message={`Nenhum projeto com o identificador “${slug}” no banco de dados.`}
        />
      )}
    </main>
  )
}
