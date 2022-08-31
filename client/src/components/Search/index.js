import { useRef, useCallback } from 'react'
import usePlaceAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete"
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    // ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import "./style.css"

function Search() {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlaceAutocomplete({
        requestOptions: {
            location: {lat: () => 38.9637, lng: () => 35.2433},
            radius: 200 * 1000,

        }
    })

    const mapRef = useRef();

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng})
        mapRef.current.setZoom(7)
    }, [])

    return (
        <div className='map-search'>
            <Combobox 
                onSelect={async (address) => {
                    setValue(address, false)
                    clearSuggestions()

                    try {
                        const results = await getGeocode({ address })
                        const { lat, lng } = await getLatLng(results[0])
                        panTo({ lat, lng })
                    } catch(error) {
                        console.log("error!")
                    }
                    // console.log(address)
            }}
            >
                <ComboboxInput  
                    value={value} 
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    disabled={!ready}
                    placeholder="Lütfen bir konum giriniz."
                    style={{ padding: 10, paddingLeft: 20}}
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} style={{ padding: 12, color: "black", font: "Arial, Helvetica, sans-serif" }} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
        
    )
}

export default Search