import { useDocumentMeta } from '../lib/meta'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Education } from '../sections/Education'
import { Experience } from '../sections/Experience'
import { FeaturedProjects } from '../sections/FeaturedProjects'
import { GitHubRepos } from '../sections/GitHubRepos'
import { Hero } from '../sections/Hero'

// MARK: Home

export function HomePage() {
  useDocumentMeta({ path: '/' })

  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects />
      <GitHubRepos />
      <Experience />
      <Education />
      <Contact />
    </>
  )
}
