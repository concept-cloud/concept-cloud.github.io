import { Placeholder } from '../components/Placeholder'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { awards, education } from '../data/education'

// MARK: Education

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Degrees, training, and recognition.">
      <ul className="grid gap-5 sm:grid-cols-2">
        {education.map((entry, index) => (
          <Reveal as="li" key={entry.credential} delay={(index % 2) * 70} className="flex flex-col rounded-2xl border border-line bg-ink-900/60 p-6">
            <p className="text-sm text-fg-subtle">
              {entry.institution}
              {entry.location ? ` · ${entry.location}` : ''}
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-fg">{entry.credential}</h3>
            {entry.concentration ? <p className="mt-1 text-sm text-fg-muted">Concentration: {entry.concentration}</p> : null}
            {entry.placeholders && entry.placeholders.length > 0 ? (
              <div className="mt-4">
                <Placeholder items={entry.placeholders} title="To be added" compact />
              </div>
            ) : null}
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
              {entry.honor ? (
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent-soft">
                  {entry.honor}
                </span>
              ) : null}
              {entry.completed ? <span className="font-mono text-xs text-fg-subtle">{entry.completed}</span> : null}
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-8 rounded-2xl border border-line bg-ink-900/40 p-6">
        <h3 className="font-mono text-xs font-medium tracking-[0.2em] text-fg-subtle uppercase">Awards</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {awards.map((award) => (
            <li key={award.title} className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <div>
                <p className="text-sm font-medium text-fg">{award.title}</p>
                <p className="text-xs text-fg-subtle">{award.issuer}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
