import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchHelp } from '../../Api'
import moment from "moment"

import { useFavorite } from '../../contexts/FavoriteContext'

function HelpDetail() {

  const { help_id } = useParams()
  const { addFavorite, items } = useFavorite() 

  const { isLoading, isError, data } = useQuery(["help", help_id], () => 
    fetchHelp(help_id)
  )

  if (isLoading) {
    return <div className='container mt-5 pt-5'>
      <div className='row d-flex justify-content-center align-items-center mt-5 pt-5'>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    </div>
  }

  if (isError) {
    return <div> Error </div>
  }

  const findFavoriteItem = items.find((item) => item._id === help_id)

  return (
    <div>

      <div className="container shadow p-3 mb-5 bg-body rounded mt-5">
        <div className="row d-flex justify-content-center ps-4 py-4">
          <div className="col-md-6 help-detail-lside">
            <div className="row help-detail-header mb-3">
              <div className="header-top">
                <h3><i className="fa-solid fa-utensils text-danger me-2"></i>DENEME BAŞLIK</h3>
              </div>
              <div className="header-bottom d-flex justify-content-between align-items-center">
                <div className="left">
                  <p style={{"fontSize": "14px"}}><i className="fa-solid fa-location-dot me-1"></i> <span className="me-3">İstanbul / Tuzla</span> | <i className="fa-solid fa-eye ms-3 me-1"></i> <span className="me-3">303 görüntülenme</span> </p>
                </div>
                <div className="right me-4 mt-0 pt-0">
                  <Link to="/harita" className="btn btn-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Haritaya geri dön"><i className="fa-solid fa-circle-left"></i></Link>
                  <button className="btn btn-warning btn-sm" onClick={() => addFavorite(data, findFavoriteItem)} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Talebi yıldızla">
                    {
                      findFavoriteItem ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>
                    }
                  </button>
                </div>
              </div>
            </div>
            <div className="row help-detail-body pe-4 mb-3">
              <p className="mb-3">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
              <div className="mt-3">
                <h6>Koşullar</h6>
                <p>KOŞULLAR SIRALANACAK</p>
              </div>
            </div>
            <div className="row help-detail-footer mb-3">
              <div className="col-12 text-start d-flex justify-content-between align-items-center">
                <div className="alert alert-primary w-100 me-4" role="alert">
                  <div className="left d-flex align-items-center">
                    <i className="fa-solid fa-location-arrow me-2"></i> <span style={{"fontSize": "13px"}}>Aydıntepe Mah. Bağdat Cad. İstanbul / Tuzla</span>
                  </div>
                </div>
                <div className="alert alert-secondary p-0 ps-3 py-1 me-4 d-flex align-items-center justify-content-center" role="alert">
                  <span style={{"fontSize": "13px"}}>Oluşturulma Tarihi: 12/02/2000 {/*{moment(data.createdAt).format("DD/MM/YYYY")}*/}</span>              
                </div>
                
              </div>
            </div>
          </div>
          <div className="col-md-6 help-detail-rside ms-0 ps-0">
            <div className="row help-detail-header mb-4">
              <div className="row">
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" >
                    <div className="carousel-inner img-thumbnail p-2">
                      <div className="carousel-item active">
                          <img src="https://picsum.photos/id/237/300/200" className="d-block w-100 rounded" alt="help" />
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Önce</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Sonra</span>
                    </button>
                </div>
              </div>
            </div>
            <div className="row help-detail-body me-5">
              <h6>İmkan Sahibi</h6>
              <div className="alert alert-light ms-3 pb-3 shadow p-3 bg-body rounded" role="alert">
                <div className="col-12">
                  <a href="mailto:asbogrek@gmail.com" target="_blank" rel="noreferrer" className="btn btn-danger btn-sm me-2"><i className="fa-solid fa-envelope me-2"></i>Email<span className="glyphicon glyphicon-earphone px-2">|</span> asbogrek@gmail.com</a>
                  <a className="btn btn-danger btn-sm btn-xlg" href={`tel:$5340341259}`}>
                    <i className="fa-solid fa-phone me-2"></i> Telefon <span className="glyphicon glyphicon-earphone px-2">|</span>5340341259
                  </a>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HelpDetail