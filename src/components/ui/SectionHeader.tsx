export function SectionHeader({
  code,
  title,
  sub,
  id,
}: {
  code: string
  title: string
  sub?: string
  /** id do título, usado em aria-labelledby da seção. */
  id?: string
}) {
  return (
    <div className="mb-10">
      <p className="font-mono text-xs tracking-[0.3em] text-neon" aria-hidden="true">
        // SECTION {code}
      </p>
      <h2
        id={id}
        className="mt-2 font-display text-3xl font-bold tracking-wide uppercase sm:text-4xl"
      >
        {title}
      </h2>
      {sub && <p className="mt-3 max-w-2xl text-muted-foreground">{sub}</p>}
    </div>
  )
}
