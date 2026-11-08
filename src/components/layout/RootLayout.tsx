import { Outlet } from 'react-router'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from './Footer'
import { ScrollManager } from './ScrollManager'

export function RootLayout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-neon px-4 py-2 font-mono text-sm text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Pular para o conteúdo
      </a>
      <ScrollManager />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
