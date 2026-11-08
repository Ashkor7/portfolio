import { Binary, Database, LayoutTemplate, Server, Wrench, CircuitBoard } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { HudCard } from '@/components/ui/HudCard'
import { Led } from '@/components/ui/Led'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { stackGroups } from '@/data/stack'
import type { Tone } from '@/data/types'
import { cn } from '@/utils/cn'

const groupIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  'Programming Languages': Binary,
  Frontend: LayoutTemplate,
  Backend: Server,
  Databases: Database,
  'Engineering & Automation': CircuitBoard,
  'Development Tools': Wrench,
}

const toneText: Record<Tone, string> = {
  neon: 'text-neon',
  cyber: 'text-cyber-soft',
  industrial: 'text-industrial',
  terminal: 'text-terminal',
}

const toneHover: Record<Tone, string> = {
  neon: 'hover:border-neon hover:text-neon',
  cyber: 'hover:border-cyber hover:text-cyber-soft',
  industrial: 'hover:border-industrial hover:text-industrial',
  terminal: 'hover:border-terminal hover:text-terminal',
}

export function StackSection() {
  const hasLearning = stackGroups.some((g) => g.items.some((i) => i.level === 'learning'))

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6"
    >
      <SectionHeader
        id="stack-title"
        code="04"
        title="Technology Stack"
        sub="Módulos ativos do sistema. Sem porcentagens — só o que é usado de verdade."
      />
      {hasLearning && (
        <div className="mb-6 flex flex-wrap gap-4 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span
              className="inline-block size-3 border border-border bg-background/60"
              aria-hidden="true"
            />
            Em uso em projetos
          </span>
          <span className="flex items-center gap-2">
            <span
              className="inline-block size-3 border border-dashed border-border"
              aria-hidden="true"
            />
            Em estudo
          </span>
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stackGroups.map((group) => {
          const Icon = groupIcons[group.title]
          return (
            <Reveal key={group.title} className="h-full">
              <HudCard tone={group.tone} interactive className="group h-full">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 font-mono text-xs tracking-widest text-foreground uppercase">
                    {Icon && (
                      <Icon className={cn('size-4', toneText[group.tone])} aria-hidden="true" />
                    )}
                    {group.title}
                  </h3>
                  <Led tone={group.tone} />
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className={cn(
                        'border border-border px-3 py-1.5 font-mono text-xs transition-colors',
                        toneHover[group.tone],
                        item.level === 'learning'
                          ? 'border-dashed text-muted-foreground'
                          : 'bg-background/60',
                      )}
                    >
                      {item.name}
                      {item.level === 'learning' && <span className="sr-only"> (em estudo)</span>}
                    </li>
                  ))}
                </ul>
              </HudCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
