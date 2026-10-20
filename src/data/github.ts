import type { GitHubConfig } from './types'

// MARK: GitHub repositories

export const github: GitHubConfig = {
  username: 'concept-cloud',
  profileUrl: 'https://github.com/concept-cloud',
  pinned: ['KinKitchen'],
  hidden: ['concept-cloud.github.io', 'gitdemoschool'],
  includeForks: false,
  includeArchived: false,
  maxRepos: 6,
  overrides: {
    KinKitchen: {
      description: 'iOS app for recipe sharing and gathering planning with dietary-aware recipe discovery.',
      projectSlug: 'kin-kitchen',
    },
  },
}
