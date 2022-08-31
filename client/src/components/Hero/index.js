import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Hero.css';
import heroImg from '../../assets/hero-image.png'

export default class Hero extends Component {

  render() {

    return (

      <section className="hero">
          <div className="px-4 pt-5 text-center border-bottom">
              <h1 className="display-4 mb-3 fw-bold"><span className="hero-help">Yardım talep et</span> ya da <span className="hero-possibility">yardım et</span></h1>
              <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">Hızlı bir şekilde hesap oluştur ve ihtiyacına göre yardım talebi ya da imkanına göre yardım etme talebi oluştur. Harita üzerinden talebleri takip et. İhtiyaca ya da durumuna göre talep sahipleri ile hızlıca iletişime geç. </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                  <Link to="/kayit" type="button" className="btn hero-sign-up-btn btn-md px-4 me-sm-3">Kayıt Ol</Link>
                  <Link to="/giris" className="btn hero-sign-in-btn btn-outline-success btn-md px-4">Giriş Yap</Link>
                </div>
              </div>
              <div className="overflow-hidden hero-img">
                <div className="container px-5">
                  <img src={heroImg} className="img-fluid border rounded-3 shadow-lg mb-4" alt="hero" width="700" height="500" />
                </div>
              </div>
          </div>
      </section>

    )

  }

}
