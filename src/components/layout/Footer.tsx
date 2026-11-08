import { person } from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center font-mono text-xs text-muted-foreground">
      © {new Date().getFullYear()} {person.name} · system status:{' '}
      <span className="text-terminal">operational</span>
    </footer>
  )
}
