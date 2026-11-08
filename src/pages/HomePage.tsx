import { site } from '@/config/site'
import { usePageMeta } from '@/hooks/usePageMeta'
import { HeroSection } from '@/sections/HeroSection'
import { ProfileSection } from '@/sections/ProfileSection'
import { ProjectsSection } from '@/sections/ProjectsSection'
import { StackSection } from '@/sections/StackSection'
import { LabSection } from '@/sections/LabSection'
import { JourneySection } from '@/sections/JourneySection'
import { ContactSection } from '@/sections/ContactSection'

export function HomePage() {
  usePageMeta({ title: site.title, description: site.description, path: '/' })
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <HeroSection />
      <ProfileSection />
      <ProjectsSection />
      <StackSection />
      <LabSection />
      <JourneySection />
      <ContactSection />
    </main>
  )
}
