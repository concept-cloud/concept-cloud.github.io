// MARK: Identity

export const site = {
  name: 'Gregory Hudler',
  title: 'Systems Administrator & Software Developer',
  url: 'https://gregoryhudler.dev',
  description:
    'Gregory Hudler is a systems administrator, US Marine Corps veteran, and software developer building web and mobile applications on a foundation of enterprise IT experience.',
  locale: 'en_US',
  ogImage: '/og-image.png',
  themeColor: '#070b14',
} as const

// MARK: Links

export const links = {
  email: 'Gregory.Hudler@outlook.com',
  github: 'https://github.com/concept-cloud',
  blog: 'https://pushtomaindev.github.io/development-blog/',
  resume: '/resume/Gregory-Hudler-Resume.pdf',
} as const

// MARK: Navigation

export const navigation = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'GitHub', id: 'github' },
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
] as const
