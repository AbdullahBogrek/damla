import { cn } from '@/lib/utils'

const filters = [
  { value: 'all', label: 'Tümü' },
  { value: 'talep', label: 'Talepler', color: 'bg-red-500' },
  { value: 'imkan', label: 'İmkanlar', color: 'bg-blue-500' },
]

export function MapFilters({ filter, onFilterChange }) {
  return (
    <div className="flex gap-1.5 rounded-lg bg-background/95 p-1.5 shadow-md backdrop-blur">
      {filters.map(({ value, label, color }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={cn(
            'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
            filter === value
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {color && (
            <span className={cn('h-2 w-2 rounded-full', color)} />
          )}
          {label}
        </button>
      ))}
    </div>
  )
}
