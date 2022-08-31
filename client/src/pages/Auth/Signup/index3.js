import { useFormik } from "formik";

import validationSchema from "./validations";

function SignUp() {
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      birthday: "",
      gender: "",
      phone: "",
      province: "",
      district: "",
      street: "",
      terms: true,
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
  });

  return (
    <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-10 col-lg-7">
                <div className="pt-4 pb-3 text-center">
                    <h2>Hesap oluştur</h2>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10 px-5 py-3">
                    {/* Google and Facebook Buttons */}
                    <div className="d-grid gap-2 d-flex justify-content-center">
                        <button className="google-button w-50 btn border d-flex justify-content-center align-items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="me-2 bi bi-google"
                            viewBox="0 0 16 16"
                        >
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                        </svg>{" "}
                        ile kayıt ol.
                        </button>
                        <button className="facebook-button w-50 btn border   d-flex justify-content-center align-items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="me-2 bi bi-facebook"
                            viewBox="0 0 16 16"
                        >
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                        </svg>{" "}
                        ile kayıt ol.
                        </button>
                    </div>

                    {/* Or  */}
                    <div className="or-container">
                        <div className="line-separator"></div>
                        <div className="or-label">ya da</div>
                        <div className="line-separator"></div>
                    </div>

                    {/* User From  */}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row g-2">
                        {/* Name Input */}
                        <div className="col-sm-6">
                            <div className="form-floating mb-3">
                            <input
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                name="name"
                                className="form-control"
                                id="floatingNameInput"
                                placeholder="Lütfen isminizi giriniz."
                                
                            />
                            <label htmlFor="floatingNameInput">İsim</label>

                            {formik.errors.name && formik.touched.name && (
                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                {formik.errors.name}
                                </div>
                            )}
                            </div>
                        </div>
                        {/* Surname Input */}
                        <div className="col-sm-6">
                            <div className="form-floating mb-3">
                            <input
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.surname}
                                name="surname"
                                className="form-control"
                                id="floatingSurnameInput"
                                placeholder="Lütfen soyisminizi giriniz."
                                
                            />
                            <label htmlFor="floatingSurnameInput">Soyisim</label>

                            {formik.errors.surname && formik.touched.surname && (
                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                {formik.errors.surname}
                                </div>
                            )}
                            </div>
                        </div>
                        {/* Email Input */}
                        <div className="col-12">
                            <div className="form-floating mb-3">
                            <input
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                name="email"
                                className="form-control"
                                id="floatingEmailInput"
                                placeholder="name@example.com"
                                
                            />
                            <label htmlFor="floatingEmailInput">Email</label>

                            {formik.errors.email && formik.touched.email && (
                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                {formik.errors.email}
                                </div>
                            )}
                            </div>
                        </div>
                        {/* Password Input */}
                        <div className="col-sm-6 mb-3">
                            <div className="form-floating">
                            <input
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                name="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Lütfen şifrenizi giriniz."
                                
                            />
                            <label htmlFor="floatingPassword">Şifreniz</label>

                            {formik.errors.password && formik.touched.password && (
                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                {formik.errors.password}
                                </div>
                            )}
                            </div>
                        </div>
                        {/* Password Conf Input */}
                        <div className="col-sm-6 mb-3">
                            <div className="form-floating">
                            <input
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.passwordConfirm}
                                name="passwordConfirm"
                                className="form-control"
                                id="floatingConfPassword"
                                placeholder="Lütfen şifrenizi tekrardan giriniz."
                                
                            />
                            <label htmlFor="floatingConfPassword">
                                Şifrenizi tekrardan giriniz.
                            </label>

                            {formik.errors.passwordConfirm &&
                                formik.touched.passwordConfirm && (
                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                    {formik.errors.passwordConfirm}
                                </div>
                                )}
                            </div>
                        </div>
                        {/* Birthday Input */}
                        <div className="col-sm-6">
                            <div className="form-floating mb-3">
                            <input
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.birthday}
                                name="birthday"
                                className="form-control"
                                id="floatingDateInput"
                                placeholder="Lütfen doğum tarihinizi giriniz."
                                
                            />
                            <label htmlFor="floatingDateInput">Doğum Tarihi</label>
                            {formik.errors.birthday && formik.touched.birthday && (
                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                {formik.errors.birthday}
                                </div>
                            )}
                            </div>
                        </div>
                        {/* Gender Input */}
                        <div className="col-sm-6">
                            <div className="form-floating mb-3">
                            <select
                                className="form-select"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.gender}
                                name="gender"
                                id="floatingGenderSelect"
                                aria-label="Floating label select"
                                
                            >
                                <option defaultValue disabled value="">
                                Lütfen bir cinsiyet seçiniz.
                                </option>
                                <option value="1">Kadın</option>
                                <option value="2">Erkek</option>
                            </select>
                            <label htmlFor="floatingGenderSelect">Cinsiyet</label>
                            {formik.errors.gender && formik.touched.gender && (
                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                {formik.errors.gender}
                                </div>
                            )}
                            </div>
                        </div>
                        {/* Phone Input */}
                        <div className="col-12">
                            <div className="form-floating mb-3">
                                
                            <input
                                type="tel"
                                className="form-control"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                name="phone"
                                id="floatingTelInput"
                                placeholder="XXXX-XXX-XX-XX"
                                
                            />
                            <label htmlFor="floatingTelInput">Telefon</label>
                            {formik.errors.phone && formik.touched.phone && (
                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                {formik.errors.phone}
                                </div>
                            )}
                            </div>
                        </div>
                        {/* Province Input */}
                        <div className="col-sm-6">
                            <div className="form-floating mb-3">
                            <select
                                className="form-select"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.province}
                                name="province"
                                id="floatingProvinceSelect"
                                aria-label="Floating label select"
                                
                            >
                                <option defaultValue disabled value="">
                                Lütfen yaşadığınız ili seçiniz.
                                </option>
                                <option value="1">İstanbul</option>
                                <option value="2">Ankara</option>
                                <option value="3">Eskişehir</option>
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
                        <div className="col-sm-6">
                            <div className="form-floating mb-3">
                            <select
                                className="form-select"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.district}
                                name="district"
                                id="floatingprovinceSelect"
                                aria-label="Floating label select"
                                
                            >
                                <option defaultValue disabled value="">
                                Lütfen yaşadığınız ilçeyi seçiniz.
                                </option>
                                <option value="1">Tuzla</option>
                                <option value="2">Maltepe</option>
                                <option value="3">Kadıköy</option>
                            </select>
                            <label htmlFor="floatingprovinceSelect">İlçe</label>
                            {formik.errors.district && formik.touched.district && (
                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                {formik.errors.district}
                                </div>
                            )}
                            </div>
                        </div>
                        {/* Street Input */}
                        <div className="col-12">
                            <div className="form-floating">
                            <input
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.street}
                                name="street"
                                className="form-control"
                                id="floatingStreetInput"
                                placeholder="Lütfen evinizin adresini yazınız."
                                
                            />
                            <label htmlFor="floatingStreetInput">
                                Semt / Mahalle / Sokak
                            </label>
                            {formik.errors.street && formik.touched.street && (
                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                {formik.errors.street}
                                </div>
                            )}
                            </div>
                        </div>
                        {/* Term of Services and Privacy Policy Check */}
                        <div className="form-check mb-3 mt-4 ms-1">
                            <input
                            type="checkbox"
                            className="form-check-input"
                            id="servicesAndPolicy"
                            
                            />
                            <label
                            className="form-check-label"
                            htmlFor="servicesAndPolicy"
                            >
                            <a href="/">Hizmet şartları</a> ve{" "}
                            <a href="/">Gizlilik Politikasını</a> kabul ediyorum.
                            </label>
                            {formik.errors.terms && formik.touched.terms && (
                                <div className="bg-danger rounded-bottom text-sm-center text-dark bg-opacity-25 text-danger" style={{fontSize: '13px'}}>
                                    {formik.errors.terms}
                                </div>
                            )}
                        </div>
                        {/* Submit Button */}
                        <div className="col-12 text-center">
                            <button
                            className="w-100 btn btn-warning btn-md mb-4"
                            type="submit"
                            >
                            Kayıt ol
                            </button>
                            <h6>
                            Zaten bir hesabın var mı?{" "}
                            <a href="/templates/signIn.html">Giriş yap</a>
                            </h6>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SignUp;
