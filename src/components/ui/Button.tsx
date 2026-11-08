import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'ghost'

/*
 * O clip-path chanfrado corta bordas e outlines nos cantos. Por isso:
 * - o botão ghost é uma moldura (camada externa colorida + interna com fundo);
 * - o foco visível usa sombra interna / cor da moldura, que não somem no recorte.
 */
const base =
  'clip-btn group/btn relative inline-flex min-h-11 items-center justify-center font-mono text-sm tracking-wider uppercase transition-all outline-none disabled:pointer-events-none disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-neon text-primary-foreground gap-2 px-5 hover:brightness-110 focus-visible:shadow-[inset_0_0_0_2px_var(--foreground)]',
  ghost: 'bg-neon/50 p-px text-neon hover:bg-neon focus-visible:bg-foreground',
}

function Inner({ variant, children }: { variant: ButtonVariant; children: ReactNode }) {
  if (variant === 'primary') return <>{children}</>
  return (
    <span className="clip-btn btn-ghost-inner inline-flex min-h-[calc(2.75rem-2px)] w-full items-center justify-center gap-2 px-5">
      {children}
    </span>
  )
}

function buttonClasses(variant: ButtonVariant = 'primary', className?: string) {
  return cn(base, variants[variant], className)
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }

export function Button({
  variant = 'primary',
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, className)} {...props}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  )
}

/** Link interno (React Router) com aparência de botão — sem aninhar <button> em <a>. */
export function ButtonLink({
  variant = 'primary',
  className,
  children,
  ...props
}: LinkProps & { variant?: ButtonVariant }) {
  return (
    <Link className={buttonClasses(variant, className)} {...props}>
      <Inner variant={variant}>{children}</Inner>
    </Link>
  )
}

/** Link externo com aparência de botão; abre em nova aba com rel seguro. */
export function ButtonAnchor({
  variant = 'primary',
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: ButtonVariant }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses(variant, className)}
      {...props}
    >
      <Inner variant={variant}>{children}</Inner>
    </a>
  )
}
