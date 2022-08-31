import React from 'react'

import './Footer.css'

function Footer() {

  return (

    <div>

      <div className="container">
        <footer className="row px-3 pt-3 border-top d-flex justify-content-between">
          <div className="col-md-3 py-3 border-bottom">
            <h5>Menü</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Anasayfa</a></li>
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Kayıt Ol</a></li>
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Giriş Yap</a></li>
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Harita</a></li>
            </ul>
          </div>
          
          <div className="col-md-3 py-3 border-bottom">
            <h5>Destek</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Yardım talebi nasıl oluşturulur?</a></li>
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Yardım imkanı nasıl oluşturulur?</a></li>
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Bilgilerimin güvenliği hakkında?</a></li>
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Yaşadığınız sorunu bildirin</a></li>
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">İletişime geçin</a></li>
            </ul>
          </div>
      
          <div className="col-md-3 py-3 border-bottom">
            <h5>Topluluk</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Damla Afet</a></li>
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Damla Sosyal Örgüt</a></li>
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Bize katılın</a></li>
            </ul>
          </div>
      
          <div className="col-md-3 py-3 border-bottom">
            <h5>Hakkımızda</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Damla Nedir?</a></li>
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Basında Damla</a></li>
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Bize destek olun</a></li>
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Yeni özellikler hakkında bilgi</a></li>
            </ul>
          </div>
        </footer>

        <footer className="d-flex flex-wrap justify-content-around align-items-center px-2 py-3">

          <ul className="nav col-md-6 justify-content-start ">
            <li className="nav-item me-3"><a href="/" className="nav-link px-2 text-muted">
              <i className="fa-brands fa-twitter"></i>
            </a></li>
            <li className="nav-item me-3"><a href="/" className="nav-link px-2 text-muted">
              <i className="fa-brands fa-instagram"></i>
            </a></li>
            <li className="nav-item me-3"><a href="/" className="nav-link px-2 text-muted">
              <i className="fa-solid fa-envelope"></i>
            </a></li>
            <li className="nav-item me-3"><a href="/" className="nav-link px-2 text-muted">
              <i className="fa-brands fa-discord"></i>
            </a></li>
            <li className="nav-item me-3"><a href="/" className="nav-link px-2 text-muted">
              <i className="fa-brands fa-github"></i>
            </a></li>
          </ul>
      
          <ul className="nav col-md-6 justify-content-end">
            <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Anasayfa</a></li>
            <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Hakkında</a></li>
            <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">İletişim</a></li>
          </ul>
        
        </footer>

        <footer className="d-flex flex-wrap justify-content-center align-items-center p-3 border-top">
          <p className="mb-0 text-muted">© 2022 tüm hakları saklıdır. <a href="https://github.com/AbdullahBogrek">Abdullah S. Böğrek </a>tarafından bitirme projesi olarak geliştirilmiştir.</p>
        </footer>
      </div>

    </div>
    
  )

}

export default Footer