import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from 'react-query'
import { useAuth } from '@/contexts/auth-context'
import { updatePassword, deleteUser } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { PageHeader } from '@/components/layout/page-header'
import { Container } from '@/components/layout/container'
import { Bell, Shield, Trash2, Save, Check } from 'lucide-react'

const passwordSchema = Yup.object({
  oldPassword: Yup.string().required('Mevcut şifre zorunludur'),
  newPassword: Yup.string().min(6, 'Yeni şifre en az 6 karakter olmalıdır').required('Yeni şifre zorunludur'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Şifreler eşleşmiyor')
    .required('Şifre tekrarı zorunludur'),
})

export default function Settings() {
  const { user, logout } = useAuth()
  const [notifications, setNotifications] = useState({ features: true, news: false })
  const [profileVisible, setProfileVisible] = useState(true)
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  const passwordMutation = useMutation(
    (values) => updatePassword(user._id, values),
    {
      onSuccess: () => {
        setPasswordSuccess(true)
        passwordFormik.resetForm()
        setTimeout(() => setPasswordSuccess(false), 3000)
      },
    }
  )

  const deleteMutation = useMutation(
    () => deleteUser(user._id),
    {
      onSuccess: () => logout(),
    }
  )

  const passwordFormik = useFormik({
    initialValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
    validationSchema: passwordSchema,
    onSubmit: (values) => passwordMutation.mutate(values),
  })

  return (
    <Container className="py-8">
      <PageHeader title="Ayarlar" description="Hesap ayarlarınızı yönetin" />

      <div className="mt-6 space-y-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg">Bildirimler</CardTitle>
            </div>
            <CardDescription>Bildirim tercihlerinizi yönetin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Yeni özellikler ve güncellemeler</p>
                <p className="text-xs text-muted-foreground">Yeni özellikler hakkında bildirim alın</p>
              </div>
              <Switch
                checked={notifications.features}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, features: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Haberler ve duyurular</p>
                <p className="text-xs text-muted-foreground">Email ile haber bülteni alın</p>
              </div>
              <Switch
                checked={notifications.news}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, news: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg">Güvenlik</CardTitle>
            </div>
            <CardDescription>Şifrenizi değiştirin</CardDescription>
          </CardHeader>
          <CardContent>
            {passwordSuccess && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 p-3 text-sm text-brand-700">
                <Check className="h-4 w-4" />
                Şifreniz başarıyla güncellendi.
              </div>
            )}
            <form onSubmit={passwordFormik.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oldPassword">Mevcut Şifre</Label>
                <Input id="oldPassword" name="oldPassword" type="password" placeholder="••••••••" onChange={passwordFormik.handleChange} onBlur={passwordFormik.handleBlur} value={passwordFormik.values.oldPassword} />
                {passwordFormik.errors.oldPassword && passwordFormik.touched.oldPassword && <p className="text-xs text-destructive">{passwordFormik.errors.oldPassword}</p>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Yeni Şifre</Label>
                  <Input id="newPassword" name="newPassword" type="password" placeholder="••••••••" onChange={passwordFormik.handleChange} onBlur={passwordFormik.handleBlur} value={passwordFormik.values.newPassword} />
                  {passwordFormik.errors.newPassword && passwordFormik.touched.newPassword && <p className="text-xs text-destructive">{passwordFormik.errors.newPassword}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Yeni Şifre Tekrarı</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" onChange={passwordFormik.handleChange} onBlur={passwordFormik.handleBlur} value={passwordFormik.values.confirmPassword} />
                  {passwordFormik.errors.confirmPassword && passwordFormik.touched.confirmPassword && <p className="text-xs text-destructive">{passwordFormik.errors.confirmPassword}</p>}
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="bg-brand-500 hover:bg-brand-600" disabled={passwordMutation.isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  {passwordMutation.isLoading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Account */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hesap</CardTitle>
            <CardDescription>Hesap gizliliğinizi ve durumunuzu yönetin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Profil görünürlüğü</p>
                <p className="text-xs text-muted-foreground">Profilinizin diğer kullanıcılara görünmesine izin verin</p>
              </div>
              <Switch checked={profileVisible} onCheckedChange={setProfileVisible} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-destructive">Hesabı Sil</p>
                <p className="text-xs text-muted-foreground">Bu işlem geri alınamaz. Tüm verileriniz silinir.</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hesabı Sil
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Hesabınızı silmek istediğinize emin misiniz?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bu işlem geri alınamaz. Tüm verileriniz, talepleriniz ve imkanlarınız kalıcı olarak silinecektir.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>İptal</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => deleteMutation.mutate()}
                    >
                      Evet, Hesabımı Sil
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
