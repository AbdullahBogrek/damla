import { useState, useRef, useCallback } from 'react'
import { useQuery } from "react-query"
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
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

// import { useFavorite } from '../../contexts/FavoriteContext';

import "./map.css";
// import { style1 } from './mapStyles';
import MapTool from '../../components/MapTool';
import MarkerInfo from '../../components/MarkerInfo';
import { fetchImkanList, fetchTalepList } from '../../Api';

const libraries = ['places']

const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
}
const center = {
    lat: 38.9637, 
    lng: 35.2433
}
const options = {
    // styles: style1,
    disableDefaultUI: true,
    zoomControl: true,
}

export default function Map() {
    let libRef = useRef(libraries)

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries: libRef.current,  
    })

    const { data: talepler } = useQuery("taleps", fetchTalepList)
    const { data: imkanlar } = useQuery("imkans", fetchImkanList)
    console.log("talepler: ", talepler)
    console.log(imkanlar);

    const [selected, setSelected] = useState(null)

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map
    }, []);

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng})
        mapRef.current.setZoom(15)
    }, [])

    if (loadError) return "Harita yüklenirken bir hata oluştu"
    if (!isLoaded) return "Harita yükleniyor"

    return (<div>
        <MapTool/>
        {/* <TalepModal /> */}
        {/* <ImkanModal /> */}
        <Search panTo={panTo} /> 
        <Locate panTo={panTo} />
        <GoogleMap 
            mapContainerStyle={mapContainerStyle} 
            zoom={7} 
            center={center}
            options={options}
            onLoad={onMapLoad}
        >
            {   talepler?.map(marker => (
                <Marker 
                    key={marker._id}
                    position={{ lat: parseFloat(marker.positions.lat), lng: parseFloat(marker.positions.lng)}}
                    onClick={() => {
                        setSelected(marker)
                    }}
                />
                ))
            }
            {   imkanlar?.map(marker => (
                <Marker 
                    key={marker._id}
                    position={{ lat: parseFloat(marker.positions.lat), lng: parseFloat(marker.positions.lng)}}
                    onClick={() => {
                        setSelected(marker)
                    }}
                    icon={{
                        url: ("http://www.clker.com/cliparts/l/g/L/A/A/C/blue-marker-black-border-fit.svg"),
                        scaledSize: new window.google.maps.Size(25, 40)
                    }}
                />
            ))}

            {selected ? (<InfoWindow 
                position={{ lat: parseFloat(selected.positions.lat), lng: parseFloat(selected.positions.lng) }}
                onCloseClick={() => {
                    setSelected(null)
                }}
            >
                <div>
                    <MarkerInfo item={selected}/>
                </div>
                
            </InfoWindow>
            ) : null}
        </GoogleMap>
    </div>)
}

function Locate({ panTo }) {
    return (
        <button className='locate bg-warning rounded-circle d-flex justify-content-center align-items-center' style={{width: 40, height: 40, marginTop: 5, marginRight: 5}} onClick={() => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    panTo({
                        lat:position.coords.latitude,
                        lng:position.coords.longitude,
                    })
                },
                () => null
                )
        }}>
           <i className="fa-solid fa-location-crosshairs fa-lg"></i>
        </button>
    )
}

function Search({ panTo }) {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlaceAutocomplete({
        requestOptions: {
            location: {lat: () => 38.9637, lng: () => 35.2433},
            radius: 200 * 1000,

        }
    })

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
                    placeholder="Lütfen bir adres giriniz."
                    style={{ padding: 10, paddingLeft: 20}}
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} style={{ padding: 12, color: "black", font: "Arial, Helvetica, sans-serif" }}/>
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
        
    )
}

// export default function Home(){

//     const { isLoaded } = useLoadScript({
//         googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
//     })

//     if (!isLoaded) return (
//         <div className='container'>
//         <div className='row d-flex justify-content-center align-items-center'>
//             <div className="spinner-border" role="status">
//             <span className="visually-hidden">Loading...</span>
//             </div>
//         </div>
//         </div>
//     )

//     return <Map />
// }

// function Map() {

//     const { addToFavorite } = useFavorite()

//     const center = useMemo(() => ({ lat: 38.9637, lng: 35.2433 }), []);

//     const { isLoading, error, data } = useQuery("repoData", () =>
//         fetch("http://localhost:4000/help").then((res) => res.json())
//     )

//     const [selectedCenter, setSelectedCenter] = useState(null);

//     if (isLoading) return "Loading..."

//     if (error) return "Bir hata meydana geldi: " + error.message

//     return (

//         <>
//         <div className="container">
//             <header className="d-flex flex-wrap align-items-center justify-content-between justify-content-md-center border-bottom shadow py-2 mb-1 shadow-normal rounded">
//                 <div className="map-buttons d-flex justify-content-between">

//                     <button type="button" className="btn btn-success" onClick={() => addToFavorite}>Success</button>

//                     {/* <!-- TALEP EKLE --> */}
//                     <button type="button" className="btn btn-sm btn-outline-danger px-2 me-2" data-bs-toggle="modal" data-bs-target="#addRequestModel">
//                         <i className="fa-solid fa-location-dot me-1"></i> Talep ekle
//                     </button>

//                     {/* <!-- Modal --> */}
//                     <div className="modal fade" id="addRequestModel" tabIndex="-1" aria-labelledby="addRequestModelLabel" aria-hidden="true">
//                         <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
//                             <div className="modal-content">
//                                 <div className="modal-header">
//                                     <h5 className="modal-title" id="addRequestModelLabel">Talep Ekle</h5>
//                                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                 </div>
//                                 <div className="modal-body">
//                                     <div className="alert alert-warning help-modal-alert mb-4" role="alert">
//                                         <i className="fa-solid fa-triangle-exclamation me-2"></i> Talep oluştururken gireceğiniz bilgilerin doğrulu çok önemlidir. Bilgilerinizin yanlışlığı sonucu oluşacak bütün sorunlardan siz sorumlusunuz.
//                                     </div>
//                                     <form action="POST">
//                                         {/* <!-- Talep Bilgileri--> */}
//                                         <div className="row g-2 mb-3">
//                                             <h6 className="text-danger">
//                                                 Talep Bilgileri
//                                             </h6>
//                                             <div className="form-floating mb-2">
//                                                 <input type="text" className="form-control" id="floatingHelpTitle" placeholder="Yardım talebinizin başlığı açıklayıcı ve basit olmalıdır."/>
//                                                 <label htmlFor="floatingHelpTitle">Talep başlığı</label>
//                                             </div>
//                                             <div className="col-md">
//                                                 <div className="form-floating mb-2">
//                                                     <select className="form-select" id="floatingSelectHelpType">
//                                                         <option defaultValue>Yardım talebi türü seçiniz.</option>
//                                                         <option value="4">İş</option>
//                                                         <option value="3">Gıda</option>
//                                                         <option value="3">Barınma (yurt, ev vb.)</option>
//                                                         <option value="2">Maddi (kira, fatura vb.)</option>
//                                                         <option value="5">Sağlık (ilaç, sigorta vb. )</option>
//                                                         <option value="1">Eğitim (burs, taksit, sınav ödemeleri vb. )</option>
//                                                         <option value="6">Diğer</option>
//                                                     </select>
//                                                     <label htmlFor="floatingSelectHelpType">Talep türü</label>
//                                                 </div>
//                                             </div>
//                                             <div className="form-floating">
//                                                 <textarea className="form-control" placeholder="Leave a comment here" id="floatingHelpComment"></textarea>
//                                                 <label htmlFor="floatingHelpComment">Açıklama</label>
//                                             </div>
//                                         </div>
//                                         {/* <!-- Talep Sahibi Bilgileri--> */}
//                                         <div className="row g-2 mb-3">
//                                             <h6 className="text-danger">
//                                                 Talep Sahibi
//                                             </h6>
//                                             <div className="col-md">
//                                                 <div className="form-floating mb-2">
//                                                     <select className="form-select" id="floatingSelectHelpJob">
//                                                     <option defaultValue> Mesleğinizi seçiniz.</option>
//                                                     <option value="1">Doktor</option>
//                                                     <option value="2">Hemşire</option>
//                                                     <option value="3">Mühendis</option>
//                                                     <option value="4">Memur</option>
//                                                     <option value="5">İşçi</option>
//                                                     <option value="6">Öğrenci</option>
//                                                     </select>
//                                                     <label htmlFor="floatingSelectHelpJob">Meslek</label>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md">
//                                                 <div className="form-floating mb-2">
//                                                     <select className="form-select" id="floatingSelectHelpIncome">
//                                                     <option defaultValue>Aylık gelirinizi seçiniz.</option>
//                                                     <option value="1">0-500</option>
//                                                     <option value="2">500-1000</option>
//                                                     <option value="3">1000-2000</option>
//                                                     <option value="3">2000-4000</option>
//                                                     <option value="3">4000-6000</option>
//                                                     <option value="3">6000 ve üzeri</option>
//                                                     </select>
//                                                     <label htmlFor="floatingSelectHelpIncome">Aylık Gelir</label>
//                                                 </div>
//                                             </div>
//                                             <div className="input-group mb-2">
//                                                 <span className="input-group-text p-3" id="help-phone-area-code"><img className="my-1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/800px-Flag_of_Turkey.svg.png?20210808085121" alt="turkey flag" height="15" width="22" /></span>
//                                                 <input type="phone" className="form-control" placeholder="5XX XXX XX XX" aria-label="Phone" aria-describedby="basic-addon1"/>
//                                             </div>
//                                             <div className="form-floating mb-1">
//                                                 <input type="email" className="form-control" id="floatingHelpEmail" placeholder="name@example.com"/>
//                                                 <label htmlFor="floatingHelpEmail">Email</label>
//                                             </div>
//                                         </div>
//                                         {/* <!-- Talep Adresi Bilgileri--> */}
//                                         <div className="row g-2 mb-3">
//                                             <h6 className="text-danger">
//                                                 Talep Adresi
//                                             </h6>
//                                             <div className="col-md">
//                                                 <div className="form-floating mb-2">
//                                                     <select className="form-select" id="floatingSelectHelpProvince">
//                                                     <option defaultValue>Bulunduğunuz ili seçiniz.</option>
//                                                     <option value="1">İstanbul</option>
//                                                     <option value="2">Ankara</option>
//                                                     <option value="3">Eskişehir</option>
//                                                     </select>
//                                                     <label htmlFor="floatingSelectHelpProvince">İl</label>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md">
//                                                 <div className="form-floating mb-2">
//                                                     <select className="form-select" id="floatingSelectHelpDistrict">
//                                                     <option defaultValue>Bulunduğunuz ilçeyi seçiniz.</option>
//                                                     <option value="1">Kadıköy</option>
//                                                     <option value="2">Maltepe</option>
//                                                     <option value="3">Tuzla</option>
//                                                     </select>
//                                                     <label htmlFor="floatingSelectHelpDistrict">İlçe</label>
//                                                 </div>
//                                             </div>
//                                             <div className="form-floating">
//                                                 <input type="text" className="form-control" id="floatingSelectHelpStreet" placeholder="Yardım talebinizi giriniz."/>
//                                                 <label htmlFor="floatingSelectHelpStreet">Cadde / Sokak / Mahalle</label>
//                                             </div>
//                                         </div>
//                                         {/* <!-- Doğrulama --> */}
//                                         <div className="row g-2 my-3 ps-2">
//                                             <div className="form-check">
//                                                 <input className="form-check-input" type="checkbox" value="" id="flexCheckHelp1"/>
//                                                 <label className="form-check-label map-modal-check" htmlFor="flexCheckHelp1">
//                                                     Verilerin doğruluğunu onaylıyorum.
//                                                 </label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input className="form-check-input" type="checkbox" value="" id="flexCheckHelp2"/>
//                                                 <label className="form-check-label map-modal-check" htmlFor="flexCheckHelp2">
//                                                     Verilerin, talep sahibi ile iletişime geçmek isteyenlerle paylaşılmasını onaylıyorum.
//                                                 </label>
//                                             </div>
//                                         </div>
//                                     </form>
                                    
//                                 </div>
//                                 <div className="modal-footer">
//                                     <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Kapat</button>
//                                     <button type="button" className="btn btn-sm btn-danger">Talep Oluştur</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* <!-- İMKAN EKLE --> */}

//                     <button type="button" className="btn btn-sm btn-outline-primary px-2 me-2" data-bs-toggle="modal" data-bs-target="#addOppurtunityModel">
//                         <i className="fa-solid fa-location-dot me-1"></i> İmkan ekle
//                     </button>

//                     {/* <!-- Modal --> */}
//                     <div className="modal fade" id="addOppurtunityModel" tabIndex="-1" aria-labelledby="addOppurtunityModelLabel" aria-hidden="true">
//                         <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
//                             <div className="modal-content">
//                                 <div className="modal-header">
//                                     <h5 className="modal-title" id="addOppurtunityModelLabel">İmkan Ekle</h5>
//                                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                 </div>
//                                 <div className="modal-body">
//                                     <div className="alert alert-warning help-modal-alert mb-4" role="alert">
//                                         <i className="fa-solid fa-triangle-exclamation me-2"></i> İmkan oluştururken gireceğiniz bilgilerin doğrulu çok önemlidir. Bilgilerinizin yanlışlığı sonucu oluşacak bütün sorunlardan siz sorumlusunuz.
//                                     </div>
//                                     <form action="POST">
//                                         {/* <!-- İmkan Bilgileri--> */}
//                                         <div className="row g-2 mb-3">
//                                             <h6 className="text-primary">
//                                                 İmkan Bilgileri
//                                             </h6>
//                                             <div className="form-floating mb-2">
//                                                 <input type="text" className="form-control" id="floatingOpptTitle" placeholder="Yardım imkanınızın başlığı açıklayıcı ve basit olmalıdır."/>
//                                                 <label htmlFor="floatingOpptTitle">İmkan başlığı</label>
//                                             </div>
//                                             <div className="col-md">
//                                                 <div className="form-floating mb-2">
//                                                     <select className="form-select" id="floatingSelectOpptType">
//                                                         <option defaultValue>Yardım imkani türü seçiniz.</option>
//                                                         <option value="4">İş</option>
//                                                         <option value="3">Gıda</option>
//                                                         <option value="3">Barınma (yurt, ev vb.)</option>
//                                                         <option value="2">Maddi (kira, fatura vb.)</option>
//                                                         <option value="5">Sağlık (ilaç, sigorta vb. )</option>
//                                                         <option value="1">Eğitim (burs, taksit, sınav ödemeleri vb. )</option>
//                                                         <option value="6">Diğer</option>
//                                                     </select>
//                                                     <label htmlFor="floatingSelectOpptType">İmkan türü</label>
//                                                 </div>
//                                             </div>
//                                             <div className="form-floating">
//                                                 <textarea className="form-control" placeholder="Leave a comment here" id="floatingOpptComment"></textarea>
//                                                 <label htmlFor="floatingOpptComment">Açıklama</label>
//                                             </div>
//                                         </div>
//                                         {/* <!-- İmkan Sahibi Bilgileri--> */}
//                                         <div className="row g-2 mb-3">
//                                             <h6 className="text-primary">
//                                                 İmkan Sahibi
//                                             </h6>
//                                             <div className="col-md">
//                                                 <div className="form-floating mb-2">
//                                                     <select className="form-select" id="floatingSelectOpptWho">
//                                                     <option defaultValue>Yardımı kim yapmakta ?</option>
//                                                     <option value="1">Şahis</option>
//                                                     <option value="2">Vakıf</option>
//                                                     <option value="3">Kurum</option>
//                                                     </select>
//                                                     <label htmlFor="floatingSelectOpptWho">Yardım eden</label>
//                                                 </div>
//                                             </div>
//                                             <div className="input-group mb-2">
//                                                 <span className="input-group-text p-3" id="oppt-phone-area-code"><img className="my-1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/800px-Flag_of_Turkey.svg.png?20210808085121" alt="turkey flag" height="15" width="22"/></span>
//                                                 <input type="phone" className="form-control" placeholder="5XX XXX XX XX" aria-label="Phone" aria-describedby="basic-addon1"/>
//                                             </div>
//                                             <div className="form-floating mb-1">
//                                                 <input type="email" className="form-control" id="floatingOpptEmail" placeholder="name@example.com"/>
//                                                 <label htmlFor="floatingOpptEmail">Email</label>
//                                             </div>
//                                         </div>
//                                         {/* <!-- İmkan Adresi Bilgileri--> */}
//                                         <div className="row g-2 mb-3">
//                                             <h6 className="text-primary">
//                                                 İmkan Adresi
//                                             </h6>
//                                             <div className="col-md">
//                                                 <div className="form-floating mb-2">
//                                                     <select className="form-select" id="floatingSelectOpptProvince">
//                                                     <option defaultValue>Bulunduğunuz ili seçiniz.</option>
//                                                     <option value="1">İstanbul</option>
//                                                     <option value="2">Ankara</option>
//                                                     <option value="3">Eskişehir</option>
//                                                     </select>
//                                                     <label htmlFor="floatingSelectOpptProvince">İl</label>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md">
//                                                 <div className="form-floating mb-2">
//                                                     <select className="form-select" id="floatingSelectOpptDistrict">
//                                                     <option defaultValue>Bulunduğunuz ilçeyi seçiniz.</option>
//                                                     <option value="1">Kadıköy</option>
//                                                     <option value="2">Maltepe</option>
//                                                     <option value="3">Tuzla</option>
//                                                     </select>
//                                                     <label htmlFor="floatingSelectOpptDistrict">İlçe</label>
//                                                 </div>
//                                             </div>
//                                             <div className="form-floating">
//                                                 <input type="text" className="form-control" id="floatingSelectOpptStreet" placeholder="Yardım imkanınızı giriniz."/>
//                                                 <label htmlFor="floatingSelectOpptStreet">Cadde / Sokak / Mahalle</label>
//                                             </div>
//                                         </div>
//                                         {/* <!-- Doğrulama --> */}
//                                         <div className="row g-2 my-3 ps-2">
//                                             <div className="form-check">
//                                                 <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault3"/>
//                                                 <label className="form-check-label map-modal-check" htmlFor="flexCheckDefault3">
//                                                     Verilerin doğruluğunu onaylıyorum.
//                                                 </label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault4"/>
//                                                 <label className="form-check-label map-modal-check" htmlFor="flexCheckDefault4">
//                                                     Verilerin, talep sahibi ile iletişime geçmek isteyenlerle paylaşılmasını onaylıyorum.
//                                                 </label>
//                                             </div>
//                                         </div>
//                                     </form>
                                    
//                                 </div>
//                                 <div className="modal-footer">
//                                     <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Kapat</button>
//                                     <button type="button" className="btn btn-sm btn-primary">İmkan Oluştur</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//                 <form className="form-inline d-flex justify-content-between align-items-center ms-2">
//                     <input className="form-control form-control-sm py-2 px-3 me-3" type="search" id="searchBar" placeholder="Lütfen bir konum giriniz." aria-label="Search"/>
//                     <button className="btn btn-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
//                         <i className="fa-solid fa-bars"></i>
//                     </button>  
//                     <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
//                         <div className="offcanvas-header">
//                             <h5 className="offcanvas-title" id="staticBackdropLabel">Filtreler</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                         </div>
//                         <div className="offcanvas-body">
//                             <div>
//                                 {/* <!-- Help Type --> */}
//                                 <div className="form-floating mb-3">
//                                     <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
//                                         <option value="0">Hepsi</option>
//                                         <option value="1">Talepler</option>
//                                         <option value="2">İmkanlar</option>
//                                     </select>
//                                     <label htmlFor="floatingSelect">Yardım Türü</label>
//                                 </div>
//                                 {/* <!-- Help Province --> */}
//                                 <div className="form-floating mb-3">
//                                     <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
//                                         <option value="0">Hepsi</option>
//                                         <option value="1">İstanbul</option>
//                                         <option value="2">Ankara</option>
//                                         <option value="3">Eskişehir</option>
//                                         <option value="4">Konya</option>
//                                         <option value="5">Bursa</option>
//                                     </select>
//                                     <label htmlFor="floatingSelect">İl</label>
//                                 </div>
//                                 {/* <!-- Help District --> */}
//                                 <div className="form-floating mb-3">
//                                     <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
//                                         <option value="0">Hespi</option>
//                                         <option value="1">Maltepe</option>
//                                         <option value="2">Kadıköy</option>
//                                         <option value="3">Üsküdar</option>
//                                         <option value="4">Kartal</option>
//                                         <option value="5">Tuzla</option>
//                                     </select>
//                                     <label htmlFor="floatingSelect">İlçe</label>
//                                 </div>
//                                 {/* <!-- Help Date --> */}
//                                 <div className="form-floating mb-3">
//                                     <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
//                                         <option value="0">Hepsi</option>
//                                         <option value="1">Son 24 saat</option>
//                                         <option value="2">Son 3 gün</option>
//                                         <option value="3">Son 1 hafta</option>
//                                         <option value="4">Son 1 ay</option>
//                                     </select>
//                                     <label htmlFor="floatingSelect">Yardım Tarihi</label>
//                                 </div>
//                                 {/* <!-- Help Account Type --> */}
//                                 <div className="form-floating mb-3">
//                                     <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
//                                         <option value="0">Hepsi</option>
//                                         <option value="1">Doğrulanmış</option>
//                                         <option value="2">Doğrulanmamış</option>
//                                     </select>
//                                     <label htmlFor="floatingSelect">Hesap Türü</label>
//                                 </div>
//                             </div> 
//                         </div>
//                     </div>
//                 </form>
//             </header>
//         </div>

//         <div id="map">

//             <GoogleMap 
//                 zoom={7}
//                 center={center}
//                 mapContainerClassName = "map-container"
//             >
//                 {
//                     data.map((item, key) => (
//                         <Marker 
//                             key={key}
//                             position={{ lat: parseFloat(item.positions[0]), lng: parseFloat(item.positions[1]) }}
//                             onClick={() => {
//                                 setSelectedCenter(item);
//                             }}
//                         />   
//                     ))
                    
//                 }

//                 {selectedCenter && (
//                     <InfoWindow
//                         onCloseClick={() => {
//                             setSelectedCenter(null);
//                         }}
//                         position={{
//                             lat: parseFloat(selectedCenter.positions[0]),
//                             lng: parseFloat(selectedCenter.positions[1])
//                         }}
//                     >
//                     </InfoWindow>
//                 )}

//             </GoogleMap>

//         </div>
//         </>

//     )

// }


// export default function Home(){

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
//   })

//   if (!isLoaded) return (
//     <div className='container'>
//       <div className='row d-flex justify-content-center align-items-center'>
//         <div className="spinner-border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     </div>
//   )

//   return <Map />
// }

// function Map() {

//   const center = useMemo(() => ({ lat: 38.9637, lng: 35.2433 }), []);

//   return <GoogleMap 
//     zoom={7}
//     center={center}
//     mapContainerClassName = "map-container"
//     >
//       <Marker position={center}></Marker>
//     </GoogleMap>
// }