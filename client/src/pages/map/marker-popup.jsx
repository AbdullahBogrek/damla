import { Link } from 'react-router-dom'
import { useFavorite } from '@/contexts/favorite-context'
import { MapPin, Heart, ExternalLink } from 'lucide-react'

export function MarkerPopup({ item }) {
  const { items, addFavorite } = useFavorite()
  const findFavoriteItem = items.find((fav) => fav._id === item._id)

  return (
    <div className="max-w-[280px] p-1">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold capitalize leading-tight">
          {item.title}
        </h3>
        <span
          className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${
            item.type === 'talep' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {item.type === 'talep' ? 'Talep' : 'İmkan'}
        </span>
      </div>

      {item.description && (
        <p className="mb-2 text-xs text-gray-600 line-clamp-2">
          {item.description}
        </p>
      )}

      <div className="mb-3 flex items-center gap-1 text-xs text-gray-500">
        <MapPin className="h-3 w-3" />
        <span className="capitalize">
          {item.district}, {item.province}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to={`/yardim/${item._id}`}
          className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary/90"
        >
          <ExternalLink className="h-3 w-3" />
          Detay
        </Link>
        <button
          onClick={() => addFavorite(item, findFavoriteItem)}
          className="inline-flex items-center gap-1 rounded-md border px-2 py-1.5 text-xs transition-colors hover:bg-gray-50"
        >
          <Heart
            className={`h-3 w-3 ${findFavoriteItem ? 'fill-red-500 text-red-500' : ''}`}
          />
        </button>
      </div>
    </div>
  )
}
