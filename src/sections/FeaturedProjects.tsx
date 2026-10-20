import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { featuredProjects } from '../data/projects'

// MARK: Featured projects

export function FeaturedProjects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured projects"
      title="Products I’m building."
      intro="Web and mobile applications in active development, from public beta to early builds."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={(index % 3) * 70}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
