import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './profile.css'

import profilPhoto from '../../assets/profil.jpeg'
const capitalizeFirstWords = str => {
    const arr = str.split(" ")

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    
    }

    const formatted_str = arr.join(" ");

    return formatted_str
};
  
function Profile() {

    const { user } = useAuth()

    const [readOnly, setReadOnly] = useState(true) 

    return (
        <div>
            <div className="position-relative">
                    {/* Header */}
                    <div className="position-relative pb-8 pt-lg-1 d-flex align-items-center" >
                        {/* Header container */}
                        <div className="container d-flex align-items-center">
                            <div className="row">
                                <div className="col-lg-7 col-md-10 mt-5">
                                    <h1 className="display-2 text-dark">Merhaba <span className="profile-header-name">{user ? capitalizeFirstWords(user.name) : ""}</span> </h1>
                                    <p className="text-dark mb-5">Bilgilerini güncelleyebilir, uygulama ayarlarını bu pencereden yapabilirsin. Daha iyi bir hizmet için bilgilerinizin doğruluğundan ve güncelliğinden emin olunuz.</p>
                                    <button className="btn btn-primary text-white" onClick={() => setReadOnly(!readOnly)}>Profili güncelle</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Page content */}
                    <div className="container mt--7">
                        <div className="row">
                            <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                                <div className="card card-profile shadow">
                                    <div className="mb-4">
                                        <div className="col-lg-3 order-lg-2">
                                            <div className="card-profile-image pb-4">
                                                <a href="/">
                                                    <img src={profilPhoto} className="rounded-circle border border-dark border-4" alt='content'/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-header text-center border-0 pt-5 pb-1">
                                        {/* START ADD IMAGE */}

                                            {/* Button trigger modal */}
                                            <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <i className="fa-solid fa-image me-2"></i> Resmi güncelle
                                            </button>

                                            {/* Modal */}
                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Resim ekle</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="mb-3">
                                                    <label htmlFor="formFileSm" className="form-label">Lütfen bir fotoğraf yükleyiniz</label>
                                                    <input className="form-control form-control-md" id="formFileSm" type="file" />
                                                    </div>
                                                    <small>Seçeceğiniz fotoğraf 5MB'dan küçük ve .jpeg ya da .png uzantılı olmalıdır.</small>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Iptal</button>
                                                    <button type="button" className="btn btn-primary btn-sm">Fotoğrafı güncelle</button>
                                                </div>
                                                </div>
                                            </div>
                                            </div>

                                            {/* END ADD IMAGE */}
                                    </div>
                                    <div className="card-body pt-0 pb-3">
                                        <div className="row">
                                        <div className="col">
                                            <div className="card-profile-stats d-flex justify-content-center">
                                            <div>
                                                <span className="heading">22</span>
                                                <span className="description">Hesap görüntüleme</span>
                                            </div>
                                            <div>
                                                <span className="heading">2</span>
                                                <span className="description">Oluşturulan talep</span>
                                            </div>
                                            <div>
                                                <span className="heading">0</span>
                                                <span className="description">Oluşturulan imkan</span>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="text-center mt-4">
                                        <h6>
                                            <span className="sidebar-name">{user ? capitalizeFirstWords(user.name) + " " + capitalizeFirstWords(user.surname) : ""}</span>
                                        </h6>
                                        <div>
                                            <i className="ni location_pin mr-2"></i><small className="sidebar-province">{user ? capitalizeFirstWords(user.province) : ""}</small>, <small className="sidebar-district">{user ? capitalizeFirstWords(user.district) : ""}</small>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-profile shadow mt-5">
                                    <div className="card-body">
                                    <h5 className="text-center mb-4">Geçmişiniz</h5>

                                    <ol className="list-group list-group-numbered">
                                    <li className="list-group-item mb-1 list-group-item-action list-group-item-primary border-0 d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto">
                                        <div className="fw-bold me-1">Günlük 50 kişiye yemek imkanı</div>
                                        <span>İstanbul</span>/ <span>Tuzla</span>
                                        </div>
                                        <span className="badge bg-white text-dark rounded-pill">14</span>
                                    </li>
                                    <li className="list-group-item mb-1 list-group-item-action list-group-item-primary border-0 d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto">
                                        <div className="fw-bold me-1">Günlük ücretsiz konaklama imkanı</div>
                                        <span>Ankara</span>/ <span>Kızılay</span>
                                        </div>
                                        <span className="badge bg-white text-dark rounded-pill">14</span>
                                    </li>
                                    <li className="list-group-item mb-1 list-group-item-action list-group-item-danger border-0 d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto">
                                        <div className="fw-bold me-1">Öğrenci burs talebi</div>
                                        <span>Eskişehir</span>/ <span>İnönü</span>
                                        </div>
                                        <span className="badge bg-white text-dark rounded-pill">14</span>
                                    </li>
                                    </ol>
                                </div>
                                
                                </div>

                            </div>
                            <div className="col-xl-8 order-xl-1">
                                <div className="card bg-secondary shadow">
                                    <div className="card-header bg-white border-0">
                                        <div className="d-flex flex-wrap align-items-center">
                                        <div className="col-8">
                                            <h3 className="mb-0 ps-1">Hesap Bilgileri</h3>
                                        </div>
                                        <div className="col-4 text-end">
                                            <Link to="/ayarlar" className="btn btn-sm btn-primary">Ayarlar</Link>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <h6 className="text-muted ms-1 mb-4">Kullanıcı Bilgileri</h6>
                                            <div className="pl-lg-4">
                                                <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group focused">
                                                    <label className="form-control-label ps-1" htmlFor="input-first-name">İsim</label>
                                                    <input type="text" id="input-first-name" className="form-control form-control-alternative" placeholder="İsim" value={user ? capitalizeFirstWords(user.name) : ""} readOnly={readOnly} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group focused">
                                                    <label className="form-control-label ps-1" htmlFor="input-last-name">Soyisim</label>
                                                    <input type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Soyisim" value={user ? capitalizeFirstWords(user.surname) : ""} readOnly={readOnly} />
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group focused">
                                                    <label className="form-control-label ps-1" htmlFor="input-tel">Telefon</label>
                                                    <input type="tel" id="input-tel" className="form-control form-control-alternative" placeholder="Telefon" value={user ? user.phone : ""} readOnly={readOnly} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                    <label className="form-control-label ps-1" htmlFor="input-email">Email address</label>
                                                    <input type="email" id="input-email" className="form-control form-control-alternative" placeholder="Gmail" value={user ? user.email : ""} readOnly={readOnly} />
                                                    </div>
                                                </div>
                                                </div>
                                            </div>

                                            <hr className="mt-2 mb-4" />
                                            <h6 className="heading-small text-muted mb-4">İletişim Bilgileri</h6>
                                            <div className="pl-lg-4">
                                                <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group focused">
                                                    <label className="form-control-label ps-1" htmlFor="input-address">Adres</label>
                                                    <input id="input-address" className="form-control form-control-alternative" placeholder="Adresin" value={user ? capitalizeFirstWords(user.street) : ""} type="text" readOnly={readOnly} />
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="row">
                                                <div className="col-lg-4">
                                                    <div className="form-group focused">
                                                    <label className="form-control-label ps-1" htmlFor="input-city">İl</label>
                                                    <input type="text" id="input-city" className="form-control form-control-alternative" placeholder="İl" value={user ? capitalizeFirstWords(user.province) : ""} readOnly={readOnly} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group focused">
                                                    <label className="form-control-label ps-1" htmlFor="input-country">İlçe</label>
                                                    <input type="text" id="input-country" className="form-control form-control-alternative" placeholder="İlçe" value={user ? capitalizeFirstWords(user.district) : ""} readOnly={readOnly} />
                                                    </div>
                                                </div>
                                                </div>
                                            </div>

                                            <hr className=" mt-2 mb-4" />
                                            <h6 className="heading-small text-muted mb-4">Hakkımda</h6>
                                            <div className="pl-lg-4">
                                                <div className="form-group focused">
                                                    <textarea rows="4" className="form-control form-control-alternative" placeholder="Hakkınızda bilgi giriniz." readOnly={readOnly}></textarea>
                                                </div>
                                            </div>

                                            <button className='btn btn-primary text-white btn-sm' disabled={readOnly}>Kaydet</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
    )
}

export default Profile