import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import type { ProjectImage as ProjectImageData } from '@/data/types'
import { cn } from '@/utils/cn'

/** Imagem com placeholder durante o carregamento e fallback em caso de erro. */
export function ProjectImage({
  image,
  className,
  imgClassName,
  eager = false,
}: {
  image: ProjectImageData
  className?: string
  imgClassName?: string
  eager?: boolean
}) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading')

  return (
    <div className={cn('relative overflow-hidden bg-background/60', className)}>
      {state !== 'loaded' && (
        <div
          role={state === 'error' ? 'img' : undefined}
          aria-label={state === 'error' ? `${image.alt} (imagem indisponível)` : undefined}
          aria-hidden={state === 'loading' ? true : undefined}
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase',
            state === 'loading' && 'animate-pulse',
          )}
        >
          {state === 'error' ? (
            <>
              <ImageOff className="size-5" aria-hidden="true" />
              <span>Imagem indisponível</span>
            </>
          ) : (
            <span>Loading_asset…</span>
          )}
        </div>
      )}
      {state !== 'error' && (
        <img
          src={image.src}
          alt={image.alt}
          width={1024}
          height={640}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
          ref={(img) => {
            // Imagem já em cache: o load pode ter ocorrido antes do React anexar o handler.
            if (img?.complete && img.naturalWidth > 0)
              setState((s) => (s === 'loading' ? 'loaded' : s))
          }}
          className={cn(
            'w-full object-cover transition-opacity duration-500',
            state === 'loaded' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}
    </div>
  )
}
