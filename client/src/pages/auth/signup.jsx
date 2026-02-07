import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '@/contexts/auth-context'
import { fetchRegister } from '@/lib/api'
import adres from '@/data/turkiye.json'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AlertTriangle, UserPlus, ArrowLeft, ArrowRight, Check } from 'lucide-react'

const stepTitles = ['Kişisel Bilgiler', 'İletişim', 'Adres', 'Onay']

const validationSchemas = [
  Yup.object({
    name: Yup.string().required('Ad zorunludur'),
    surname: Yup.string().required('Soyad zorunludur'),
    email: Yup.string().email('Geçerli bir email giriniz').required('Email zorunludur'),
    password: Yup.string().min(8, 'Şifre en az 8 karakter olmalıdır').required('Şifre zorunludur'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
      .required('Şifre tekrarı zorunludur'),
  }),
  Yup.object({
    phone: Yup.string().min(10, 'Telefon 10 haneli olmalıdır').max(10).required('Telefon zorunludur'),
    birthday: Yup.string().required('Doğum tarihi zorunludur'),
    gender: Yup.string().required('Cinsiyet seçimi zorunludur'),
  }),
  Yup.object({}),
  Yup.object({
    terms: Yup.boolean().oneOf([true], 'Kullanım şartlarını kabul etmelisiniz'),
  }),
]

export default function SignUp() {
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      birthday: '',
      gender: '',
      street: '',
      terms: false,
    },
    validationSchema: validationSchemas[step],
    onSubmit: async (values) => {
      if (step < 3) {
        setStep(step + 1)
        return
      }

      setError('')
      try {
        const { passwordConfirm, ...registerData } = values
        const data = await fetchRegister({
          ...registerData,
          province,
          district,
        })
        login(data)
        navigate('/profil')
      } catch (err) {
        setError(err.response?.data?.message || 'Kayıt başarısız. Lütfen tekrar deneyin.')
      }
    },
  })

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="name">Ad</Label>
                <Input id="name" name="name" placeholder="Adınız" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                {formik.errors.name && formik.touched.name && <p className="text-xs text-destructive">{formik.errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Soyad</Label>
                <Input id="surname" name="surname" placeholder="Soyadınız" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.surname} />
                {formik.errors.surname && formik.touched.surname && <p className="text-xs text-destructive">{formik.errors.surname}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="ornek@email.com" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
              {formik.errors.email && formik.touched.email && <p className="text-xs text-destructive">{formik.errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
              {formik.errors.password && formik.touched.password && <p className="text-xs text-destructive">{formik.errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Şifre Tekrarı</Label>
              <Input id="passwordConfirm" name="passwordConfirm" type="password" placeholder="••••••••" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordConfirm} />
              {formik.errors.passwordConfirm && formik.touched.passwordConfirm && <p className="text-xs text-destructive">{formik.errors.passwordConfirm}</p>}
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" name="phone" placeholder="5XX XXX XX XX" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
              {formik.errors.phone && formik.touched.phone && <p className="text-xs text-destructive">{formik.errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthday">Doğum Tarihi</Label>
              <Input id="birthday" name="birthday" type="date" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.birthday} />
              {formik.errors.birthday && formik.touched.birthday && <p className="text-xs text-destructive">{formik.errors.birthday}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Cinsiyet</Label>
              <select id="gender" name="gender" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.gender}>
                <option value="">Seçiniz</option>
                <option value="erkek">Erkek</option>
                <option value="kadın">Kadın</option>
                <option value="belirtmek istemiyorum">Belirtmek İstemiyorum</option>
              </select>
              {formik.errors.gender && formik.touched.gender && <p className="text-xs text-destructive">{formik.errors.gender}</p>}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>İl</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring" value={province} onChange={(e) => { setProvince(e.target.value); setDistrict('') }}>
                  <option value="">İl seçiniz</option>
                  {Object.keys(adres).map(il => <option key={il} value={il}>{il}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label>İlçe</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring" value={district} onChange={(e) => setDistrict(e.target.value)} disabled={!province}>
                  <option value="">İlçe seçiniz</option>
                  {province && adres[province]?.map(ilce => <option key={ilce} value={ilce}>{ilce}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="street">Sokak / Mahalle</Label>
              <Input id="street" name="street" placeholder="Cadde / Sokak / Mahalle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.street} />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4 text-sm">
              <h4 className="font-medium text-foreground">Bilgileriniz</h4>
              <div className="mt-3 space-y-1 text-muted-foreground">
                <p>{formik.values.name} {formik.values.surname}</p>
                <p>{formik.values.email}</p>
                <p>{formik.values.phone}</p>
                {province && <p>{district}, {province}</p>}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-input"
                onChange={formik.handleChange}
                checked={formik.values.terms}
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed text-muted-foreground">
                Kullanım şartlarını ve gizlilik politikasını okudum, kabul ediyorum.
              </Label>
            </div>
            {formik.errors.terms && formik.touched.terms && <p className="text-xs text-destructive">{formik.errors.terms}</p>}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
            <UserPlus className="h-6 w-6 text-brand-600" />
          </div>
          <CardTitle className="text-2xl">Kayıt Ol</CardTitle>
          <CardDescription>{stepTitles[step]} — Adım {step + 1}/4</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Step indicator */}
          <div className="mb-6 flex gap-1">
            {stepTitles.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= step ? 'bg-brand-500' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {renderStep()}

            <Separator />

            <div className="flex gap-3">
              {step > 0 && (
                <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Geri
                </Button>
              )}
              <Button
                type="submit"
                className={`flex-1 bg-brand-500 hover:bg-brand-600 ${step === 0 ? 'w-full' : ''}`}
                disabled={formik.isSubmitting}
              >
                {step < 3 ? (
                  <>
                    İleri
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : formik.isSubmitting ? (
                  'Kayıt yapılıyor...'
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Kayıt Ol
                  </>
                )}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Zaten hesabınız var mı?{' '}
            <Link to="/giris" className="font-medium text-brand-600 hover:text-brand-500">
              Giriş Yap
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
