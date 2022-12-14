import TalepModal from "../TalepModal"
import ImkanModal from "../ImkanModal"

import "./style.css"

function MapTool() {

    return (
        <div>
            <div className="container-fluid mb-0">
                <header className="d-flex flex-wrap align-items-center justify-content-start justify-content-md-start border-bottom shadow py-2 mb-1 shadow-normal rounded">
                    <div className="row">
                        <div className="col-md-1">

                        <div className="map-buttons d-flex justify-content-between p-2 ">
        
                        <TalepModal />

                        <ImkanModal />

                        </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default MapTool

// <form className="form-inline d-flex justify-content-between align-items-center ms-2">
//                             <button className="btn btn-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
//                                 <i className="fa-solid fa-bars"></i>
//                             </button>  
//                             <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
//                                 <div className="offcanvas-header">
//                                     <h5 className="offcanvas-title" id="staticBackdropLabel">Filtreler</h5>
//                                     <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                                 </div>
//                                 <div className="offcanvas-body">
//                                     <div>
//                                         <div className="form-floating mb-3">
//                                             <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
//                                                 <option value="0">Hepsi</option>
//                                                 <option value="1">Talepler</option>
//                                                 <option value="2">??mkanlar</option>
//                                             </select>
//                                             <label htmlFor="floatingSelect">Yard??m T??r??</label>
//                                         </div>
//                                         <div className="form-floating mb-3">
//                                             <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
//                                                 <option value="0">Hepsi</option>
//                                                 <option value="1">??stanbul</option>
//                                                 <option value="2">Ankara</option>
//                                                 <option value="3">Eski??ehir</option>
//                                                 <option value="4">Konya</option>
//                                                 <option value="5">Bursa</option>
//                                             </select>
//                                             <label htmlFor="floatingSelect">??l</label>
//                                         </div>
//                                         <div className="form-floating mb-3">
//                                             <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
//                                                 <option value="0">Hespi</option>
//                                                 <option value="1">Maltepe</option>
//                                                 <option value="2">Kad??k??y</option>
//                                                 <option value="3">??sk??dar</option>
//                                                 <option value="4">Kartal</option>
//                                                 <option value="5">Tuzla</option>
//                                             </select>
//                                             <label htmlFor="floatingSelect">??l??e</label>
//                                         </div>
//                                         <div className="form-floating mb-3">
//                                             <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
//                                                 <option value="0">Hepsi</option>
//                                                 <option value="1">Son 24 saat</option>
//                                                 <option value="2">Son 3 g??n</option>
//                                                 <option value="3">Son 1 hafta</option>
//                                                 <option value="4">Son 1 ay</option>
//                                             </select>
//                                             <label htmlFor="floatingSelect">Yard??m Tarihi</label>
//                                         </div>
//                                         <div className="form-floating mb-3">
//                                             <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
//                                                 <option value="0">Hepsi</option>
//                                                 <option value="1">Do??rulanm????</option>
//                                                 <option value="2">Do??rulanmam????</option>
//                                             </select>
//                                             <label htmlFor="floatingSelect">Hesap T??r??</label>
//                                         </div>
//                                     </div> 
//                                 </div>
//                             </div>
//  </form> 