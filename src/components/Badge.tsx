import type { ReactNode } from 'react'
import type { ProjectStatus } from '../data/types'
import { statusLabels } from '../data/projects'

// MARK: Badge

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-ink-800/80 px-2 py-0.5 font-mono text-[0.7rem] leading-5 text-fg-muted">
      {children}
    </span>
  )
}

// MARK: StatusBadge

const statusStyles: Record<ProjectStatus, string> = {
  live: 'text-emerald-300 border-emerald-400/25 bg-emerald-400/10',
  beta: 'text-sky-300 border-sky-400/25 bg-sky-400/10',
  'in-development': 'text-amber-200 border-amber-300/25 bg-amber-300/10',
  planning: 'text-violet-200 border-violet-300/25 bg-violet-300/10',
  archived: 'text-slate-300 border-slate-400/25 bg-slate-400/10',
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {statusLabels[status]}
    </span>
  )
}
