import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { EventCard } from '@/components/events/EventCard'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { events as allEvents, orderEvents, VISIBLE_EVENTS } from '@/data/events'
import type { PortfolioEvent } from '@/data/types'

export function EventsSection({ events = allEvents }: { events?: PortfolioEvent[] }) {
  const [expanded, setExpanded] = useState(false)
  const ordered = orderEvents(events)
  const hidden = ordered.length - VISIBLE_EVENTS
  const visible = expanded ? ordered : ordered.slice(0, VISIBLE_EVENTS)

  return (
    <section
      id="events"
      aria-labelledby="events-title"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6"
    >
      <SectionHeader
        id="events-title"
        code="07"
        title="Field Events"
        sub="Hackathons, competições e eventos de tecnologia de que participei."
      />
      <ul id="events-list" className="grid gap-6">
        {visible.map((event) => (
          <li key={event.slug}>
            <Reveal>
              <EventCard event={event} />
            </Reveal>
          </li>
        ))}
      </ul>
      {hidden > 0 && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="ghost"
            aria-expanded={expanded}
            aria-controls="events-list"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? (
              <>
                Show less
                <ChevronUp className="size-4" aria-hidden="true" />
              </>
            ) : (
              <>
                More events
                <span className="font-mono text-xs text-muted-foreground">+{hidden}</span>
                <ChevronDown className="size-4" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  )
}
