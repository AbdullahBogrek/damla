import React, { Component } from 'react'

import './Stats.css'

export default class Stats extends Component {

  render() {

    return (

      <div>
        <section className="section stats-section gray-bg my-5" id="stats">
          <div className="container">
              <div className="counter">
                  <div className="row">
                      <div className="col-6 col-lg-3">
                          <div className="count-data text-center">
                              <h6 className="count h2" data-to="500" data-speed="500">500</h6>
                              <div className="count-data-label d-flex justify-content-center align-items-center">
                                <i className="fa-solid fa-hand-holding-medical text-danger fa-1x"></i>
                                <p className="m-0px ms-3 font-w-600">Yardım Talebi</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-6 col-lg-3">
                          <div className="count-data text-center">
                              <h6 className="count h2" data-to="150" data-speed="150">150</h6>
                              <div className="count-data-label d-flex justify-content-center align-items-center">
                                <i className="fa-solid fa-hand-holding-hand text-primary fa-1x"></i>
                                <p className="m-0px ms-3 font-w-600">Yardım Imkanı</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-6 col-lg-3">
                          <div className="count-data text-center">
                              <h6 className="count h2" data-to="850" data-speed="850">850</h6>
                              <div className="count-data-label d-flex justify-content-center align-items-center">
                                <i className="fa-solid fa-street-view text-success fa-1x"></i>
                                <p className="m-0px ms-3 font-w-600">Aktif Kullanıcı</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-6 col-lg-3">
                          <div className="count-data text-center">
                              <h6 className="count h2" data-to="190" data-speed="190">190</h6>
                              <div className="count-data-label d-flex justify-content-center align-items-center">
                                <i className="fa-solid fa-eye text-warning fa-1x"></i>
                                <p className="m-0px ms-3 font-w-600">Ziyaret Sayısı</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </section>
      </div>

    )

  }

}
