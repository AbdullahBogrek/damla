import React from "react";
import { Link } from "react-router-dom";
import './settings.css'

function Settings() {
  return (
    <div>
      <div className="position-relative mb-5">
        {/* Header */}
        <div className="position-relative pb-8 pt-lg-1 d-flex align-items-center">
          {/* Header container */}
          <div className="container d-flex align-items-center">
            <div className="row">
              <div className="col-lg-7 col-md-10 mt-5">
                <h1 className="display-2 text-dark">Ayarlar</h1>
                <p className="text-dark mb-5">
                  Uygulama izinlerini düzenleyebilir, şifrenizi değiştirebilir,
                  hesabınızı silebebilirsiniz. Lütfen bu sayfada yapacağınız
                  değişikliklere dikkat ediniz.
                </p>
                <a href="#!" className="btn btn-primary text-white">
                  Şifremi değiştir
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Page content */}
        <div className="container mt--7">
          <div className="row">
            <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
              <div className="card card-profile shadow">
                <div className="card-body mt-2 mb-4">
                  <div className="text-center mb-3">
                    <span>Hızlı Ayarlar</span>
                  </div>
                  <div className="row">
                    <div className="col"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 order-xl-1">
              <div className="card bg-secondary shadow">
                <div className="card-header bg-white border-0">
                  <div className="d-flex flex-wrap align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0 ps-1">Uygulama ayarları</h3>
                    </div>
                    <div className="col-4 text-end">
                      <Link
                        to="/profil"
                        className="btn btn-sm btn-primary"
                      >
                        Profile Dön
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    {/* Notification */}
                    <h6 className="text-muted ms-1 mb-2">Bildirimler</h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="list-group">
                          <div className="list-group-item border-0">
                            <div className="row align-items-center">
                              <div className="col">
                                <strong className="smmall mb-0">
                                  Yeni özellik ve güncellemeler hakkında beni
                                  bilgilendir.
                                </strong>
                                <p className="small text-muted mb-0">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Eius, similique eligendi!
                                </p>
                              </div>
                              <div className="col-auto">
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault1"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexSwitchCheckDefault1"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-group">
                          <div className="list-group-item border-0">
                            <div className="row align-items-center">
                              <div className="col">
                                <strong className="small mb-0">
                                  En son haberler için beni e-posta ile
                                  bilgilendir.
                                </strong>
                                <p className="small text-muted mb-0">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Eius, similique eligendi!
                                </p>
                              </div>
                              <div className="col-auto">
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault2"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexSwitchCheckDefault2"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="mt-2 mb-4" />
                    {/* Security */}
                    <h6 className="heading-small text-muted ms-1 mb-4">
                      Güvenlik
                    </h6>
                    <div className="pl-lg-4 ms-1">
                      <div className="row">
                        <form action="POST">
                          <div className="row mb-2">
                            <div className="col-md-5 mt-1">
                              <div className="form-group">
                                <label
                                  className="text-muted form-control-label"
                                  htmlFor="inputOldPassword"
                                >
                                  Old Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control form-control-alternative"
                                  id="inputOldPassword"
                                />
                              </div>
                              <div className="form-group">
                                <label
                                  className="text-muted form-control-label"
                                  htmlFor="inputNewPassword"
                                >
                                  New Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control form-control-alternative"
                                  id="inputNewPassword"
                                />
                              </div>
                              <div className="form-group">
                                <label
                                  className="text-muted form-control-label"
                                  htmlFor="inputConfirmPassword"
                                >
                                  Confirm Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control form-control-alternative"
                                  id="inputConfirmPassword"
                                />
                              </div>
                            </div>
                            <div className="col-md-7 mt-1">
                              <div className="d-flex flex-column">
                                <div className="password-requirements">
                                  <p className="mb-2">Şifre gereksinimleri</p>
                                  <p className="small text-muted mb-2">
                                    Yeni bir parola oluşturmak için aşağıdaki
                                    gereksinimlerin tümünü karşılamanız gerekir:
                                  </p>
                                  <ul className="small text-muted pl-4 mb-0">
                                    <li>En az 8 karakterden oluşmalıdır</li>
                                    <li>
                                      En az bir tane özel karakter içermelidir
                                    </li>
                                    <li>En az bir sayı içermelidir</li>
                                    <li>
                                      Güncel şifreniz ile aynı olmamalıdır
                                    </li>
                                  </ul>
                                </div>
                                <div className="password-change-btn justify-content-end mt-4">
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-md mt-5"
                                  >
                                    Şifremi değiştir
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="row"></div>
                    </div>
                    <hr className=" mt-2 mb-4" />
                    {/* Hesap */}
                    <h6 className="heading-small text-muted ms-1 mb-4">
                      Hesap
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="list-group">
                          <div className="list-group-item border-0">
                            <div className="row align-items-center">
                              <div className="col">
                                <strong className="smmall mb-0">
                                  Profilimin görüntülenmesine izin ver.
                                </strong>
                                <p className="small text-muted mb-0">
                                  Profilimin diğer kullanıcılar tarafından
                                  görüntülenebilmesine izin veriyorum.
                                </p>
                              </div>
                              <div className="col-auto">
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault3"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexSwitchCheckDefault3"
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="delete-account mt-4">
                          <p className="text-danger">Hesabımı sil</p>
                          {/* Button trigger modal */}

                          <div className="d-grid">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                            >
                              Hesabı sil
                            </button>
                          </div>

                          {/* Modal */}
                          <div
                            className="modal fade"
                            id="staticBackdrop"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            tabIndex="-1"
                            aria-labelledby="staticBackdropLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog" role="document">
                              <div className="modal-content rounded-3 shadow">
                                <div className="modal-body p-4 text-center">
                                  <h5 className="mb-2">
                                    Hesabını silmek istiyor musun?
                                  </h5>
                                  <p className="mb-0">
                                    Hesabınızı silmek üzeresiniz. Silinen hesap
                                    ile birlikte o hesaba ait yardım ve imkan
                                    talepleri de otomatikmen silinecektir.
                                    Hesabınızı silmek isteğinizden emin
                                    misiniz?.
                                  </p>
                                </div>
                                <div className="modal-footer flex-nowrap p-0">
                                  <button
                                    type="button"
                                    className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-end"
                                  >
                                    <strong>Evet, sil</strong>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0"
                                    data-bs-dismiss="modal"
                                  >
                                    İptal
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
