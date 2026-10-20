import type { GitHubConfig } from './types'

// MARK: GitHub repositories

export const github: GitHubConfig = {
  username: 'concept-cloud',
  profileUrl: 'https://github.com/concept-cloud',
  pinned: [],
  hidden: ['concept-cloud.github.io', 'gitdemoschool'],
  includeForks: false,
  includeArchived: false,
  maxRepos: 6,
  overrides: {},
}
