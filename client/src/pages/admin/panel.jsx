import { useQuery } from 'react-query'
import { fetchTalepList, fetchImkanList, fetchUserList } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { HandHelping, Gift, Users, Eye } from 'lucide-react'

const metrics = [
  { key: 'visitors', label: 'Toplam Ziyaretçi', value: '12,874', icon: Eye, color: 'text-amber-500 bg-amber-50' },
  { key: 'users', label: 'Kullanıcılar', icon: Users, color: 'text-brand-500 bg-brand-50' },
  { key: 'taleps', label: 'Talepler', icon: HandHelping, color: 'text-red-500 bg-red-50' },
  { key: 'imkans', label: 'İmkanlar', icon: Gift, color: 'text-blue-500 bg-blue-50' },
]

export default function AdminPanel() {
  const { data: taleps, isLoading: talepsLoading } = useQuery('admin-taleps', () => fetchTalepList().then(r => r.data))
  const { data: imkans, isLoading: imkansLoading } = useQuery('admin-imkans', () => fetchImkanList().then(r => r.data))
  const { data: users, isLoading: usersLoading } = useQuery('admin-users', () => fetchUserList().then(r => r.data))

  const isLoading = talepsLoading || imkansLoading || usersLoading

  const getCounts = (key) => {
    switch (key) {
      case 'users': return users?.length || 0
      case 'taleps': return taleps?.length || 0
      case 'imkans': return imkans?.length || 0
      default: return '12,874'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Platform istatistiklerine genel bakış</p>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ key, label, icon: Icon, color }) => (
          <Card key={key}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-2xl font-bold">{getCounts(key)}</p>
                )}
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Son Talepler</CardTitle>
          </CardHeader>
          <CardContent>
            {talepsLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
              </div>
            ) : taleps?.length === 0 ? (
              <p className="text-sm text-muted-foreground">Henüz talep yok.</p>
            ) : (
              <div className="space-y-3">
                {taleps?.slice(0, 5).map((item) => (
                  <div key={item._id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.province} / {item.district}</p>
                    </div>
                    <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-600">Talep</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Son İmkanlar</CardTitle>
          </CardHeader>
          <CardContent>
            {imkansLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
              </div>
            ) : imkans?.length === 0 ? (
              <p className="text-sm text-muted-foreground">Henüz imkan yok.</p>
            ) : (
              <div className="space-y-3">
                {imkans?.slice(0, 5).map((item) => (
                  <div key={item._id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.province} / {item.district}</p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">İmkan</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
