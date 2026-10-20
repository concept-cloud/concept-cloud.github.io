import { Link } from 'react-router'
import { ButtonLink } from '../components/Button'
import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon, StarIcon } from '../components/Icons'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { github } from '../data/github'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import type { Repo, RepoError } from '../lib/github'

// MARK: Formatting

const languageColors: Record<string, string> = {
  Swift: '#f05138',
  Kotlin: '#a97bff',
  'C++': '#f34b7d',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  Python: '#3572a5',
  'Jupyter Notebook': '#da5b0b',
}

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' })

function errorMessage(error: RepoError) {
  if (error.kind === 'rate-limit') {
    const time = error.resetAt?.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    return `GitHub’s public API rate limit has been reached${time ? ` until about ${time}` : ''}.`
  }
  return 'Repositories couldn’t be loaded from GitHub right now.'
}

// MARK: Repo card

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-ink-900/60 p-5 transition-colors hover:border-accent/35">
      <h3 className="flex items-center gap-2 font-mono text-sm font-medium text-fg">
        <GitHubIcon className="shrink-0 text-fg-subtle" />
        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="truncate hover:text-accent-soft">
          {repo.name}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{repo.description ?? 'No description provided.'}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-fg-subtle">
        {repo.language ? (
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="size-2.5 rounded-full" style={{ backgroundColor: languageColors[repo.language] ?? '#8b949e' }} />
            {repo.language}
          </span>
        ) : null}
        {repo.stars > 0 ? (
          <span className="inline-flex items-center gap-1">
            <StarIcon aria-hidden="true" />
            <span className="sr-only">Stars:</span> {repo.stars}
          </span>
        ) : null}
        <span>Updated {dateFormatter.format(new Date(repo.pushedAt))}</span>
        {repo.projectSlug ? (
          <Link to={`/projects/${repo.projectSlug}/`} className="ml-auto inline-flex items-center gap-1 font-medium text-accent-soft hover:text-white">
            Project details <ArrowRightIcon />
          </Link>
        ) : null}
      </div>
    </article>
  )
}

// MARK: Skeleton

function RepoSkeleton() {
  return (
    <li aria-hidden="true" className="h-40 rounded-xl border border-line bg-ink-900/60 p-5">
      <div className="h-4 w-1/2 rounded bg-ink-700 motion-safe:animate-pulse" />
      <div className="mt-4 h-3 w-full rounded bg-ink-800 motion-safe:animate-pulse" />
      <div className="mt-2 h-3 w-4/5 rounded bg-ink-800 motion-safe:animate-pulse" />
    </li>
  )
}

// MARK: Section

export function GitHubRepos() {
  const state = useGitHubRepos(github)

  return (
    <Section
      id="github"
      eyebrow="GitHub"
      title="Public repositories."
      intro="Selected public work from GitHub, loaded live from the GitHub API."
    >
      <div aria-live="polite" aria-busy={state.status === 'loading'}>
        {state.status === 'loading' ? (
          <>
            <p className="sr-only">Loading repositories…</p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <RepoSkeleton key={index} />
              ))}
            </ul>
          </>
        ) : null}

        {state.status === 'error' ? (
          <div className="rounded-xl border border-line bg-ink-900/60 p-6">
            <p className="text-sm text-fg">{errorMessage(state.error)}</p>
            <p className="mt-1 text-sm text-fg-muted">You can still browse everything directly on GitHub.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href={github.profileUrl} external variant="primary">
                <GitHubIcon /> Open GitHub profile
              </ButtonLink>
              {state.error.kind !== 'rate-limit' ? (
                <button
                  type="button"
                  onClick={state.retry}
                  className="rounded-lg border border-line-strong px-4 py-2.5 text-sm font-medium text-fg hover:border-accent/50"
                >
                  Try again
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        {state.status === 'ready' && state.repos.length === 0 ? (
          <p className="text-sm text-fg-muted">No public repositories to show yet.</p>
        ) : null}

        {state.status === 'ready' && state.repos.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {state.repos.map((repo, index) => (
              <Reveal as="li" key={repo.id} delay={(index % 3) * 60}>
                <RepoCard repo={repo} />
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href={github.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-soft hover:text-white"
        >
          View all repositories on GitHub <ArrowUpRightIcon />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        {state.status === 'ready' && state.stale ? (
          <span className="text-xs text-fg-subtle">Showing cached results while GitHub is unavailable.</span>
        ) : null}
      </div>
    </Section>
  )
}
