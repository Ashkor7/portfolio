export function RouteLoading() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[60vh] max-w-5xl items-center px-4 pt-28 pb-24 sm:px-6"
      aria-busy="true"
    >
      <p role="status" className="font-mono text-sm text-terminal">
        &gt; loading module<span className="anim-blink">▌</span>
      </p>
    </main>
  )
}
