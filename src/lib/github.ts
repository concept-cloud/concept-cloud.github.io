import type { GitHubConfig } from '../data/types'

// MARK: Types

interface ApiRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  pushed_at: string
  fork: boolean
  archived: boolean
  private: boolean
  visibility?: string
}

export interface Repo {
  id: number
  name: string
  url: string
  description: string | null
  language: string | null
  stars: number
  pushedAt: string
  projectSlug?: string
}

export type RepoErrorKind = 'rate-limit' | 'network' | 'http'

export class RepoError extends Error {
  readonly kind: RepoErrorKind
  readonly resetAt?: Date

  constructor(kind: RepoErrorKind, message: string, resetAt?: Date) {
    super(message)
    this.kind = kind
    this.resetAt = resetAt
  }
}

// MARK: Cache

const CACHE_TTL_MS = 15 * 60 * 1000

interface CacheEntry {
  savedAt: number
  repos: Repo[]
}

function cacheKey(config: GitHubConfig) {
  return `github-repos:v1:${config.username}`
}

export function readCache(config: GitHubConfig): CacheEntry | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(config))
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry
    return Array.isArray(entry.repos) ? entry : null
  } catch {
    return null
  }
}

function writeCache(config: GitHubConfig, repos: Repo[]) {
  try {
    sessionStorage.setItem(cacheKey(config), JSON.stringify({ savedAt: Date.now(), repos } satisfies CacheEntry))
  } catch {
    return
  }
}

export function isFresh(entry: CacheEntry | null): entry is CacheEntry {
  return entry !== null && Date.now() - entry.savedAt < CACHE_TTL_MS
}

// MARK: Selection

export function selectRepos(apiRepos: ApiRepo[], config: GitHubConfig): Repo[] {
  const hidden = new Set(config.hidden.map((name) => name.toLowerCase()))
  const pinnedOrder = config.pinned.map((name) => name.toLowerCase())

  return apiRepos
    .filter((repo) => !repo.private && (repo.visibility ?? 'public') === 'public')
    .filter((repo) => !hidden.has(repo.name.toLowerCase()))
    .filter((repo) => config.includeForks || !repo.fork)
    .filter((repo) => config.includeArchived || !repo.archived)
    .sort((a, b) => {
      const pa = pinnedOrder.indexOf(a.name.toLowerCase())
      const pb = pinnedOrder.indexOf(b.name.toLowerCase())
      if (pa !== -1 || pb !== -1) return (pa === -1 ? Infinity : pa) - (pb === -1 ? Infinity : pb)
      return Date.parse(b.pushed_at) - Date.parse(a.pushed_at)
    })
    .slice(0, config.maxRepos)
    .map((repo) => {
      const override = config.overrides[repo.name]
      return {
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
        description: override?.description ?? repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        pushedAt: repo.pushed_at,
        projectSlug: override?.projectSlug,
      }
    })
}

// MARK: Fetch

export async function fetchRepos(config: GitHubConfig, signal?: AbortSignal): Promise<Repo[]> {
  const url = `https://api.github.com/users/${encodeURIComponent(config.username)}/repos?type=owner&sort=pushed&per_page=100`
  let response: Response

  try {
    response = await fetch(url, { signal, headers: { Accept: 'application/vnd.github+json' } })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new RepoError('network', 'GitHub could not be reached.')
  }

  if (!response.ok) {
    const remaining = response.headers.get('x-ratelimit-remaining')
    const reset = response.headers.get('x-ratelimit-reset')
    if (response.status === 429 || (response.status === 403 && remaining === '0')) {
      throw new RepoError('rate-limit', 'GitHub API rate limit reached.', reset ? new Date(Number(reset) * 1000) : undefined)
    }
    throw new RepoError('http', `GitHub responded with status ${response.status}.`)
  }

  const data: unknown = await response.json()
  if (!Array.isArray(data)) throw new RepoError('http', 'Unexpected response from GitHub.')

  const repos = selectRepos(data as ApiRepo[], config)
  writeCache(config, repos)
  return repos
}
