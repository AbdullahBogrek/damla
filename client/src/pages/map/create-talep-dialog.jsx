import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from 'react-query'
import { fetchLatAndLng, postTalep } from '@/lib/api'
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
  job: Yup.string().required('Meslek seçimi zorunludur'),
  income: Yup.string().required('Gelir seçimi zorunludur'),
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

const jobOptions = [
  { value: 'doktor', label: 'Doktor' },
  { value: 'hemşire', label: 'Hemşire' },
  { value: 'mühendis', label: 'Mühendis' },
  { value: 'memur', label: 'Memur' },
  { value: 'işçi', label: 'İşçi' },
  { value: 'öğrenci', label: 'Öğrenci' },
]

const incomeOptions = [
  '0-500', '500-1000', '1000-2000', '2000-4000', '4000-6000', '6000 ve üzeri',
]

export function CreateTalepDialog({ open, onOpenChange }) {
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [street, setStreet] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation(postTalep, {
    onSuccess: () => {
      queryClient.invalidateQueries('taleps')
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
      job: '',
      income: '',
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
          <DialogTitle>Talep Oluştur</DialogTitle>
        </DialogHeader>

        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>Girdiğiniz bilgilerin doğruluğu çok önemlidir. Yanlış bilgilerden siz sorumlusunuz.</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Talep Bilgileri */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-destructive">Talep Bilgileri</h4>
            <div className="space-y-2">
              <Label htmlFor="title">Başlık</Label>
              <Input id="title" name="title" placeholder="Yardım talebinizin başlığı" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} />
              {formik.errors.title && formik.touched.title && <p className="text-xs text-destructive">{formik.errors.title}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="kind">Tür</Label>
              <select id="kind" name="kind" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.kind}>
                <option value="">Seçiniz</option>
                {kindOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              {formik.errors.kind && formik.touched.kind && <p className="text-xs text-destructive">{formik.errors.kind}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea id="description" name="description" placeholder="Detaylı açıklama" rows={3} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description} />
              {formik.errors.description && formik.touched.description && <p className="text-xs text-destructive">{formik.errors.description}</p>}
            </div>
          </div>

          <Separator />

          {/* Talep Sahibi */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-destructive">Talep Sahibi</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="job">Meslek</Label>
                <select id="job" name="job" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.job}>
                  <option value="">Seçiniz</option>
                  {jobOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                {formik.errors.job && formik.touched.job && <p className="text-xs text-destructive">{formik.errors.job}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="income">Aylık Gelir</Label>
                <select id="income" name="income" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.income}>
                  <option value="">Seçiniz</option>
                  {incomeOptions.map(opt => <option key={opt} value={opt}>{opt} TL</option>)}
                </select>
                {formik.errors.income && formik.touched.income && <p className="text-xs text-destructive">{formik.errors.income}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" name="phone" placeholder="5XX XXX XX XX" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
              {formik.errors.phone && formik.touched.phone && <p className="text-xs text-destructive">{formik.errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="ornek@email.com" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
              {formik.errors.email && formik.touched.email && <p className="text-xs text-destructive">{formik.errors.email}</p>}
            </div>
          </div>

          <Separator />

          {/* Adres */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-destructive">Talep Adresi</h4>
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
            <Button type="submit" className="bg-red-500 hover:bg-red-600" disabled={mutation.isLoading}>
              {mutation.isLoading ? 'Oluşturuluyor...' : 'Talep Oluştur'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
