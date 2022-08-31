import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import validationSchema from "./validations";
import { useAuth } from "../../../contexts/AuthContext";
import { fetchLogin } from "../../../Api"

import './SignIn.css';

function SignIn() {

    const history = useNavigate();

    const { login } = useAuth() 

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values, bag) => {
            try{
                const loginResponse = await fetchLogin({
                    email: values.email,
                    password: values.password,
                });

                login(loginResponse)


                history("/profil")

            } catch (e) {
                bag.setErrors({ general: "Email ya da şifre hatalıdır. Lütfen tekrar deneyiniz." });
            }
        },
        validationSchema,
    });


    return (

      <section>
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-md-7 align-items-center">
                    <div className="pt-5 pb-3 text-center">
                        <h2>Giriş Yapın</h2>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-sm-10 col-md-10 col-lg-7 px-5 py-3">

                            {/* Google and Facebook Buttons */}
                            <div className="d-grid gap-2 d-flex justify-content-center">
                                <button className="google-button w-50 btn border d-flex justify-content-center align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2 bi bi-google" viewBox="0 0 16 16">
                                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                                    </svg> ile giriş yap.
                                </button>
                                <button className="facebook-button w-50 btn border d-flex justify-content-center align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2 bi bi-facebook" viewBox="0 0 16 16">
                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                    </svg> ile giriş yap.
                                </button>
                            </div>

                             {/*  Or  */}
                            <div className="or-container">
                                <div className="line-separator"></div>
                                <div className="or-label">ya da</div>
                                <div className="line-separator"></div>
                            </div>

                              {/* User From */}
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row g-2">

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
                                    <div className="col-12 mb-3">
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
                                    
                                    <div>
                                        {
                                            formik.errors.general && (
                                                <div className="alert alert-danger mb-2" role="alert">
                                                { formik.errors.general }
                                                </div>
                                            )
                                        }
                                    </div>

                                    {/* Submit Button */}
                                    <div className="col-12 text-center">
                                        <button
                                        className="w-100 btn btn-warning btn-md mb-4"
                                        type="submit"
                                        >
                                        Giriş Yap
                                        </button>
                                        <h6>
                                        Bir hesabın yok mu?{" "}
                                        <Link to="/kayit">Kayıt ol</Link>
                                        </h6>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

    )

}

export default SignIn;
