import { isRouteErrorResponse, useRouteError } from 'react-router'

/** Fallback para erros inesperados de renderização/rota. */
export function RouteError() {
  const error = useRouteError()
  const detail = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Erro desconhecido'

  return (
    <main className="mx-auto max-w-3xl px-4 pt-32 pb-24 font-mono sm:px-6">
      <p className="text-xs tracking-widest text-destructive">SYSTEM FAULT</p>
      <h1 className="mt-4 font-display text-3xl font-black uppercase">Falha no sistema</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Algo deu errado ao carregar esta página. Tente recarregar.
      </p>
      <pre className="mt-4 overflow-x-auto border border-border p-3 text-xs text-muted-foreground">
        {detail}
      </pre>
      <a
        href="/"
        className="mt-6 inline-block text-sm text-neon underline-offset-4 hover:underline"
      >
        Voltar ao início
      </a>
    </main>
  )
}
