import * as yup from "yup";

const validations = yup.object().shape({
    name: yup.string().min(2, "Lütfen geçerli bir isim giriniz").required("Bu alan zorunludur."),
    surname: yup.string().min(2, "Lütfen geçerli bir soyisim giriniz").required("Bu alan zorunludur."),
    email: yup.string().email("Geçerli bir email adresi giriniz.").required("Bu alan zorunludur."),
    password: yup.string().min(8, "Parolanız en az 8 karakterden oluşmalıdır.").required(),
    passwordConfirm: yup.string().oneOf([yup.ref("password")], "Parolalar uyuşmamaktadır.").required(),
    birthday: yup.date().required("Bu alan zorunludur.").nullable(),
    gender: yup.string().required("Bu alan zorunludur.").nullable(),
    phone: yup.string().min(10, "Lütfen alan kodunu girmeyiniz").max(10, "Lütfen alan kodunu girmeyiniz.").required("Bu alan zorunludur."),
    province: yup.string().nullable(),
    district: yup.string().required("Bu alan zorunludur.").nullable(),
    street: yup.string().min(3).required("Bu alan zorunludur.").nullable(),
    terms: yup.bool().required().oneOf([true], "Lütfen bu alanı onaylayınız."),
})

export default validations;