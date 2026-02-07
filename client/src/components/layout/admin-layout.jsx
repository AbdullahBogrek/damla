import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  HandHelping,
  Gift,
  Users,
} from 'lucide-react'

const sidebarLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Panel', end: true },
  { to: '/admin/talepler', icon: HandHelping, label: 'Talepler' },
  { to: '/admin/imkanlar', icon: Gift, label: 'İmkanlar' },
  { to: '/admin/kullanicilar', icon: Users, label: 'Kullanıcılar' },
]

export function AdminLayout() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden w-64 border-r bg-card lg:block">
        <div className="flex h-full flex-col gap-1 p-4">
          <h2 className="mb-4 px-2 text-lg font-semibold">Admin Panel</h2>
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map(({ to, icon: Icon, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
      <div className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
