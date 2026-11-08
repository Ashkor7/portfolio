import type { ComponentType, SVGProps } from 'react'
import { Mail } from 'lucide-react'
import type { SocialLink } from '@/config/site'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/icons/BrandIcons'
import { cn } from '@/utils/cn'

const icons: Record<SocialLink['id'], ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  email: Mail,
}

/**
 * Lista de perfis sociais.
 * - icons: só ícones (Hero), com nome acessível.
 * - list: ícone + rótulo (Contato).
 */
export function SocialLinks({
  links,
  variant,
  className,
}: {
  links: SocialLink[]
  variant: 'icons' | 'list'
  className?: string
}) {
  if (links.length === 0) return null
  return (
    <ul className={cn(variant === 'icons' ? 'flex gap-4' : 'space-y-3', className)}>
      {links.map((link) => {
        const Icon = icons[link.id]
        const external = !link.href.startsWith('mailto:')
        return (
          <li key={link.id}>
            <a
              href={link.href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-label={variant === 'icons' ? `${link.label} (abre em nova aba)` : undefined}
              className={cn(
                'text-muted-foreground transition-colors hover:text-neon focus-visible:text-neon',
                variant === 'icons'
                  ? 'inline-flex p-2'
                  : 'flex min-h-11 items-center gap-3 font-mono text-sm',
              )}
            >
              <Icon className={cn(variant === 'list' && 'size-5 text-neon')} aria-hidden="true" />
              {variant === 'list' && (
                <>
                  {link.label}
                  {external && <span className="sr-only"> (abre em nova aba)</span>}
                </>
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
