import { ExternalLink } from 'lucide-react'
import type { PortfolioEvent } from '@/data/types'
import { ButtonAnchor } from '@/components/ui/Button'
import { InstagramIcon, LinkedinIcon } from '@/components/icons/BrandIcons'

const icons = {
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  site: ExternalLink,
}

/** Botões para as publicações sobre o evento. */
export function EventLinks({ event }: { event: PortfolioEvent }) {
  return (
    <>
      {event.links.map((link) => {
        const Icon = icons[link.kind]
        return (
          <ButtonAnchor
            key={link.href}
            variant="ghost"
            href={link.href}
            aria-label={`${link.label} sobre o ${event.name} (abre em nova aba)`}
          >
            <Icon className="size-4" aria-hidden="true" />
            {link.label}
          </ButtonAnchor>
        )
      })}
    </>
  )
}
