import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { links, navigation, site } from '../data/site'
import { Container } from './Container'
import { CloseIcon, MenuIcon } from './Icons'

// MARK: Brand

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link to="/" onClick={onNavigate} className="flex items-center gap-3 rounded-md" aria-label={`${site.name}, home`}>
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-lg border border-accent/30 bg-gradient-to-br from-accent-strong/25 to-ink-800 font-mono text-sm font-semibold text-accent-soft"
      >
        GH
      </span>
      <span className="hidden text-sm font-semibold tracking-tight text-fg sm:block">{site.name}</span>
    </Link>
  )
}

// MARK: Header

export function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = () => desktop.matches && setOpen(false)
    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  const linkClass = 'rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg'

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink-950/75 backdrop-blur-xl supports-[backdrop-filter]:bg-ink-950/60">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Brand onNavigate={close} />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link to={{ pathname: '/', hash: `#${item.id}` }} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={links.resume}
            className="hidden rounded-lg border border-line-strong px-3 py-1.5 text-sm font-medium text-fg transition-colors hover:border-accent/50 sm:inline-flex"
          >
            Resume
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-line bg-ink-950/95 md:hidden"
      >
        <Container className="py-3">
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  to={{ pathname: '/', hash: `#${item.id}` }}
                  onClick={close}
                  className="block rounded-md px-2 py-3 text-base text-fg-muted hover:bg-ink-850 hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={links.resume}
                onClick={close}
                className="block rounded-md px-2 py-3 text-base text-fg-muted hover:bg-ink-850 hover:text-fg"
              >
                Resume (PDF)
              </a>
            </li>
          </ul>
        </Container>
      </nav>
    </header>
  )
}
