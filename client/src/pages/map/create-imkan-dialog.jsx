import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from 'react-query'
import { fetchLatAndLng, postImkan } from '@/lib/api'
import adres from '@/data/turkiye.json'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { AlertTriangle } from 'lucide-react'

const validationSchema = Yup.object({
  title: Yup.string().required('Başlık zorunludur'),
  kind: Yup.string().required('Tür seçimi zorunludur'),
  description: Yup.string().required('Açıklama zorunludur'),
  fromWho: Yup.string().required('Yardım eden seçimi zorunludur'),
  phone: Yup.string().min(10, 'Telefon 10 haneli olmalıdır').max(10).required('Telefon zorunludur'),
  email: Yup.string().email('Geçerli bir email giriniz').required('Email zorunludur'),
})

const kindOptions = [
  { value: 'iş', label: 'İş' },
  { value: 'gıda', label: 'Gıda' },
  { value: 'barınma', label: 'Barınma' },
  { value: 'maddi', label: 'Maddi' },
  { value: 'sağlık', label: 'Sağlık' },
  { value: 'eğitim', label: 'Eğitim' },
  { value: 'diğer', label: 'Diğer' },
]

const fromWhoOptions = [
  { value: 'şahıs', label: 'Şahıs' },
  { value: 'vakıf', label: 'Vakıf' },
  { value: 'kurum', label: 'Kurum' },
]

export function CreateImkanDialog({ open, onOpenChange }) {
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [street, setStreet] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation(postImkan, {
    onSuccess: () => {
      queryClient.invalidateQueries('imkans')
      onOpenChange(false)
      formik.resetForm()
      setProvince('')
      setDistrict('')
      setStreet('')
    },
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      kind: '',
      description: '',
      fromWho: '',
      phone: '',
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const addressStr = `${street}, ${district}, ${province}, Türkiye`
      const response = await fetchLatAndLng(addressStr)
      const positions = response.results?.[0]?.geometry?.location || {}

      mutation.mutate({
        ...values,
        province,
        district,
        street,
        positions,
      })
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>İmkan Oluştur</DialogTitle>
        </DialogHeader>

        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>Girdiğiniz bilgilerin doğruluğu çok önemlidir. Yanlış bilgilerden siz sorumlusunuz.</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* İmkan Bilgileri */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-blue-600">İmkan Bilgileri</h4>
            <div className="space-y-2">
              <Label htmlFor="im-title">Başlık</Label>
              <Input id="im-title" name="title" placeholder="Yardım imkanınızın başlığı" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} />
              {formik.errors.title && formik.touched.title && <p className="text-xs text-destructive">{formik.errors.title}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="im-kind">Tür</Label>
              <select id="im-kind" name="kind" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.kind}>
                <option value="">Seçiniz</option>
                {kindOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              {formik.errors.kind && formik.touched.kind && <p className="text-xs text-destructive">{formik.errors.kind}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="im-description">Açıklama</Label>
              <Textarea id="im-description" name="description" placeholder="Detaylı açıklama" rows={3} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description} />
              {formik.errors.description && formik.touched.description && <p className="text-xs text-destructive">{formik.errors.description}</p>}
            </div>
          </div>

          <Separator />

          {/* İmkan Sahibi */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-blue-600">İmkan Sahibi</h4>
            <div className="space-y-2">
              <Label htmlFor="im-fromWho">Yardım Eden</Label>
              <select id="im-fromWho" name="fromWho" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fromWho}>
                <option value="">Seçiniz</option>
                {fromWhoOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              {formik.errors.fromWho && formik.touched.fromWho && <p className="text-xs text-destructive">{formik.errors.fromWho}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="im-phone">Telefon</Label>
              <Input id="im-phone" name="phone" placeholder="5XX XXX XX XX" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
              {formik.errors.phone && formik.touched.phone && <p className="text-xs text-destructive">{formik.errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="im-email">Email</Label>
              <Input id="im-email" name="email" type="email" placeholder="ornek@email.com" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
              {formik.errors.email && formik.touched.email && <p className="text-xs text-destructive">{formik.errors.email}</p>}
            </div>
          </div>

          <Separator />

          {/* Adres */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-blue-600">İmkan Adresi</h4>
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
              <Label>Sokak / Mahalle</Label>
              <Input placeholder="Cadde / Sokak / Mahalle" value={street} onChange={(e) => setStreet(e.target.value)} />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>İptal</Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={mutation.isLoading}>
              {mutation.isLoading ? 'Oluşturuluyor...' : 'İmkan Oluştur'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
