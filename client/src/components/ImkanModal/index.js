import { useState } from 'react'
import { useFormik } from 'formik'

import validations from './validations'
import { fetchLatAndLng, postImkan } from '../../Api'
import adres from "../turkiye.json"

import "./style.css"

function MapTool() {

    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [street, setStreet] = useState("")

    const formik = useFormik({
        initialValues: {
            title: "",
            kind: "",
            description: "",
            fromWho: "",
            phone: "",
            email: "",
            province: "",
            district: "",
            street: "", 
            positions: {}
        },
        validations,
        onSubmit: async (values, bag) => {
            values.province = province
            const input = {
                street,
                province,
                district
            }

            const response = await fetchLatAndLng(input)
            values.positions = response.results[0].geometry.location
            values.province = province
            values.district = district
            values.street = street

            await postImkan(values)
            console.log("Imkan Kaydedildi.")

        }
    })

    return (
        <div className='imkan-modal'>
        
            {/* <!-- İMKAN EKLE --> */}
            <button type="button" className="btn btn-sm btn-primary px-2 me-2" data-bs-toggle="modal" data-bs-target="#addOppurtunityModel">
                <i className="fa-solid fa-location-dot me-1"></i> İmkan ekle
            </button>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="addOppurtunityModel" tabIndex="-1" aria-labelledby="addOppurtunityModelLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addOppurtunityModelLabel">İmkan Ekle</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="alert alert-warning help-modal-alert mb-4" role="alert">
                                <i className="fa-solid fa-triangle-exclamation me-2"></i> İmkan oluştururken gireceğiniz bilgilerin doğrulu çok önemlidir. Bilgilerinizin yanlışlığı sonucu oluşacak bütün sorunlardan siz sorumlusunuz.
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                {/* <!-- İmkan Bilgileri--> */}
                                <div className="row g-2 mb-3">
                                    <h6 className="text-primary">
                                        İmkan Bilgileri
                                    </h6>
                                    <div className="form-floating mb-2">
                                        <input type="text" name='title' className="form-control" id="floatingImkanTitle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} placeholder="Yardım talebinizin başlığı açıklayıcı ve basit olmalıdır." required/>
                                        <label htmlFor="floatingImkanTitle">İmkan başlığı</label>
                                        {formik.errors.title && formik.touched.title && (
                                            <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                            {formik.errors.title}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating mb-2">
                                            <select 
                                                className="form-select" 
                                                name='kind' 
                                                id="floatingSelectHelpType" 
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur} 
                                                value={formik.values.kind}
                                                required
                                            >
                                                <option defaultValue>Yardım imkanı türü seçiniz.</option>
                                                <option value="iş">İş</option>
                                                <option value="gıda">Gıda</option>
                                                <option value="barınma">Barınma (yurt, ev vb.)</option>
                                                <option value="maddi">Maddi (kira, fatura vb.)</option>
                                                <option value="sağlık">Sağlık (ilaç, sigorta vb. )</option>
                                                <option value="eğitim">Eğitim (burs, taksit, sınav ödemesi vb. )</option>
                                                <option value="diğer">Diğer</option>
                                            </select>
                                            <label htmlFor="floatingSelectHelpType">Talep türü</label>
                                            {formik.errors.kind && formik.touched.kind && (
                                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                                {formik.errors.kind}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <textarea className="form-control" name='description' placeholder="Leave a comment here" id="floatingImkanComment" style={{height: 100}} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description} required></textarea>
                                        <label htmlFor="floatingImkanComment">Açıklama</label>
                                        {formik.errors.description && formik.touched.description && (
                                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                                {formik.errors.description}
                                                </div>
                                        )}
                                    </div>
                                </div>
                                {/* <!-- İmkan Sahibi Bilgileri--> */}
                                <div className="row g-2 mb-3">
                                    <h6 className="text-primary">
                                        İmkan Sahibi
                                    </h6>
                                    <div className="col-md">
                                        <div className="form-floating mb-2">
                                            <select 
                                                className="form-select" 
                                                id="floatingSelectOpptWho"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur} 
                                                value={formik.values.fromWho}
                                                name="fromWho"
                                                required
                                            >
                                                <option defaultValue>Yardımı kim yapmakta ?</option>
                                                <option value="şahıs">Şahis</option>
                                                <option value="vakıf">Vakıf</option>
                                                <option value="kurum">Kurum</option>
                                            </select>
                                            <label htmlFor="floatingSelectOpptWho">Yardım eden seç</label>
                                            {formik.errors.fromWho && formik.touched.fromWho && (
                                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                                {formik.errors.fromWho}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="input-group mb-2">
                                        <span className="input-group-text p-3" id="oppt-phone-area-code"><img className="my-1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/800px-Flag_of_Turkey.svg.png?20210808085121" alt="turkey flag" height="15" width="22"/></span>
                                        <input type="phone" className="form-control" placeholder="5XX XXX XX XX" name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} aria-label="Phone" aria-describedby="basic-addon1" style={{height: "60px"}} required />
                                        {formik.errors.phone && formik.touched.phone && (
                                            <div className="bg-danger rounded-bottom text-sm-center text-dark d-flex align-items-center px-5 bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                            {formik.errors.phone}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-floating mb-1">
                                        <input type="email" className="form-control" id="floatingOpptEmail" name='email' placeholder="name@example.com" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} required/>
                                        <label htmlFor="floatingOpptEmail">Email</label>
                                        {formik.errors.email && formik.touched.email && (
                                            <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                            {formik.errors.email}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* <!-- İmkan Adresi Bilgileri--> */}
                                <div className="row g-2 mb-3">
                                    <h6 className="text-primary">
                                        İmkan Adresi
                                    </h6>
                                    <div className="col-md">
                                        <div className="form-floating mb-2">
                                            <select 
                                                className="form-select" 
                                                id="floatingSelectOpptProvince" 
                                                name='province' 
                                                onChange={(e) => setProvince(e.target.value)} 
                                                value={province}
                                                required
                                            >
                                                <option defaultValue>
                                                Lütfen yaşadığınız ili seçiniz.
                                                </option>
                                                {
                                                    Object.keys(adres).map((il, key) => {
                                                        return (<option value={il} key={key}>{il}</option>)
                                                    })
                                                }
                                            </select>
                                            <label htmlFor="floatingSelectOpptProvince">İl</label>
                                            {formik.errors.province && formik.touched.province && (
                                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                                {formik.errors.province}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating mb-2">
                                            <select 
                                                className="form-select" 
                                                id="floatingSelectOpptDistrict" 
                                                name='district' 
                                                onChange={(e) => setDistrict(e.target.value)} 
                                                value={district}
                                                required
                                            >
                                                <option defaultValue disabled value="">
                                                Lütfen yaşadığınız ilçeyi seçiniz.
                                                </option>
                                                {
                                                    province ? adres[province].map((ilce, key) => {
                                                    return (<option value={ilce} key={key}>{ilce}</option>)
                                                    })
                                                    : null
                                                }
                                            </select>
                                            <label htmlFor="floatingSelectOpptDistrict">İlçe</label>
                                            {formik.errors.district && formik.touched.district && (
                                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                                {formik.errors.district}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floatingSelectOpptStreet" placeholder="Yardım imkanınızı giriniz." name='street' onChange={(e) => setStreet(e.target.value)} onBlur={formik.handleBlur} value={street} required/>
                                        <label htmlFor="floatingSelectOpptStreet">Cadde / Sokak / Mahalle</label>
                                        {formik.errors.street && formik.touched.street && (
                                            <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                            {formik.errors.street}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* <!-- Doğrulama --> */}
                                <div className="row g-2 my-3 ps-2">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault3" required/>
                                        <label className="form-check-label map-modal-check" htmlFor="flexCheckDefault3">
                                            Verilerin doğruluğunu onaylıyorum.
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault4" required/>
                                        <label className="form-check-label map-modal-check" htmlFor="flexCheckDefault4">
                                            Verilerin, talep sahibi ile iletişime geçmek isteyenlerle paylaşılmasını onaylıyorum.
                                        </label>
                                    </div>
                                </div>
                                {/* Error Alert */}
                                <div>
                                    {
                                        formik.errors.general && (
                                            <div className="alert alert-danger mb-2" role="alert">
                                            { formik.errors.general }
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Kapat</button>
                                    <button type="submit" className="btn btn-sm btn-primary">İmkan Oluştur</button>
                                </div>
                            </form>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default MapTool