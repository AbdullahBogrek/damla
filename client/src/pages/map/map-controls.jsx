import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { LocateFixed, Plus, HandHelping, Gift } from 'lucide-react'

export function MapControls({ panTo, onCreateTalep, onCreateImkan }) {
  const handleLocate = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      () => null
    )
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-lg shadow-md"
              onClick={handleLocate}
            >
              <LocateFixed className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Konumumu bul</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="h-10 w-10 rounded-lg shadow-md bg-red-500 hover:bg-red-600"
              onClick={onCreateTalep}
            >
              <HandHelping className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Talep Oluştur</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="h-10 w-10 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600"
              onClick={onCreateImkan}
            >
              <Gift className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">İmkan Oluştur</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
