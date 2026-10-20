// MARK: Placeholder

interface PlaceholderProps {
  items: string[]
  title?: string
  compact?: boolean
}

export function Placeholder({ items, title = 'Content placeholder', compact = false }: PlaceholderProps) {
  if (items.length === 0) return null

  return (
    <div
      className={`rounded-lg border border-dashed border-amber-300/30 bg-amber-300/[0.04] text-amber-100/80 ${compact ? 'px-3 py-2 text-xs' : 'p-4 text-sm'}`}
      data-placeholder="true"
    >
      <p className="font-mono text-[0.68rem] font-medium tracking-[0.16em] text-amber-200/90 uppercase">{title}</p>
      <ul className={`${compact ? 'mt-1' : 'mt-2'} list-disc space-y-1 pl-4`}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
