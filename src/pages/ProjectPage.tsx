import { Link, useParams } from 'react-router'
import { Badge, StatusBadge } from '../components/Badge'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, BookIcon, GitHubIcon } from '../components/Icons'
import { Placeholder } from '../components/Placeholder'
import { ProjectMark } from '../components/ProjectCard'
import { getProject, projects } from '../data/projects'
import type { Project } from '../data/types'
import { useDocumentMeta } from '../lib/meta'
import { NotFoundPage } from './NotFoundPage'

// MARK: Facts

function Facts({ project }: { project: Project }) {
  return (
    <dl className="grid gap-6 rounded-2xl border border-line bg-ink-900/60 p-6 text-sm">
      <div>
        <dt className="font-mono text-xs tracking-wider text-fg-subtle uppercase">Status</dt>
        <dd className="mt-2">
          <StatusBadge status={project.status} />
        </dd>
      </div>
      <div>
        <dt className="font-mono text-xs tracking-wider text-fg-subtle uppercase">Platforms</dt>
        <dd className="mt-2 text-fg">{project.platforms.length > 0 ? project.platforms.join(' · ') : <span className="text-fg-subtle">To be added</span>}</dd>
      </div>
      <div>
        <dt className="font-mono text-xs tracking-wider text-fg-subtle uppercase">Technologies</dt>
        <dd className="mt-2">
          {project.technologies.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-fg-subtle">To be confirmed</span>
          )}
        </dd>
      </div>
      <div>
        <dt className="font-mono text-xs tracking-wider text-fg-subtle uppercase">Source</dt>
        <dd className="mt-2 text-fg">
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent-soft hover:text-white">
              <GitHubIcon /> Public repository <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <span className="text-fg-muted">No public repository</span>
          )}
        </dd>
      </div>
    </dl>
  )
}

// MARK: Screenshots

function Screenshots({ project }: { project: Project }) {
  if (project.screenshots.length === 0) {
    return (
      <div className="grid aspect-[16/9] place-items-center rounded-2xl border border-dashed border-line-strong bg-ink-900/40 text-center">
        <div className="px-6">
          <p className="font-mono text-xs tracking-[0.2em] text-fg-subtle uppercase">Screenshots</p>
          <p className="mt-2 text-sm text-fg-muted">Screenshots coming soon.</p>
        </div>
      </div>
    )
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {project.screenshots.map((shot) => (
        <li key={shot.src}>
          <figure className="overflow-hidden rounded-2xl border border-line bg-ink-900">
            <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" className="w-full object-cover" />
            {shot.caption ? <figcaption className="border-t border-line px-4 py-3 text-xs text-fg-subtle">{shot.caption}</figcaption> : null}
          </figure>
        </li>
      ))}
    </ul>
  )
}

// MARK: Adjacent navigation

function Adjacent({ project }: { project: Project }) {
  const index = projects.findIndex((item) => item.slug === project.slug)
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  if (!previous || !next || projects.length < 2) return null

  const linkClass = 'group flex flex-col gap-1 rounded-xl border border-line bg-ink-900/60 p-5 transition-colors hover:border-accent/35'

  return (
    <nav aria-label="More projects" className="grid gap-4 sm:grid-cols-2">
      <Link to={`/projects/${previous.slug}/`} className={linkClass}>
        <span className="inline-flex items-center gap-1.5 text-xs text-fg-subtle">
          <ArrowLeftIcon /> Previous
        </span>
        <span className="font-medium text-fg group-hover:text-accent-soft">{previous.title}</span>
      </Link>
      <Link to={`/projects/${next.slug}/`} className={`${linkClass} sm:items-end sm:text-right`}>
        <span className="inline-flex items-center gap-1.5 text-xs text-fg-subtle">
          Next <ArrowRightIcon />
        </span>
        <span className="font-medium text-fg group-hover:text-accent-soft">{next.title}</span>
      </Link>
    </nav>
  )
}

// MARK: Detail

function ProjectDetail({ project }: { project: Project }) {
  useDocumentMeta({ title: project.title, description: project.summary, path: `/projects/${project.slug}/` })

  return (
    <article>
      <header className="relative isolate overflow-hidden border-b border-line">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
        <Container className="pt-12 pb-14 sm:pt-16 sm:pb-20">
          <Link
            to={{ pathname: '/', hash: '#projects' }}
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg"
          >
            <ArrowLeftIcon /> All projects
          </Link>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <ProjectMark project={project} size="lg" />
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">{project.title}</h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">{project.summary}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <ButtonLink href={project.liveUrl} external variant="primary">
                Visit live site <ArrowUpRightIcon />
              </ButtonLink>
            ) : null}
            {project.githubUrl ? (
              <ButtonLink href={project.githubUrl} external>
                <GitHubIcon /> View source
              </ButtonLink>
            ) : null}
            {project.blogUrl ? (
              <ButtonLink href={project.blogUrl} external>
                <BookIcon /> Development log
              </ButtonLink>
            ) : null}
          </div>
        </Container>
      </header>

      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div className="min-w-0 space-y-12">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="text-xl font-semibold tracking-tight text-fg">
              Overview
            </h2>
            {project.description.length > 0 ? (
              <div className="mt-4 space-y-4 text-base leading-relaxed text-fg-muted">
                {project.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-fg-subtle">A full project overview is coming soon.</p>
            )}
          </section>

          {project.highlights.length > 0 ? (
            <section aria-labelledby="highlights-heading">
              <h2 id="highlights-heading" className="text-xl font-semibold tracking-tight text-fg">
                Highlights
              </h2>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-base leading-relaxed text-fg-muted">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section aria-labelledby="screenshots-heading">
            <h2 id="screenshots-heading" className="text-xl font-semibold tracking-tight text-fg">
              Screenshots
            </h2>
            <div className="mt-4">
              <Screenshots project={project} />
            </div>
          </section>
        </div>

        <aside aria-label="Project facts" className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <Facts project={project} />
          <Placeholder items={project.placeholders} />
        </aside>
      </Container>

      <Container className="pb-20">
        <Adjacent project={project} />
      </Container>
    </article>
  )
}

// MARK: Route

export function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFoundPage />
  return <ProjectDetail key={project.slug} project={project} />
}
