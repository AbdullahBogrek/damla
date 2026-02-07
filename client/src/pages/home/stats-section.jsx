import { HandHelping, Gift, Users, Eye } from 'lucide-react'

const stats = [
  { icon: HandHelping, label: 'Yardım Talebi', value: '500+', color: 'text-red-500 bg-red-50' },
  { icon: Gift, label: 'Yardım İmkanı', value: '150+', color: 'text-blue-500 bg-blue-50' },
  { icon: Users, label: 'Aktif Kullanıcı', value: '850+', color: 'text-brand-500 bg-brand-50' },
  { icon: Eye, label: 'Ziyaret Sayısı', value: '190+', color: 'text-amber-500 bg-amber-50' },
]

export function StatsSection() {
  return (
    <section className="border-y bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Rakamlarla Damla
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Platformumuzun büyüyen topluluğu
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-2xl border bg-background p-8 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <span className="mt-4 text-3xl font-bold text-foreground">{value}</span>
              <span className="mt-1 text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
