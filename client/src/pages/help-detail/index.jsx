import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchHelp } from '@/lib/api'
import { useFavorite } from '@/contexts/favorite-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Container } from '@/components/layout/container'
import {
  MapPin,
  Calendar,
  Phone,
  Mail,
  ArrowLeft,
  Star,
  StarOff,
  User,
  Eye,
} from 'lucide-react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

export default function HelpDetail() {
  const { help_id: id } = useParams()
  const { favorites, addFavorite, removeFavorite } = useFavorite()

  const { data, isLoading, isError } = useQuery(
    ['help', id],
    () => fetchHelp(id).then(res => res.data),
    { enabled: !!id }
  )

  const isFavorited = favorites.some((f) => f._id === id)

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFavorite(id)
    } else if (data) {
      addFavorite(data)
    }
  }

  if (isLoading) {
    return (
      <Container className="py-8">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </Container>
    )
  }

  if (isError || !data) {
    return (
      <Container className="py-8">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-xl font-semibold">Yardım bulunamadı</h2>
          <p className="mt-2 text-sm text-muted-foreground">Bu yardım kaydı mevcut değil veya kaldırılmış olabilir.</p>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/harita">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Haritaya Dön
            </Link>
          </Button>
        </div>
      </Container>
    )
  }

  const isTalep = data.type === 'talep'

  return (
    <Container className="py-8">
      {/* Back button */}
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link to="/harita">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Haritaya Dön
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={isTalep ? 'destructive' : 'default'}>
                {isTalep ? 'Talep' : 'İmkan'}
              </Badge>
              {data.kind && <Badge variant="outline">{data.kind}</Badge>}
            </div>
            <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">{data.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {(data.province || data.district) && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {data.district}, {data.province}
                </span>
              )}
              {data.createdAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(data.createdAt), 'd MMMM yyyy', { locale: tr })}
                </span>
              )}
              {data.views !== undefined && (
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  {data.views} görüntülenme
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground">Açıklama</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {data.description || 'Açıklama eklenmemiş.'}
              </p>
            </CardContent>
          </Card>

          {/* Address */}
          {data.street && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground">Adres</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {data.street}, {data.district}, {data.province}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Favorite Button */}
          <Button
            variant={isFavorited ? 'default' : 'outline'}
            className={`w-full ${isFavorited ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
            onClick={toggleFavorite}
          >
            {isFavorited ? (
              <>
                <StarOff className="mr-2 h-4 w-4" />
                Favorilerden Çıkar
              </>
            ) : (
              <>
                <Star className="mr-2 h-4 w-4" />
                Favorilere Ekle
              </>
            )}
          </Button>

          {/* Contact Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground">
                {isTalep ? 'Talep Sahibi' : 'İmkan Sahibi'}
              </h3>
              <Separator className="my-4" />

              {data.fromWho && (
                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  {data.fromWho}
                </div>
              )}

              <div className="space-y-3">
                {data.phone && (
                  <Button asChild variant="outline" className="w-full justify-start">
                    <a href={`tel:${data.phone}`}>
                      <Phone className="mr-2 h-4 w-4 text-brand-500" />
                      {data.phone}
                    </a>
                  </Button>
                )}
                {data.email && (
                  <Button asChild variant="outline" className="w-full justify-start">
                    <a href={`mailto:${data.email}`}>
                      <Mail className="mr-2 h-4 w-4 text-brand-500" />
                      {data.email}
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Extra info for talep */}
          {isTalep && (data.job || data.income) && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground">Ek Bilgiler</h3>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm">
                  {data.job && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Meslek</span>
                      <span className="font-medium">{data.job}</span>
                    </div>
                  )}
                  {data.income && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gelir</span>
                      <span className="font-medium">{data.income} TL</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Container>
  )
}
