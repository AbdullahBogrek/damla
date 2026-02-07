import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Menu,
  MapPin,
  Heart,
  Settings,
  LogOut,
  User,
  Shield,
} from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { to: '/', label: 'Anasayfa' },
  { to: '/harita', label: 'Harita' },
]

export function Navbar() {
  const { loggedIn, user, logout } = useAuth()
  const navigate = useNavigate()
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const getInitials = () => {
    if (!user) return '?'
    return `${(user.name?.[0] || '').toUpperCase()}${(user.surname?.[0] || '').toUpperCase()}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <MapPin className="h-6 w-6 text-primary" />
          <span>Damla</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {loggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium capitalize">
                      {user?.name} {user?.surname}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profil')}>
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/favoriler')}>
                  <Heart className="mr-2 h-4 w-4" />
                  Favoriler
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/ayarlar')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Ayarlar
                </DropdownMenuItem>
                {user?.role === 'admin' && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Panel
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Çıkış Yap
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/giris">Giriş Yap</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/kayit">Kayıt Ol</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Damla
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setSheetOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-accent'
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}

              {loggedIn ? (
                <>
                  <div className="my-2 h-px bg-border" />
                  <NavLink to="/profil" onClick={() => setSheetOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent">
                    <User className="h-4 w-4" /> Profil
                  </NavLink>
                  <NavLink to="/favoriler" onClick={() => setSheetOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent">
                    <Heart className="h-4 w-4" /> Favoriler
                  </NavLink>
                  <NavLink to="/ayarlar" onClick={() => setSheetOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent">
                    <Settings className="h-4 w-4" /> Ayarlar
                  </NavLink>
                  {user?.role === 'admin' && (
                    <NavLink to="/admin" onClick={() => setSheetOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent">
                      <Shield className="h-4 w-4" /> Admin Panel
                    </NavLink>
                  )}
                  <div className="my-2 h-px bg-border" />
                  <button
                    onClick={() => { handleLogout(); setSheetOpen(false) }}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" /> Çıkış Yap
                  </button>
                </>
              ) : (
                <>
                  <div className="my-2 h-px bg-border" />
                  <div className="flex flex-col gap-2 px-3">
                    <Button variant="outline" asChild onClick={() => setSheetOpen(false)}>
                      <Link to="/giris">Giriş Yap</Link>
                    </Button>
                    <Button asChild onClick={() => setSheetOpen(false)}>
                      <Link to="/kayit">Kayıt Ol</Link>
                    </Button>
                  </div>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
