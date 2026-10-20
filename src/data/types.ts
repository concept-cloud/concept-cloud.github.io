// MARK: Projects

export type ProjectStatus = 'live' | 'beta' | 'in-development' | 'planning' | 'archived'

export interface Screenshot {
  src: string
  alt: string
  caption?: string
}

export interface Project {
  slug: string
  title: string
  summary: string
  description: string[]
  status: ProjectStatus
  platforms: string[]
  technologies: string[]
  highlights: string[]
  screenshots: Screenshot[]
  icon?: string
  githubUrl?: string
  liveUrl?: string
  blogUrl?: string
  featured: boolean
  placeholders: string[]
}

// MARK: Experience

export interface Position {
  title: string
  period: string
  location?: string
  highlights: string[]
}

export interface ExperienceEntry {
  organization: string
  period: string
  location?: string
  summary?: string
  positions: Position[]
  decorations?: string[]
  brief?: boolean
  placeholders: string[]
}

// MARK: Education

export interface EducationEntry {
  institution: string
  credential: string
  concentration?: string
  honor?: string
  location?: string
  completed?: string
  placeholders?: string[]
}

export interface Award {
  title: string
  issuer: string
}

// MARK: GitHub

export interface RepoOverride {
  description?: string
  projectSlug?: string
}

export interface GitHubConfig {
  username: string
  profileUrl: string
  pinned: string[]
  hidden: string[]
  includeForks: boolean
  includeArchived: boolean
  maxRepos: number
  overrides: Record<string, RepoOverride>
}
