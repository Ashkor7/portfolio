import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Led } from '@/components/ui/Led'
import { BootTerminal } from '@/components/terminal/BootTerminal'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { bootLines } from '@/data/profile'
import { person, socialLinks } from '@/config/site'

const traces: Array<[string, string]> = [
  ['M0 80H120L150 110', 'neon'],
  ['M400 90H290L250 130', 'cyber'],
  ['M0 320H110L150 280', 'industrial'],
  ['M400 300H300L250 260', 'terminal'],
  ['M200 0V120', 'neon'],
  ['M200 400V280', 'industrial'],
]

/** Microcontrolador com trilhas de circuito animadas (decorativo). */
function CircuitCore() {
  return (
    <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-md" aria-hidden="true">
      <defs>
        <radialGradient id="core-glow">
          <stop offset="0" stopColor="var(--neon)" stopOpacity=".9" />
          <stop offset="1" stopColor="var(--cyber)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {traces.map(([d, tone], i) => (
        <g key={i}>
          <path d={d} fill="none" stroke={`var(--${tone})`} strokeOpacity=".25" strokeWidth="2" />
          <path d={d} fill="none" stroke={`var(--${tone})`} strokeWidth="2" className="anim-dash" />
        </g>
      ))}
      <circle cx="200" cy="200" r="110" fill="url(#core-glow)" opacity=".35" />
      <g className="anim-spin" style={{ transformOrigin: '200px 200px' }}>
        <circle cx="200" cy="200" r="90" fill="none" stroke="var(--neon)" strokeDasharray="4 10" />
        <circle
          cx="200"
          cy="200"
          r="70"
          fill="none"
          stroke="var(--cyber)"
          strokeDasharray="30 12"
          strokeWidth="2"
        />
      </g>
      <rect
        x="160"
        y="160"
        width="80"
        height="80"
        fill="var(--surface)"
        stroke="var(--neon)"
        strokeWidth="2"
      />
      {[170, 185, 200, 215, 230].map((p) => (
        <g key={p} stroke="var(--neon)">
          <line x1={p} y1="150" x2={p} y2="160" />
          <line x1={p} y1="240" x2={p} y2="250" />
          <line x1="150" y1={p} x2="160" y2={p} />
          <line x1="240" y1={p} x2="250" y2={p} />
        </g>
      ))}
      <text
        x="200"
        y="206"
        textAnchor="middle"
        fill="var(--neon)"
        fontFamily="JetBrains Mono, monospace"
        fontSize="14"
      >
        MCU
      </text>
    </svg>
  )
}

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative mx-auto grid min-h-svh max-w-7xl items-center gap-12 px-4 pt-24 pb-16 sm:px-6 lg:grid-cols-2"
    >
      <div className="anim-boot">
        <div className="flex flex-wrap gap-2">
          <Badge tone="terminal">
            <Led />
            SYSTEM ONLINE
          </Badge>
          <Badge tone="cyber">
            <Led tone="cyber" />
            DEVELOPER MODE ACTIVE
          </Badge>
        </div>
        <p className="mt-8 font-mono text-sm text-muted-foreground">
          operator_id: <span className="text-neon">{person.name}</span>
        </p>
        <h1
          id="hero-title"
          className="mt-3 font-display text-4xl leading-tight font-black uppercase sm:text-6xl"
        >
          Building <span className="text-glow text-neon">Intelligent</span> Systems.
        </h1>
        <p className="mt-4 font-mono text-sm text-industrial sm:text-base">{person.role}</p>
        <p className="mt-6 max-w-xl text-muted-foreground">{person.bio}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to={{ pathname: '/', hash: 'projects' }}>
            Explore Projects <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink to={{ pathname: '/', hash: 'contact' }} variant="ghost">
            Contact Me
          </ButtonLink>
        </div>
        <SocialLinks
          links={socialLinks.filter((l) => l.showInHero)}
          variant="icons"
          className="mt-8 -ml-2"
        />
      </div>

      <div className="relative">
        <CircuitCore />
        <div className="relative -mt-16 ml-auto max-w-sm sm:-mt-24">
          <BootTerminal lines={bootLines} title="~/portfolio — boot" />
        </div>
      </div>
    </section>
  )
}
