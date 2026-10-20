import { Placeholder } from '../components/Placeholder'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { experience } from '../data/experience'
import type { ExperienceEntry, Position } from '../data/types'

// MARK: Position

function PositionBlock({ position, showMeta }: { position: Position; showMeta: boolean }) {
  return (
    <div>
      <h4 className="text-base font-medium text-accent-soft">{position.title}</h4>
      {showMeta ? (
        <p className="mt-1 font-mono text-xs text-fg-subtle">
          {position.period}
          {position.location ? ` · ${position.location}` : ''}
        </p>
      ) : null}
      {position.highlights.length > 0 ? (
        <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-fg-muted marker:text-accent/60">
          {position.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

// MARK: Entry

function Entry({ entry }: { entry: ExperienceEntry }) {
  const multiple = entry.positions.length > 1

  return (
    <div className="relative grid gap-3 pl-8 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:pl-10">
      <span aria-hidden="true" className="absolute top-1.5 left-0 size-3 rounded-full border-2 border-accent bg-ink-950" />
      <div className="text-sm text-fg-subtle">
        <p className="font-mono">{entry.period}</p>
        {entry.location ? <p className="mt-0.5">{entry.location}</p> : null}
      </div>
      <div className="min-w-0">
        <h3 className={`font-semibold tracking-tight text-fg ${entry.brief ? 'text-base' : 'text-lg'}`}>{entry.organization}</h3>
        {entry.summary ? <p className="mt-1 text-sm leading-relaxed text-fg-muted">{entry.summary}</p> : null}

        {multiple ? (
          <ol className="mt-5 space-y-6 border-l border-line pl-5">
            {entry.positions.map((position) => (
              <li key={`${position.title}-${position.period}`}>
                <PositionBlock position={position} showMeta />
              </li>
            ))}
          </ol>
        ) : entry.positions[0] ? (
          <div className="mt-3">
            <PositionBlock position={entry.positions[0]} showMeta={false} />
          </div>
        ) : null}

        {entry.decorations && entry.decorations.length > 0 ? (
          <div className="mt-6 rounded-xl border border-line bg-ink-900/60 p-4">
            <h4 className="font-mono text-xs font-medium tracking-[0.2em] text-fg-subtle uppercase">Decorations</h4>
            <ul className="mt-3 space-y-2">
              {entry.decorations.map((decoration) => (
                <li key={decoration} className="flex items-start gap-3 text-sm text-fg">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {decoration}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {entry.placeholders.length > 0 ? (
          <div className="mt-3">
            <Placeholder items={entry.placeholders} title="To be added" compact />
          </div>
        ) : null}
      </div>
    </div>
  )
}

// MARK: Section

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I’ve worked and served."
      intro="Nearly a decade of Marine Corps communications and data systems work, followed by enterprise systems administration."
    >
      <ol className="relative before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px before:bg-line-strong">
        {experience.map((entry) => (
          <Reveal as="li" key={entry.organization} className="pb-12 last:pb-0">
            <Entry entry={entry} />
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
