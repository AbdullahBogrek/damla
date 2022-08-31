import React from 'react'
import { Link } from "react-router-dom";

import error_404 from "../../assets/error_404.jpg"
import "./error.css"

function Error404() {
  return (
    <div>
        
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="text-center row font">
                <div className=" col-md-12">
                    <img src={error_404} alt="" className="img-fluid" />
                </div>
                <div className=" col-md-12 mt-3">
                    <p className="fs-3 fw-bold"> <span className="text-danger">Opps!</span> Sayfa bulunamadı.</p>
                    <p className="lead fw-semibold">
                        Bu sayfa bulunmamaktadır. Lütfen adresi kontrol ediniz ve tekrar deneyiniz.
                    </p>
                    <Link to="/" className="btn btn-primary">Anasayfaya git</Link>
                </div>

            </div>
        </div>

    </div>
  )
}

export default Error404