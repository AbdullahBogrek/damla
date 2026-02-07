import { useState, useRef, useCallback } from 'react'
import { useQuery } from 'react-query'
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api'
import { fetchImkanList, fetchTalepList } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'
import { MapSearch } from './map-search'
import { MapControls } from './map-controls'
import { MapFilters } from './map-filters'
import { MarkerPopup } from './marker-popup'
import { CreateTalepDialog } from './create-talep-dialog'
import { CreateImkanDialog } from './create-imkan-dialog'

const libraries = ['places']

const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 4rem)',
}

const center = {
  lat: 38.9637,
  lng: 35.2433,
}

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    { featureType: 'poi', stylers: [{ visibility: 'off' }] },
    { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  ],
}

export default function MapPage() {
  const libRef = useRef(libraries)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: libRef.current,
  })

  const { data: talepler } = useQuery('taleps', fetchTalepList)
  const { data: imkanlar } = useQuery('imkans', fetchImkanList)

  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const [talepDialogOpen, setTalepDialogOpen] = useState(false)
  const [imkanDialogOpen, setImkanDialogOpen] = useState(false)

  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(15)
  }, [])

  if (loadError) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-destructive">Harita yüklenirken bir hata oluştu.</p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-sm text-muted-foreground">Harita yükleniyor...</p>
        </div>
      </div>
    )
  }

  const showTalepler = filter === 'all' || filter === 'talep'
  const showImkanlar = filter === 'all' || filter === 'imkan'

  return (
    <div className="relative">
      {/* Search */}
      <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2">
        <MapSearch panTo={panTo} />
      </div>

      {/* Controls */}
      <div className="absolute right-4 top-4 z-10">
        <MapControls
          panTo={panTo}
          onCreateTalep={() => setTalepDialogOpen(true)}
          onCreateImkan={() => setImkanDialogOpen(true)}
        />
      </div>

      {/* Filters */}
      <div className="absolute bottom-6 left-4 z-10">
        <MapFilters filter={filter} onFilterChange={setFilter} />
      </div>

      {/* Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7}
        center={center}
        options={mapOptions}
        onLoad={onMapLoad}
      >
        {/* Talep markers (red) */}
        {showTalepler &&
          talepler?.map((marker) =>
            marker.positions?.lat && marker.positions?.lng ? (
              <Marker
                key={marker._id}
                position={{
                  lat: parseFloat(marker.positions.lat),
                  lng: parseFloat(marker.positions.lng),
                }}
                onClick={() => setSelected({ ...marker, type: 'talep' })}
              />
            ) : null
          )}

        {/* Imkan markers (blue) */}
        {showImkanlar &&
          imkanlar?.map((marker) =>
            marker.positions?.lat && marker.positions?.lng ? (
              <Marker
                key={marker._id}
                position={{
                  lat: parseFloat(marker.positions.lat),
                  lng: parseFloat(marker.positions.lng),
                }}
                onClick={() => setSelected({ ...marker, type: 'imkan' })}
                icon={
                  window.google
                    ? {
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: '#3b82f6',
                        fillOpacity: 1,
                        strokeColor: '#1d4ed8',
                        strokeWeight: 2,
                      }
                    : undefined
                }
              />
            ) : null
          )}

        {/* Info Window */}
        {selected && selected.positions?.lat && selected.positions?.lng && (
          <InfoWindow
            position={{
              lat: parseFloat(selected.positions.lat),
              lng: parseFloat(selected.positions.lng),
            }}
            onCloseClick={() => setSelected(null)}
          >
            <MarkerPopup item={selected} />
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Dialogs */}
      <CreateTalepDialog
        open={talepDialogOpen}
        onOpenChange={setTalepDialogOpen}
      />
      <CreateImkanDialog
        open={imkanDialogOpen}
        onOpenChange={setImkanDialogOpen}
      />
    </div>
  )
}
