import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { fetchImkanList, deleteImkan } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
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
import { Search, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

export default function AdminImkanlar() {
  const [search, setSearch] = useState('')
  const queryClient = useQueryClient()

  const { data: imkans, isLoading } = useQuery('admin-imkans', () => fetchImkanList().then(r => r.data))

  const deleteMutation = useMutation(
    (id) => deleteImkan(id),
    { onSuccess: () => queryClient.invalidateQueries('admin-imkans') }
  )

  const filtered = imkans?.filter(i =>
    i.title?.toLowerCase().includes(search.toLowerCase()) ||
    i.province?.toLowerCase().includes(search.toLowerCase())
  ) || []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">İmkanlar</h2>
        <p className="text-sm text-muted-foreground">Tüm yardım imkanlarını yönetin</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="İmkan ara..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Badge variant="secondary">{filtered.length} imkan</Badge>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Başlık</TableHead>
              <TableHead>İl</TableHead>
              <TableHead>İlçe</TableHead>
              <TableHead>Tür</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead className="w-[80px]">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(6)].map((_, j) => (
                    <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  İmkan bulunamadı.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((imkan) => (
                <TableRow key={imkan._id}>
                  <TableCell className="font-medium">{imkan.title}</TableCell>
                  <TableCell>{imkan.province}</TableCell>
                  <TableCell>{imkan.district}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{imkan.kind}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {imkan.createdAt && format(new Date(imkan.createdAt), 'd MMM yyyy', { locale: tr })}
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>İmkanı silmek istediğinize emin misiniz?</AlertDialogTitle>
                          <AlertDialogDescription>Bu işlem geri alınamaz.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>İptal</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => deleteMutation.mutate(imkan._id)}
                          >
                            Sil
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
