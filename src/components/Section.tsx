import type { ReactNode } from 'react'
import { Container } from './Container'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  intro?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, intro, children, className = '' }: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} tabIndex={-1} className={`py-20 outline-none sm:py-28 ${className}`}>
      <Container>
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
          <h2 id={headingId} className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            {title}
          </h2>
          {intro ? <div className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">{intro}</div> : null}
        </Reveal>
        <div className="mt-12">{children}</div>
      </Container>
    </section>
  )
}
