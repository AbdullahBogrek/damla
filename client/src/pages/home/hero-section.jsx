import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-blue-50 py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(34,197,94,0.1),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
            <Heart className="h-3.5 w-3.5" />
            Yardımlaşma Platformu
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Yardım talep et ya da{' '}
            <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              yardım et
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Damla, ihtiyaç sahiplerini yardım edebilecek kişi ve kurumlarla
            harita üzerinden buluşturan bir yardımlaşma platformudur.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-brand-500 hover:bg-brand-600 text-white px-8">
              <Link to="/kayit">
                Hemen Başla
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link to="/harita">Haritayı Keşfet</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
