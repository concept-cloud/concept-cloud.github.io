import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { links } from '../data/site'

// MARK: Pillars

const pillars = [
  {
    title: 'US Marine Corps, 2009 – 2018',
    body: 'Data systems technician, supervisor, and Communications NCOIC, including two deployments to Afghanistan. Platoon sergeant for a 30+ Marine communications platoon and EKMS custodian for 700+ assets.',
  },
  {
    title: 'Enterprise IT, 2019 – 2023',
    body: 'Help desk and systems administration at Ember IT, Afilias, Donuts, and Identity Digital, carrying identity, email, endpoint, and device management through an acquisition and a rebrand.',
  },
  {
    title: 'Software development, 2023 – Present',
    body: 'B.S. Computer Science with a concentration in Mobile Development. Building web and mobile applications across iOS and Android and documenting each sprint in public.',
  },
]

// MARK: About

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Infrastructure experience, applied to building software.">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal className="space-y-5 text-base leading-relaxed text-fg-muted sm:text-lg">
          <p>
            My career started in the United States Marine Corps, where I spent nearly a decade in data systems and
            communications. I built domain controllers and Exchange servers for field exercises supporting more than 700
            users, deployed to Afghanistan twice, running the help desk and network for a forward-deployed unit, and later led a
            communications platoon while serving as EKMS custodian for more than $9 million in classified and unclassified
            assets.
          </p>
          <p>
            I carried that foundation into enterprise IT. After supporting more than 30 organizations at Ember IT, I
            became a Windows systems administrator at Afilias and stayed through its acquisition by Donuts and the
            rebrand to Identity Digital. That meant migrating more than 250 employees between G Suite and Okta tenants,
            consolidating servers and shared drives, and keeping Windows, macOS, and Linux endpoints patched and secure.
          </p>
          <p>
            Today I’m bringing that operational mindset to software development. I build web and mobile applications,
            including the My Concept Cloud storytelling platform and Kin Kitchen for iOS, and write about each sprint on
            my{' '}
            <a href={links.blog} target="_blank" rel="noopener noreferrer" className="text-accent-soft underline decoration-accent/40 underline-offset-4 hover:decoration-accent-soft">
              development blog
            </a>
            .
          </p>
        </Reveal>

        <ul className="grid gap-4">
          {pillars.map((pillar, index) => (
            <Reveal as="li" key={pillar.title} delay={index * 80} className="rounded-xl border border-line bg-ink-900/60 p-5">
              <h3 className="text-sm font-semibold text-fg">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{pillar.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
