import { Link } from 'react-router'
import type { Project } from '../data/types'
import { Badge, StatusBadge } from './Badge'
import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon } from './Icons'

// MARK: Project monogram

export function ProjectMark({ project, size = 'md' }: { project: Project; size?: 'md' | 'lg' }) {
  const dimensions = size === 'lg' ? 'size-16 text-xl' : 'size-11 text-sm'

  if (project.icon) {
    return (
      <img
        src={project.icon}
        alt=""
        width={size === 'lg' ? 64 : 44}
        height={size === 'lg' ? 64 : 44}
        className={`${dimensions} rounded-[22%] object-contain`}
        loading="lazy"
        decoding="async"
      />
    )
  }

  const initials = project.title
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)

  return (
    <span
      aria-hidden="true"
      className={`${dimensions} grid place-items-center rounded-xl border border-line bg-gradient-to-br from-ink-700 to-ink-800 font-mono font-semibold text-accent-soft`}
    >
      {initials}
    </span>
  )
}

// MARK: ProjectCard

const CARD_TECH_LIMIT = 5

export function ProjectCard({ project }: { project: Project }) {
  const detailPath = `/projects/${project.slug}/`
  const pending = project.placeholders.length > 0

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-ink-900/70 p-6 transition-[border-color,background-color,transform] duration-300 hover:border-accent/35 hover:bg-ink-850 motion-safe:hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <ProjectMark project={project} />
        <StatusBadge status={project.status} />
      </div>

      <h3 className="mt-5 text-lg font-semibold tracking-tight text-fg">
        <Link to={detailPath} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{project.summary}</p>

      {project.platforms.length > 0 ? (
        <p className="mt-4 text-xs text-fg-subtle">{project.platforms.join(' · ')}</p>
      ) : null}

      {project.technologies.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.slice(0, CARD_TECH_LIMIT).map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
          {project.technologies.length > CARD_TECH_LIMIT ? (
            <li>
              <Badge>+{project.technologies.length - CARD_TECH_LIMIT} more</Badge>
            </li>
          ) : null}
        </ul>
      ) : null}

      <div className="relative z-10 mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-sm">
        <Link
          to={detailPath}
          className="inline-flex items-center gap-1.5 font-medium text-accent-soft hover:text-white"
          aria-label={`View ${project.title} details`}
        >
          Details
          <ArrowRightIcon className="transition-transform motion-safe:group-hover:translate-x-0.5" />
        </Link>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-fg-muted hover:text-fg"
            aria-label={`Visit ${project.title} (opens in a new tab)`}
          >
            Visit <ArrowUpRightIcon />
          </a>
        ) : null}
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg"
            aria-label={`${project.title} source on GitHub (opens in a new tab)`}
          >
            <GitHubIcon /> Source
          </a>
        ) : null}
        {pending ? (
          <span className="ml-auto font-mono text-[0.68rem] tracking-wider text-amber-200/70 uppercase">
            Details pending
          </span>
        ) : null}
      </div>
    </article>
  )
}
