import type { ReactNode } from 'react'
import { Link, type To } from 'react-router'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonLinkProps {
  children: ReactNode
  to?: To
  href?: string
  variant?: Variant
  download?: boolean
  external?: boolean
  className?: string
  ariaLabel?: string
}

// MARK: Styles

const base =
  'group inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-offset-2'

const variants: Record<Variant, string> = {
  primary: 'bg-accent-strong text-white shadow-[0_0_0_1px_rgb(147_192_251/0.2)_inset] hover:bg-accent',
  secondary: 'border border-line-strong bg-ink-850/70 text-fg hover:border-accent/50 hover:bg-ink-800',
  ghost: 'text-fg-muted hover:text-fg',
}

// MARK: ButtonLink

export function ButtonLink({
  children,
  to,
  href,
  variant = 'secondary',
  download,
  external,
  className = '',
  ariaLabel,
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (to !== undefined) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      download={download || undefined}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  )
}
