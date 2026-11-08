import { Fragment } from 'react'
import { CodeXml, Cpu } from 'lucide-react'
import { HudCard } from '@/components/ui/HudCard'
import { Led } from '@/components/ui/Led'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { profileModules } from '@/data/profile'
import { cn } from '@/utils/cn'

const moduleIcons = { software: CodeXml, automation: Cpu }

export function ProfileSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6"
    >
      <SectionHeader
        id="about-title"
        code="02"
        title="Operator Profile"
        sub="Duas graduações, um único sistema: software e engenharia trabalhando juntos."
      />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_80px_1fr]">
        {profileModules.map((mod, i) => {
          const Icon = moduleIcons[mod.icon]
          const toneText = mod.tone === 'neon' ? 'text-neon' : 'text-industrial'
          return (
            <Fragment key={mod.code}>
              {i === 1 && (
                <div className="-my-6 flex justify-center lg:hidden" aria-hidden="true">
                  <svg className="h-10 w-10" viewBox="0 0 40 40">
                    <path
                      d="M20 0V40"
                      stroke="var(--cyber)"
                      strokeWidth="2"
                      className="anim-dash"
                    />
                    <circle cx="20" cy="20" r="5" fill="var(--cyber)" className="anim-led" />
                  </svg>
                </div>
              )}
              <Reveal className={i === 1 ? 'lg:col-start-3' : undefined}>
                <HudCard tone={mod.tone} interactive className="group h-full">
                  <div className="flex items-center justify-between">
                    <span className={cn('font-mono text-xs tracking-widest', toneText)}>
                      {mod.code}
                    </span>
                    <Icon
                      aria-hidden="true"
                      className={cn(
                        'transition-transform duration-300 group-hover:scale-110',
                        toneText,
                      )}
                    />
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold uppercase">{mod.title}</h3>
                  <ul className="mt-5 space-y-2">
                    {mod.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <Led tone={mod.tone} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </HudCard>
              </Reveal>
            </Fragment>
          )
        })}

        {/* Barramento entre os módulos (desktop). No mobile, o conector fica entre os cards. */}
        <svg
          className="absolute top-1/2 left-1/2 hidden h-10 w-24 -translate-x-1/2 -translate-y-1/2 lg:block"
          viewBox="0 0 96 40"
          aria-hidden="true"
        >
          <path d="M0 20H96" stroke="var(--cyber)" strokeWidth="2" className="anim-dash" />
          <circle cx="48" cy="20" r="6" fill="var(--cyber)" className="anim-led" />
        </svg>
      </div>
    </section>
  )
}
