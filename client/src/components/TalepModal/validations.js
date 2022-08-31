import * as yup from "yup"

const validations = yup.object().shape({
    title: yup.string().min(5, "Lütfen açıklayıcı bir başlık giriniz.").max(60, "Lütfen başlığı kısa ve açıklayıcı yapınız.").required("Bu alan zorunludur."),
    kind: yup.string().required("Bu alan zorunludur."),
    description: yup.string().required("Bu alan zorunludur."),
    job: yup.string().required("Bu alan zorunludur."),
    income: yup.string().required("Bu alan zorunludur."),
    phone: yup.string().min(10, "Lütfen alan kodunu girmeyiniz").max(10, "Lütfen alan kodunu girmeyiniz.").required("Bu alan zorunludur."),
    email: yup.string().email("Geçerli bir email giriniz.").required("Bu alan zorunludur."),
    // province: yup.string().required("Bu alan zorunludur.").nullable(),
    // district: yup.string().required("Bu alan zorunludur.").nullable(),
    // street: yup.string().min(3).required("Bu alan zorunludur.").nullable(),
    // photos: yup
    //     .mixed()
    //     .required("Durumunuzu gösteren boyutu küçük görseller kullanmalısınız.")
    //     .test('fileType', 'Dosya .jpg, .jpeg ve .png uzantılı olmalıdır.', function (value) {
    //         const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
    //         return SUPPORTED_FORMATS.includes(value.type)
    //       })
    //       .test('fileSize', "Görsellerin boyutu 2MB'dan fazla olmamalıdır.", value => {
    //         const sizeInBytes = 2000000;//2MB
    //         return value.size <= sizeInBytes;
    //       }),
    // positions: yup.array().required("Bu alan zorunludur.").nullable(),
})

export default validations