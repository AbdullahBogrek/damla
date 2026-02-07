import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 to-brand-500 px-8 py-16 text-center shadow-xl sm:px-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent)]" />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Yardımlaşmaya Başlamaya Hazır mısınız?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
              Hemen kayıt olun, ihtiyaç sahiplerine ulaşın veya sunabileceğiniz
              imkanları paylaşın.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-brand-600 hover:bg-brand-50 px-8">
                <Link to="/kayit">
                  Hemen Başla
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8">
                <Link to="/harita">Haritayı Gör</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
