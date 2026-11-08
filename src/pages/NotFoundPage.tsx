import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { person } from '@/config/site'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useLocation } from 'react-router'

export function NotFoundContent({ code, message }: { code: string; message: string }) {
  return (
    <div className="clip-hud border border-border bg-surface/60 p-8 font-mono">
      <p className="text-xs tracking-widest text-destructive">ERROR 404 // {code}</p>
      <h1 className="mt-4 font-display text-3xl font-black uppercase sm:text-4xl">Signal Lost</h1>
      <p className="mt-3 text-sm text-muted-foreground">{message}</p>
      <ButtonLink to="/" className="mt-8">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Voltar ao início
      </ButtonLink>
    </div>
  )
}

export function NotFoundPage() {
  const { pathname } = useLocation()
  usePageMeta({
    title: `Página não encontrada | ${person.name}`,
    description: 'A página solicitada não existe.',
    path: pathname,
    noindex: true,
  })
  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto max-w-3xl px-4 pt-32 pb-24 outline-none sm:px-6"
    >
      <NotFoundContent
        code="ROUTE_NOT_FOUND"
        message={`O endereço ${pathname} não existe neste sistema.`}
      />
    </main>
  )
}
