import { useEffect, useState } from 'react'
import type { GitHubConfig } from '../data/types'
import { fetchRepos, isFresh, readCache, RepoError, type Repo } from '../lib/github'

type State =
  | { status: 'loading'; repos: Repo[] }
  | { status: 'ready'; repos: Repo[]; stale?: boolean }
  | { status: 'error'; repos: Repo[]; error: RepoError }

// MARK: Initial state

function initialState(config: GitHubConfig): State {
  const cached = readCache(config)
  if (isFresh(cached)) return { status: 'ready', repos: cached.repos }
  return { status: 'loading', repos: [] }
}

// MARK: Hook

export function useGitHubRepos(config: GitHubConfig) {
  const [state, setState] = useState<State>(() => initialState(config))
  const needsFetch = state.status === 'loading'

  useEffect(() => {
    if (!needsFetch) return
    const controller = new AbortController()

    fetchRepos(config, controller.signal)
      .then((repos) => setState({ status: 'ready', repos }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        const repoError = error instanceof RepoError ? error : new RepoError('network', 'GitHub could not be reached.')
        const cached = readCache(config)
        if (cached && cached.repos.length > 0) {
          setState({ status: 'ready', repos: cached.repos, stale: true })
        } else {
          setState({ status: 'error', repos: [], error: repoError })
        }
      })

    return () => controller.abort()
  }, [config, needsFetch])

  const retry = () => setState({ status: 'loading', repos: [] })

  return { ...state, retry }
}
