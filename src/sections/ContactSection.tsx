import { ContactForm } from '@/components/ui/ContactForm'
import { HudCard } from '@/components/ui/HudCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { person, socialLinks, type SocialLink } from '@/config/site'

export function ContactSection() {
  const links: SocialLink[] = socialLinks.filter((l) => l.showInContact)
  if (person.email) {
    links.push({
      id: 'email',
      label: person.email,
      href: `mailto:${person.email}`,
      verified: true,
      showInHero: false,
      showInContact: true,
    })
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6"
    >
      <SectionHeader id="contact-title" code="07" title="Establish Connection" />
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-3xl leading-tight font-black uppercase sm:text-4xl">
            Let&apos;s Build Something <span className="text-glow text-neon">Extraordinary.</span>
          </h3>
          <p className="mt-4 text-muted-foreground">
            Aberto a estágios, projetos e conversas sobre software e automação.
          </p>
          <SocialLinks links={links} variant="list" className="mt-8" />
        </div>
        <HudCard>
          <p className="mb-4 font-mono text-xs text-terminal" aria-hidden="true">
            &gt; open_channel --secure
          </p>
          <ContactForm />
        </HudCard>
      </div>
    </section>
  )
}
