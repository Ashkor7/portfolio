import { EventCard } from '@/components/events/EventCard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { events as allEvents } from '@/data/events'
import type { PortfolioEvent } from '@/data/types'

export function EventsSection({ events = allEvents }: { events?: PortfolioEvent[] }) {
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
      <ul className="grid gap-6">
        {events.map((event) => (
          <li key={event.slug}>
            <Reveal>
              <EventCard event={event} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
