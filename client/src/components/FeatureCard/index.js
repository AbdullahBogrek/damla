import React from 'react'
import { Link } from 'react-router-dom'

import './FeatureCard.css'
import featureCardFirstImage from '../../assets/featuratte_1.png'
import featureCardSecondImage from '../../assets/featuratte_2.png'
import featureCardThirdImage from '../../assets/featuratte_3.png'

function FeatureCard() {

  return (

    <div className="container bg-white">
        <div className="row featurette mt-2">
            <div className="col-md-7 px-4">
              <h1 className="featurette-heading mb-3"><span className="text-primary fw-normal">Yardım talebi ya da yardım imkanı oluşturabilmek için hemen</span> <u> <Link className="text-primary " to="/kayit">kayıt ol</Link></u>.</h1>
              <p className="lead">Yapılan yardım taleplerini ve yardım imkanlarını görmek, harita üzerinde durumları incelemek için giriş yapmanız gerekmektedir. Hızlı bir şekilde hesap oluşturarak bu deneyime siz de katılın.</p>
            </div>
            <div className="col-md-5">
                
                <img src={featureCardFirstImage} className="img-fluid" alt="featuratte" height="500" width="500" />

            </div>
        </div>
        <div className="row featurette">
            <div className="col-md-5">
                
                <img src={featureCardSecondImage} className="img-fluid" alt="featuratte" height="500" width="500" />

            </div>
            <div className="col-md-7 px-4">
              <h1 className="featurette-heading mb-3"><span className="text-muted fw-normal">Harita üzerinde paylaşılan yardım <span className='text-danger'>taleplerini</span> ve <span className='text-primary'>imkanlarını</span> incele. </span></h1>
              <p className="lead">Harita üzerindeki talepleri ve imkanları incele, konuma ya da farklı değerlere göre filtreleme yap. Marker'lara tıklayarak daha detaylı bilgi edin.</p>
            </div>
        </div>
        <div className="row featurette">
            <div className="col-md-7 px-4">
              <h1 className="featurette-heading mb-3"><span className="text-success fw-normal">İstediğin hesaplarla iletişime geç ve güvenli bir şekilde bağışta bulun.</span></h1>
              <p className="lead">Oluşturulan yardım taleplerinin ya da imkanların sahipleri ile iletişime geçebilir, profillerini inceleyebilirsiniz. İsteğiniz kullanıcıya bağışta bulunarak destek olabilirsiniz. Bu ve benzeri deneyimleri yaşamak için hemen <a className="text-success" href="/signUp.html">kayıt ol</a>.</p>
            </div>
            <div className="col-md-5">
                
                <img src={featureCardThirdImage} className="img-fluid" alt="featuratte" height="500" width="500" />

            </div>
        </div>
    </div>
  )
  
}

export default FeatureCard