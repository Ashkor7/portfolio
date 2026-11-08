import { useId, useRef, type KeyboardEvent } from 'react'
import { useSearchParams } from 'react-router'
import { SearchX } from 'lucide-react'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import {
  filterProjects,
  parseProjectFilter,
  projectFilters,
  projects,
  type ProjectFilter,
} from '@/data/projects'
import type { Project } from '@/data/types'
import { cn } from '@/utils/cn'

const filterLabel = (f: ProjectFilter) => (f === 'All' ? 'All Projects' : f)

const keyTargets: Record<string, (index: number, last: number) => number> = {
  ArrowRight: (i, last) => (i === last ? 0 : i + 1),
  ArrowLeft: (i, last) => (i === 0 ? last : i - 1),
  Home: () => 0,
  End: (_, last) => last,
}

export function ProjectsSection({ list = projects }: { list?: Project[] }) {
  const [params, setParams] = useSearchParams()
  const active = parseProjectFilter(params.get('filter'))
  const visible = filterProjects(list, active)
  const baseId = useId()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const panelId = `${baseId}-panel`

  // O filtro fica na URL (?filter=software) sem criar histórico nem rolar a página.
  const select = (filter: ProjectFilter) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (filter === 'All') next.delete('filter')
        else next.set('filter', filter.toLowerCase())
        return next
      },
      { replace: true, preventScrollReset: true },
    )
  }

  // Setas/Home/End movem entre as abas (padrão WAI-ARIA Tabs com ativação automática).
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const resolve = keyTargets[e.key]
    if (!resolve) return
    e.preventDefault()
    const target = resolve(index, projectFilters.length - 1)
    const filter = projectFilters[target]
    if (filter) select(filter)
    tabRefs.current[target]?.focus()
  }

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6"
    >
      <SectionHeader
        id="projects-title"
        code="03"
        title="Project Database"
        sub="Registros de projetos com status real de cada um."
      />
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filtrar projetos por categoria"
      >
        {projectFilters.map((f, i) => {
          const selected = active === f
          return (
            <button
              key={f}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              id={`${baseId}-tab-${f}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(f)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                'clip-btn min-h-10 border px-4 font-mono text-xs tracking-widest uppercase transition-colors',
                'focus-visible:shadow-[inset_0_0_0_2px_var(--foreground)] focus-visible:outline-none',
                selected
                  ? 'border-neon bg-neon text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-neon/50 hover:text-neon',
              )}
            >
              {filterLabel(f)}
            </button>
          )
        })}
      </div>

      <div id={panelId} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`}>
        <p className="sr-only" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}
        </p>
        {visible.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2">
            {visible.map((project) => (
              <li key={project.slug}>
                <Reveal className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <div className="clip-hud flex flex-col items-center gap-3 border border-dashed border-border px-6 py-16 text-center font-mono text-sm text-muted-foreground">
            <SearchX className="size-6 text-neon" aria-hidden="true" />
            <p>
              &gt; query returned 0 records.
              <br />
              Nenhum projeto na categoria {filterLabel(active)} ainda.
            </p>
            <button
              type="button"
              onClick={() => select('All')}
              className="mt-2 text-xs tracking-widest text-neon uppercase underline-offset-4 hover:underline"
            >
              Ver todos os projetos
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
