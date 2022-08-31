import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { useFavorite } from "../../contexts/FavoriteContext"
import "./favorite.css"

function Favorite() {
    const { items, removeFavorite } = useFavorite()
 
  return (
    <div>
        <div className="container mt-5" id="custom-cards">
            <h2 className="pb-2 border-bottom">Yıldızlanan Yardımlar</h2>
            <div className="row row-cols-1 row-cols-lg-1 align-items-stretch g-4 py-3">

                {
                    items.length < 1 && 
                        <div className="alert alert-warning" role="alert">
                            <i className="fa-solid fa-triangle-exclamation me-2"></i> Yıldızlanmış herhangi bir yardım bulunmamaktadır. <Link to="/harita">Buradan</Link> harita sayfasına giderek yardımları yıldızlayabilirsiniz. 
                        </div>
                }

                {
                    items.length > 0 && (
                        <>
                            {
                                items.map((item, key) => (
                                    <div className="col-lg-6 col-xl-4" key={key}>
                                        <div className="favorite-card card card-cover h-100 overflow-hidden text-dark rounded-4 shadow-lg" >
                                            <div className="d-flex flex-column h-100 pt-0 p-4 pb-3 text-white text-shadow-1">
                                                <h2 className="favorite-card-title pt-4 mt-5 mb-4 lh-1 fw-bold"><h6><i class="fa-solid fa-circle-check me-2 fa-1x"></i></h6> {item.title}</h2>
                                                <ul className="d-flex list-unstyled mt-auto justify-content-between">
                                                    <li className="d-flex align-items-center me-3">
                                                    <i className="fa-solid fa-location-dot me-3"></i>
                                                    <small>{item.province} / {item.district}</small>
                                                    </li>
                                                    <li className="d-flex align-items-center text-end">
                                                    <i className="fa-solid fa-calendar-days me-2"></i>                  
                                                    <small>{moment(item.createdAt).format("DD/MM/YYYY")}</small>
                                                    </li>
                                                    {
                                                        console.log(item.photos[0])
                                                    }
                                                </ul>
                                                <ul className="d-flex list-unstyled mt-auto justify-content-between">
                                                    <li className="d-flex align-items-center me-3">
                                                    <Link to={`/yardim/${item._id}`} type="button" className="btn btn-sm btn-primary">
                                                        <i className="fa-solid fa-circle-chevron-down me-1"></i>
                                                        <small>Detay</small>
                                                    </Link>
                                                    </li>
                                                    <li className="d-flex align-items-center text-end">
                                                    <button type="button" className="btn btn-sm btn-outline-warning" onClick={() => removeFavorite(item._id)}>
                                                        <i className="fa-solid fa-star me-1"></i>
                                                        <small>Yıldızı kaldır</small>
                                                    </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div> 
                                ))
                            }
                        </>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Favorite