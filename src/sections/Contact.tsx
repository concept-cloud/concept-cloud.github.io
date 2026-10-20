import { useEffect, useState } from 'react'
import { ButtonLink } from '../components/Button'
import { ArrowUpRightIcon, BookIcon, CheckIcon, CopyIcon, DownloadIcon, GitHubIcon, MailIcon } from '../components/Icons'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { links } from '../data/site'

// MARK: Copy email

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex size-10 items-center justify-center rounded-lg border border-line-strong text-fg-muted transition-colors hover:border-accent/50 hover:text-fg"
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
    >
      {copied ? <CheckIcon className="size-4 text-emerald-300" /> : <CopyIcon className="size-4" />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  )
}

// MARK: Channels

const channels = [
  { label: 'GitHub', detail: 'github.com/concept-cloud', href: links.github, Icon: GitHubIcon },
  { label: 'Development blog', detail: 'PushToMainDev', href: links.blog, Icon: BookIcon },
]

// MARK: Section

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s talk."
      intro="Open to conversations about systems administration, software development, and collaboration on web and mobile projects."
    >
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-ink-850 to-ink-900 p-6 sm:p-8">
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.18),transparent)]" />
          <p className="text-sm text-fg-subtle">Email</p>
          <a
            href={`mailto:${links.email}`}
            className="mt-2 block text-xl font-semibold tracking-tight break-all text-fg hover:text-accent-soft sm:text-2xl"
          >
            {links.email}
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={`mailto:${links.email}`} variant="primary">
              <MailIcon /> Send an email
            </ButtonLink>
            <ButtonLink href={links.resume} download>
              <DownloadIcon /> Download resume
            </ButtonLink>
            <CopyEmailButton />
          </div>
        </Reveal>

        <ul className="grid gap-5">
          {channels.map(({ label, detail, href, Icon }, index) => (
            <Reveal as="li" key={label} delay={index * 80}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-ink-900/60 p-5 transition-colors hover:border-accent/35"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-ink-800 text-fg">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-fg">{label}</span>
                  <span className="block truncate text-sm text-fg-subtle">{detail}</span>
                </span>
                <ArrowUpRightIcon className="text-fg-subtle transition-colors group-hover:text-accent-soft" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
