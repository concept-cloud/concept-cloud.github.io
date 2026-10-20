import { links, site } from '../data/site'
import { Container } from './Container'
import { BookIcon, GitHubIcon, MailIcon } from './Icons'

// MARK: Footer

export function Footer() {
  const year = new Date().getFullYear()
  const iconLink = 'inline-flex size-9 items-center justify-center rounded-lg text-fg-subtle transition-colors hover:bg-ink-850 hover:text-fg'

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-fg-subtle sm:flex-row">
        <p>
          © {year} {site.name}
        </p>
        <ul className="flex items-center gap-1">
          <li>
            <a href={`mailto:${links.email}`} className={iconLink} aria-label="Email">
              <MailIcon className="size-[18px]" />
            </a>
          </li>
          <li>
            <a href={links.github} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="GitHub (opens in a new tab)">
              <GitHubIcon className="size-[18px]" />
            </a>
          </li>
          <li>
            <a href={links.blog} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="Development blog (opens in a new tab)">
              <BookIcon className="size-[18px]" />
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  )
}
