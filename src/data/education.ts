import type { Award, EducationEntry } from './types'

// MARK: Degrees

export const education: EducationEntry[] = [
  {
    institution: 'Full Sail University',
    credential: 'B.S. Computer Science',
    concentration: 'Mobile Development',
    completed: 'March 26, 2026',
  },
  {
    institution: 'Full Sail University',
    credential: 'A.S. Computer Science',
    honor: 'Valedictorian',
    completed: 'October 3, 2025',
  },
  {
    institution: 'Full Sail University',
    credential: 'B.S. Digital Cinematography',
    honor: 'Salutatorian',
    completed: 'March 31, 2023',
  },
  {
    institution: 'Marine Corps Communications-Electronics School',
    credential: 'Data Systems Technician – Network Specialist',
    location: 'Twentynine Palms, CA',
    completed: 'April 22, 2010',
  },
]

// MARK: Awards

export const awards: Award[] = [
  { title: 'Course Director’s Award — Producing', issuer: 'Full Sail University' },
  { title: 'Course Director’s Award — Creative Presentation', issuer: 'Full Sail University' },
]
