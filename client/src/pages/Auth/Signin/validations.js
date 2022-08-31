import * as yup from "yup";

const validations = yup.object().shape({
    email: yup.string().email("Geçerli bir email adresi giriniz.").required("Bu alan zorunludur."),
    password: yup.string().min(8, "Parolanız en az 8 karakterden oluşmalıdır.").required(),
})

export default validations;