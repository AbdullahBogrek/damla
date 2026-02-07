import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <div className="relative">
        <span className="text-[8rem] font-bold leading-none text-muted/20 sm:text-[12rem]">404</span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-2xl bg-background px-6 py-3 shadow-sm ring-1 ring-border">
            <p className="text-lg font-semibold text-foreground">Sayfa Bulunamadı</p>
          </div>
        </div>
      </div>

      <p className="mt-8 max-w-md text-muted-foreground">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        Lütfen adresi kontrol edin veya anasayfaya dönün.
      </p>

      <div className="mt-8 flex gap-3">
        <Button asChild variant="outline">
          <Link to={-1}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri Dön
          </Link>
        </Button>
        <Button asChild className="bg-brand-500 hover:bg-brand-600">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Anasayfa
          </Link>
        </Button>
      </div>
    </div>
  )
}
