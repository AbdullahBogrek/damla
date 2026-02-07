import { Link } from 'react-router-dom'
import { MapPin, Github, Twitter, Mail } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const footerLinks = {
  Platform: [
    { label: 'Anasayfa', to: '/' },
    { label: 'Harita', to: '/harita' },
    { label: 'Hakkımızda', to: '/' },
  ],
  Destek: [
    { label: 'Yardım Merkezi', to: '/' },
    { label: 'Gizlilik Politikası', to: '/' },
    { label: 'Kullanım Şartları', to: '/' },
  ],
  Topluluk: [
    { label: 'Blog', to: '/' },
    { label: 'İletişim', to: '/' },
    { label: 'SSS', to: '/' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold">
              <MapPin className="h-5 w-5 text-primary" />
              Damla
            </Link>
            <p className="text-sm text-muted-foreground">
              Konum tabanlı yardımlaşma platformu. Yardım isteyen ve sunan insanları bir araya getiriyoruz.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm font-semibold">{category}</h3>
              <ul className="space-y-2">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Damla. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  )
}
