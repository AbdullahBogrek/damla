import { useState } from 'react'
import { useFormik } from 'formik'

import validationSchema from './validations'
import { fetchLatAndLng, postTalep } from '../../Api'
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
            job: "",
            income: "",
            phone: "",
            email: "",
            province: "",
            district: "",
            street: "", 
            positions: {}
        },
        validationSchema,
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

            await postTalep(values)
            console.log("Talep Kaydedildi.")

        }
    })

    return (
        <div className='talep-modal'>
        
            {/* <!-- TALEP EKLE --> */}
            <button type="button" className="btn btn-sm btn-danger px-2 me-2" data-bs-toggle="modal" data-bs-target="#addRequestModel">
                <i className="fa-solid fa-location-dot me-1"></i> Talep ekle
            </button>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="addRequestModel" tabIndex="-1" data-backdrop="false" aria-labelledby="addRequestModelLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addRequestModelLabel">Talep Ekle</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="alert alert-warning help-modal-alert mb-4" role="alert">
                                <i className="fa-solid fa-triangle-exclamation me-2"></i> Talep oluştururken gireceğiniz bilgilerin doğrulu çok önemlidir. Bilgilerinizin yanlışlığı sonucu oluşacak bütün sorunlardan siz sorumlusunuz.
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                {/* <!-- Talep Bilgileri--> */}
                                <div className="row g-2 mb-3">
                                    <h6 className="text-danger">
                                        Talep Bilgileri
                                    </h6>
                                    <div className="form-floating mb-2">
                                        <input type="text" name='title' className="form-control" id="floatingHelpTitle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} placeholder="Yardım talebinizin başlığı açıklayıcı ve basit olmalıdır." required/>
                                        <label htmlFor="floatingHelpTitle">Talep başlığı</label>
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
                                                <option defaultValue>Yardım talebi türü seçiniz.</option>
                                                <option value="iş">İş</option>
                                                <option value="gıda">Gıda</option>
                                                <option value="barınma">Barınma (yurt, ev vb.)</option>
                                                <option value="maddi">Maddi (kira, fatura vb.)</option>
                                                <option value="sağlık">Sağlık (ilaç, sigorta vb. )</option>
                                                <option value="eğitim">Eğitim (burs, taksit, sınav ödemeleri vb. )</option>
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
                                    <div className="form-floating">
                                        <textarea className="form-control" name='description' placeholder="Leave a comment here" id="floatingImkanComment" style={{height: 100}} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description} required></textarea>
                                        <label htmlFor="floatingHelpComment">Açıklama</label>
                                        {formik.errors.description && formik.touched.description && (
                                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                                {formik.errors.description}
                                                </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formFileMultiple" className="form-label" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.photos}>Görsel yükleyebilirsiniz.</label>
                                        <input 
                                            className="form-control" 
                                            type="file" 
                                            name='photos' 
                                            id="formFileMultiple" 
                                            multiple
                                        />
                                        {formik.errors.photos && formik.touched.photos && (
                                            <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                            {formik.errors.photos}
                                            </div>
                                        )}    
                                    </div>
                                </div>
                                {/* <!-- Talep Sahibi Bilgileri--> */}
                                <div className="row g-2 mb-3">
                                    <h6 className="text-danger">
                                        Talep Sahibi
                                    </h6>
                                    <div className="col-md">
                                        <div className="form-floating mb-2">
                                            <select className="form-select" id="floatingSelectHelpJob" name='job' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.job} required>
                                            <option defaultValue> Mesleğinizi seçiniz.</option>
                                            <option value="doktor">Doktor</option>
                                            <option value="hemşire">Hemşire</option>
                                            <option value="mühendis">Mühendis</option>
                                            <option value="memur">Memur</option>
                                            <option value="işçi">İşçi</option>
                                            <option value="öğrenci">Öğrenci</option>
                                            </select>
                                            <label htmlFor="floatingSelectHelpJob">Meslek</label>
                                            {formik.errors.job && formik.touched.job && (
                                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                                {formik.errors.job}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating mb-2">
                                            <select className="form-select" id="floatingSelectHelpIncome" name='income' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.income} required>
                                            <option defaultValue>Aylık gelirinizi seçiniz.</option>
                                            <option value="0-500">0-500</option>
                                            <option value="500-1000">500-1000</option>
                                            <option value="1000-2000">1000-2000</option>
                                            <option value="2000-4000">2000-4000</option>
                                            <option value="4000-6000">4000-6000</option>
                                            <option value="6000 ve üzeri">6000 ve üzeri</option>
                                            </select>
                                            <label htmlFor="floatingSelectHelpIncome">Aylık Gelir</label>
                                            {formik.errors.income && formik.touched.income && (
                                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                                {formik.errors.income}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="input-group mb-2">
                                        <span className="input-group-text p-3" id="help-phone-area-code"><img className="my-1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/800px-Flag_of_Turkey.svg.png?20210808085121" alt="turkey flag" height="15" width="22" /></span>
                                        <input type="phone" className="form-control d-block" placeholder="5XX XXX XX XX" name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} aria-label="Phone" aria-describedby="basic-addon1" style={{height: "60px"}} required/>
                                        {formik.errors.phone && formik.touched.phone && (
                                            <div className="bg-danger rounded-bottom text-sm-center d-flex align-items-center px-5 text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                            {formik.errors.phone}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-floating mb-1">
                                        <input type="email" className="form-control" id="floatingHelpEmail" name='email' placeholder="name@example.com" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} required/>
                                        <label htmlFor="floatingHelpEmail">Email</label>
                                        {formik.errors.email && formik.touched.email && (
                                            <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                            {formik.errors.email}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* <!-- Talep Adresi Bilgileri--> */}
                                <div className="row g-2 mb-3">
                                    <h6 className="text-danger">
                                        Talep Adresi
                                    </h6>
                                    {/* Province Input */}
                                    <div className="col-md">
                                        <div className="form-floating mb-3">
                                        <select
                                            className="form-select"
                                            value={province} 
                                            onChange={(e) => setProvince(e.target.value)}
                                            name="province"
                                            id="floatingProvinceSelect"
                                            aria-label="Floating label select"
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
                                        <label htmlFor="floatingProvinceSelect">İl</label>
                                        {formik.errors.province && formik.touched.province && (
                                            <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                            {formik.errors.province}
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                    {/* District Input */}
                                    <div className="col-md">
                                        <div className="form-floating mb-3">
                                        <select
                                            className="form-select"
                                            onChange={(e) => setDistrict(e.target.value)}
                                            value={district}
                                            name="district"
                                            id="floatingprovinceSelect"
                                            aria-label="Floating label select"
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
                                        <label htmlFor="floatingprovinceSelect">İlçe</label>
                                        {formik.errors.district && formik.touched.district && (
                                            <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                            {formik.errors.district}
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floatingSelectHelpStreet" name='street' placeholder="Yardım talebinizi giriniz." onChange={(e) => setStreet(e.target.value)} onBlur={formik.handleBlur} value={street} required/>
                                        <label htmlFor="floatingSelectHelpStreet">Cadde / Sokak / Mahalle</label>
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
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckHelp1" required/>
                                        <label className="form-check-label map-modal-check" htmlFor="flexCheckHelp1">
                                            Verilerin doğruluğunu onaylıyorum.
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckHelp2" required/>
                                        <label className="form-check-label map-modal-check" htmlFor="flexCheckHelp2">
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
                                    <button type="close" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Kapat</button>
                                    <button type="submit" className="btn btn-sm btn-danger">Talep Oluştur</button>
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