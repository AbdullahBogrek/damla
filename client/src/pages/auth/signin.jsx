import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '@/contexts/auth-context'
import { fetchLogin } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, LogIn } from 'lucide-react'

const validationSchema = Yup.object({
  email: Yup.string().email('Geçerli bir email giriniz').required('Email zorunludur'),
  password: Yup.string().min(8, 'Şifre en az 8 karakter olmalıdır').required('Şifre zorunludur'),
})

export default function SignIn() {
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      setError('')
      try {
        const data = await fetchLogin(values)
        login(data)
        navigate('/profil')
      } catch (err) {
        setError(err.response?.data?.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.')
      }
    },
  })

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
            <LogIn className="h-6 w-6 text-brand-600" />
          </div>
          <CardTitle className="text-2xl">Giriş Yap</CardTitle>
          <CardDescription>Hesabınıza giriş yaparak devam edin</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ornek@email.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-xs text-destructive">{formik.errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-xs text-destructive">{formik.errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-brand-500 hover:bg-brand-600" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Hesabınız yok mu?{' '}
            <Link to="/kayit" className="font-medium text-brand-600 hover:text-brand-500">
              Kayıt Ol
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
