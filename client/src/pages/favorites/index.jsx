import { Link } from 'react-router-dom'
import { useFavorite } from '@/contexts/favorite-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/layout/page-header'
import { Container } from '@/components/layout/container'
import { MapPin, Calendar, ExternalLink, X, Star, Map } from 'lucide-react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorite()

  return (
    <Container className="py-8">
      <PageHeader title="Favoriler" description="Kaydettiğiniz yardım talepleri ve imkanları" />

      {favorites.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-50">
            <Star className="h-10 w-10 text-amber-400" />
          </div>
          <h3 className="mt-6 text-lg font-semibold text-foreground">Henüz favori yok</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Haritada beğendiğiniz yardım taleplerini ve imkanları favorilere ekleyebilirsiniz.
          </p>
          <Button asChild className="mt-6 bg-brand-500 hover:bg-brand-600">
            <Link to="/harita">
              <Map className="mr-2 h-4 w-4" />
              Haritaya Git
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((item) => (
            <Card key={item._id} className="group relative transition-shadow hover:shadow-md">
              <button
                onClick={() => removeFavorite(item._id)}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-muted-foreground opacity-0 shadow-sm backdrop-blur transition-opacity hover:text-destructive group-hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.type === 'talep' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                    <Star className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium text-foreground">{item.title}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant={item.type === 'talep' ? 'destructive' : 'default'} className="text-xs">
                        {item.type === 'talep' ? 'Talep' : 'İmkan'}
                      </Badge>
                      {item.kind && <Badge variant="outline" className="text-xs">{item.kind}</Badge>}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                  {(item.province || item.district) && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.district}, {item.province}
                    </div>
                  )}
                  {item.createdAt && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(item.createdAt), 'd MMMM yyyy', { locale: tr })}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to={`/yardim/${item._id}`}>
                      <ExternalLink className="mr-2 h-3.5 w-3.5" />
                      Detay
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Container>
  )
}
