import type { Project, ProjectStatus } from './types'

// MARK: Status labels

export const statusLabels: Record<ProjectStatus, string> = {
  live: 'Live',
  beta: 'Beta',
  'in-development': 'In development',
  planning: 'Planning',
  archived: 'Archived',
}

// MARK: Projects

export const projects: Project[] = [
  {
    slug: 'my-concept-cloud-web',
    title: 'My Concept Cloud Web',
    summary:
      'A web platform that helps storytellers capture creative ideas, organize concepts, and develop them into larger stories and projects.',
    description: [
      'My Concept Cloud is built around the way creative work actually happens: quick sparks first, deeper structure later. The web application is the full workspace for taking a captured idea through outlining, world-building, and writing.',
      'Ideas land in a shared Vault where they can be typed, tagged, given a mood, and kept in multiple variants. Projects are organized by format, such as film, TV series, novel, podcast, or stage play, and each format brings its own built-in hierarchy.',
    ],
    status: 'beta',
    platforms: ['Web'],
    technologies: ['Next.js', 'React', 'Supabase', 'PostgreSQL'],
    highlights: [
      'Concept Vault with types, moods, tags, variants, and privacy controls',
      'Project types with format-specific hierarchies such as Acts → Scenes or Seasons → Episodes → Scenes',
      'Story frameworks with beat-by-beat guidance that can be switched without losing work',
      'Four outline views of the same story: Structure, Board, Canvas, and Document',
      'Shared Worlds with a Story Bible for stories set in the same universe',
    ],
    screenshots: [],
    icon: '/projects/my-concept-cloud/icon.png',
    liveUrl: 'https://myconcept.cloud/',
    blogUrl: 'https://pushtomaindev.github.io/development-blog/products/my-concept-cloud/',
    featured: true,
    placeholders: [
      'Confirm the rest of the web stack (Next.js and React were detected from the live site build)',
      'Add screenshots to public/projects/my-concept-cloud/',
      'Add a GitHub URL if the repository becomes public',
    ],
  },
  {
    slug: 'my-concept-cloud-mobile',
    title: 'My Concept Cloud Mobile',
    summary:
      'Companion apps for iOS, watchOS, Android, and Wear OS for capturing story ideas the moment they happen and syncing them into the same My Concept Cloud vault.',
    description: [
      'The mobile side of My Concept Cloud focuses on instant capture. Concepts saved on a phone, tablet, or watch flow into the same vault the web application uses, so an idea captured in the moment is ready to develop later at a desk.',
      'The platform tracks where each idea came from, so writers can see how and where they capture their best material.',
      'Both platforms are offline-first. Ideas and projects are stored on the device with SwiftData on Apple platforms and Room on Android, then synced through Supabase. Every device and the website share the same Supabase tables, so data stays consistent everywhere.',
      'On Apple platforms, iPhone and iPad share a single SwiftUI app with a dedicated iPad layout, and a separate watchOS app shares models and logic through a ConceptCloudCore module. On Android, the project is split into :app, :core, and :wear modules, with the Wear OS app talking to the phone through Play Services Wearable.',
    ],
    status: 'in-development',
    platforms: ['iPhone', 'iPad', 'Apple Watch', 'Android', 'Wear OS'],
    technologies: [
      'Swift',
      'SwiftUI',
      'SwiftData',
      'App Intents',
      'Kotlin',
      'Jetpack Compose',
      'Material 3',
      'Room',
      'Wear Compose',
      'Supabase',
      'PostgreSQL',
    ],
    highlights: [
      'Fast capture for inspiration on iPhone and Android phones',
      'Room to organize concepts visually on iPad',
      'Quick capture from the wrist on Apple Watch and Wear OS',
      'Offline-first local storage with SwiftData and Room, synced through Supabase',
      'Shared core modules between phone and watch apps on both platforms',
      'Siri and Shortcuts support through App Intents',
      'Google Sign-In through Android Credential Manager',
      'Adaptive Compose layouts for Android phones and tablets',
      'One shared vault across every device and the website',
    ],
    screenshots: [],
    icon: '/projects/my-concept-cloud/icon.png',
    blogUrl: 'https://pushtomaindev.github.io/development-blog/products/my-concept-cloud/',
    featured: true,
    placeholders: [
      'Add screenshots to public/projects/my-concept-cloud-mobile/',
      'Add App Store and Google Play URLs when available',
    ],
  },
  {
    slug: 'kin-kitchen',
    title: 'Kin Kitchen',
    summary:
      'An iOS app for home cooks, families, and food communities to share recipes and plan gatherings while respecting everyone’s dietary needs.',
    description: [
      'Kin Kitchen makes sharing recipes and culinary experiences simple while respecting the dietary needs, preferences, and safety of everyone at the table. Recipes can be created and shared, gatherings planned, dishes claimed, and dietary information tracked.',
      'A dietary evaluation system checks recipes against restrictions and allergens using ingredient rules, exceptions, and whole-word matching. It never labels a recipe as safe. It reports a known conflict, owner-provided information, or that there is not enough information to verify.',
    ],
    status: 'in-development',
    platforms: ['iOS'],
    technologies: ['Swift', 'SwiftUI', 'Supabase'],
    highlights: [
      'Recipe discovery pipeline combining search, categories, dietary restrictions, and allergens',
      'Recipe attribution that preserves the original author through shares and variations',
      'Gathering planning with dish claiming and change-aware notifications',
      'Gathering History that archives what was brought, by whom, and from which recipe',
      'Supabase access rules that keep recipes from past gatherings available to attendees',
    ],
    screenshots: [],
    icon: '/projects/kin-kitchen/icon.png',
    blogUrl: 'https://pushtomaindev.github.io/development-blog/products/kin-kitchen/',
    featured: true,
    placeholders: ['Add screenshots to public/projects/kin-kitchen/', 'Add an App Store or TestFlight URL when available'],
  },
  {
    slug: 'minute-mark',
    title: 'Minute Mark',
    summary: 'Project summary to be added.',
    description: [],
    status: 'in-development',
    platforms: [],
    technologies: ['Swift', 'SwiftUI'],
    highlights: [],
    screenshots: [],
    icon: '/projects/minute-mark/icon.png',
    featured: true,
    placeholders: [
      'Add a project summary and description',
      'Confirm status and platforms',
      'Add screenshots, a GitHub URL, and a live URL if available',
    ],
  },
  {
    slug: 'jobsite-sync',
    title: 'Jobsite Sync',
    summary: 'Project summary to be added.',
    description: [],
    status: 'in-development',
    platforms: [],
    technologies: ['Java'],
    highlights: [],
    screenshots: [],
    icon: '/projects/jobsite-sync/icon.png',
    featured: true,
    placeholders: [
      'Add a project summary and description',
      'Confirm status and platforms',
      'Add screenshots, a GitHub URL, and a live URL if available',
    ],
  },
]

// MARK: Lookups

export const featuredProjects = projects.filter((project) => project.featured)

export function getProject(slug: string | undefined) {
  return projects.find((project) => project.slug === slug)
}
