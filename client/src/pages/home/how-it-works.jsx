import { UserPlus, MapPin, Handshake } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    title: 'Kayıt Ol',
    description: 'Hızlıca bir hesap oluşturun ve platforma katılın.',
    color: 'bg-brand-100 text-brand-600',
  },
  {
    icon: MapPin,
    title: 'Yardım Ara veya Paylaş',
    description: 'Yardım talebi oluşturun veya sunabileceğiniz imkanları paylaşın.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Handshake,
    title: 'Haritada Buluşun',
    description: 'Harita üzerinden en yakın yardımı bulun ve iletişime geçin.',
    color: 'bg-amber-100 text-amber-600',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nasıl Çalışır?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Üç basit adımda yardımlaşmaya başlayın
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-10 hidden h-px w-full bg-border sm:block" />
              )}
              <div className="relative">
                <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl ${step.color}`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                  {index + 1}
                </div>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
