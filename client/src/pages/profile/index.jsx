import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from 'react-query'
import { useAuth } from '@/contexts/auth-context'
import { updateUser } from '@/lib/api'
import adres from '@/data/turkiye.json'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/layout/page-header'
import { Container } from '@/components/layout/container'
import { Pencil, Settings, HandHelping, Gift, Star, Save, X } from 'lucide-react'

const validationSchema = Yup.object({
  name: Yup.string().required('Ad zorunludur'),
  surname: Yup.string().required('Soyad zorunludur'),
  phone: Yup.string().min(10, 'Telefon 10 haneli olmalıdır').max(10),
  email: Yup.string().email('Geçerli bir email giriniz').required('Email zorunludur'),
})

export default function Profile() {
  const { user, login } = useAuth()
  const [editing, setEditing] = useState(false)
  const [province, setProvince] = useState(user?.province || '')
  const [district, setDistrict] = useState(user?.district || '')

  const mutation = useMutation(
    (values) => updateUser(user._id, values),
    {
      onSuccess: ({ data }) => {
        login(data)
        setEditing(false)
      },
    }
  )

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      surname: user?.surname || '',
      email: user?.email || '',
      phone: user?.phone || '',
      street: user?.street || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutation.mutate({ ...values, province, district })
    },
  })

  const initials = `${user?.name?.[0] || ''}${user?.surname?.[0] || ''}`.toUpperCase()

  const statCards = [
    { icon: HandHelping, label: 'Talepler', value: user?.taleps?.length || 0, color: 'text-red-500 bg-red-50' },
    { icon: Gift, label: 'İmkanlar', value: user?.imkans?.length || 0, color: 'text-blue-500 bg-blue-50' },
    { icon: Star, label: 'Favoriler', value: user?.favorites?.length || 0, color: 'text-amber-500 bg-amber-50' },
  ]

  return (
    <Container className="py-8">
      <PageHeader title="Profil" description="Hesap bilgilerinizi görüntüleyin ve düzenleyin" />

      {/* Profile Header */}
      <Card className="mt-6">
        <CardContent className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:items-start">
          <Avatar className="h-20 w-20 text-2xl">
            <AvatarFallback className="bg-brand-100 text-brand-700">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold">{user?.name} {user?.surname}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Badge variant="secondary">{user?.role === 'admin' ? 'Admin' : 'Kullanıcı'}</Badge>
              {user?.province && <Badge variant="outline">{user.province}</Badge>}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
              {editing ? <X className="mr-2 h-4 w-4" /> : <Pencil className="mr-2 h-4 w-4" />}
              {editing ? 'İptal' : 'Düzenle'}
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/ayarlar">
                <Settings className="mr-2 h-4 w-4" />
                Ayarlar
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {statCards.map(({ icon: Icon, label, value, color }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile Form */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Kişisel Bilgiler</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Ad</Label>
                <Input id="name" name="name" disabled={!editing} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                {formik.errors.name && formik.touched.name && <p className="text-xs text-destructive">{formik.errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Soyad</Label>
                <Input id="surname" name="surname" disabled={!editing} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.surname} />
                {formik.errors.surname && formik.touched.surname && <p className="text-xs text-destructive">{formik.errors.surname}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="p-email">Email</Label>
                <Input id="p-email" name="email" type="email" disabled={!editing} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                {formik.errors.email && formik.touched.email && <p className="text-xs text-destructive">{formik.errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-phone">Telefon</Label>
                <Input id="p-phone" name="phone" disabled={!editing} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
                {formik.errors.phone && formik.touched.phone && <p className="text-xs text-destructive">{formik.errors.phone}</p>}
              </div>
            </div>

            <Separator />

            <h4 className="text-sm font-semibold">Adres</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>İl</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50" disabled={!editing} value={province} onChange={(e) => { setProvince(e.target.value); setDistrict('') }}>
                  <option value="">İl seçiniz</option>
                  {Object.keys(adres).map(il => <option key={il} value={il}>{il}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label>İlçe</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50" disabled={!editing || !province} value={district} onChange={(e) => setDistrict(e.target.value)}>
                  <option value="">İlçe seçiniz</option>
                  {province && adres[province]?.map(ilce => <option key={ilce} value={ilce}>{ilce}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Sokak / Mahalle</Label>
              <Input id="street" name="street" disabled={!editing} placeholder="Cadde / Sokak / Mahalle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.street} />
            </div>

            {editing && (
              <div className="flex justify-end pt-2">
                <Button type="submit" className="bg-brand-500 hover:bg-brand-600" disabled={mutation.isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  {mutation.isLoading ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}
