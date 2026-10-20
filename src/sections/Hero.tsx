import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { ArrowRightIcon, DownloadIcon, GitHubIcon, MailIcon } from '../components/Icons'
import { education } from '../data/education'
import { links, site } from '../data/site'

// MARK: Snapshot

const degrees = education.filter((entry) => entry.institution === 'Full Sail University').map((entry) => entry.credential)

const snapshot: { label: string; value: string | string[] }[] = [
  { label: 'Service', value: 'USMC 0651 · 2009 – 2018' },
  { label: 'Windows', value: 'Windows Server · AD · Exchange' },
  { label: 'Cloud', value: 'Microsoft 365 · Google Workspace · Okta' },
  { label: 'Building', value: ['iOS · Apple Watch', 'Android · Wear OS', 'Web'] },
  { label: 'Stack', value: 'Swift · Kotlin · React · Supabase' },
  { label: 'Full Sail', value: degrees },
]

// MARK: Hero

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[32rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.18),transparent)]"
      />

      <Container className="grid gap-14 pt-20 pb-24 sm:pt-28 sm:pb-32 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-16">
        <div className="motion-safe:animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-900/80 px-3 py-1 font-mono text-xs text-fg-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            gregoryhudler.dev
          </p>
          <h1 id="hero-heading" className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.25rem] lg:leading-[1.05]">
            {site.name}
          </h1>
          <p className="mt-4 text-xl font-medium tracking-tight text-accent-soft sm:text-2xl">
            From running networks to building software.
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            Marine Corps data systems veteran and enterprise systems administrator, now building web and mobile
            applications for iOS, Android, and the web.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink to={{ pathname: '/', hash: '#projects' }} variant="primary">
              View projects
              <ArrowRightIcon className="transition-transform motion-safe:group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={links.github} external ariaLabel="GitHub profile (opens in a new tab)">
              <GitHubIcon /> GitHub
            </ButtonLink>
            <ButtonLink href={links.resume}>
              <DownloadIcon /> Resume
            </ButtonLink>
            <ButtonLink to={{ pathname: '/', hash: '#contact' }} variant="ghost">
              <MailIcon /> Contact
            </ButtonLink>
          </div>
        </div>

        <div className="motion-safe:animate-rise [animation-delay:120ms]">
          <div className="rounded-2xl border border-line bg-ink-900/80 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-ink-600" />
              <span className="size-2.5 rounded-full bg-ink-600" />
              <span className="size-2.5 rounded-full bg-ink-600" />
              <span className="ml-3 font-mono text-xs text-fg-subtle">~/profile</span>
            </div>
            <dl className="divide-y divide-line px-5 font-mono text-sm">
              {snapshot.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt className="shrink-0 text-xs tracking-wider whitespace-nowrap text-fg-subtle uppercase">{item.label}</dt>
                  <dd className="text-fg sm:text-right">
                    {Array.isArray(item.value)
                      ? item.value.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))
                      : item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  )
}
