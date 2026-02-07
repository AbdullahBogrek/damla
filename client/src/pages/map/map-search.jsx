import usePlaceAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import { Search } from 'lucide-react'

export function MapSearch({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlaceAutocomplete({
    requestOptions: {
      location: { lat: () => 38.9637, lng: () => 35.2433 },
      radius: 200 * 1000,
    },
  })

  return (
    <div className="relative w-[320px] sm:w-[400px]">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false)
          clearSuggestions()
          try {
            const results = await getGeocode({ address })
            const { lat, lng } = await getLatLng(results[0])
            panTo({ lat, lng })
          } catch (error) {
            // Handle error silently
          }
        }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <ComboboxInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            placeholder="Adres ara..."
            className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm shadow-sm outline-none ring-ring transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-offset-0"
          />
        </div>
        <ComboboxPopover className="z-50 mt-1 overflow-hidden rounded-lg border bg-popover shadow-md">
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  key={place_id}
                  value={description}
                  className="cursor-pointer px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-accent"
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}
