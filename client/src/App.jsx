import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RootLayout } from '@/components/layout/root-layout'
import { AuthLayout } from '@/components/layout/auth-layout'
import { AdminLayout } from '@/components/layout/admin-layout'
import { ProtectedRoute } from '@/components/protected-route'

// Lazy load pages
const Home = lazy(() => import('@/pages/home'))
const Signin = lazy(() => import('@/pages/auth/signin'))
const Signup = lazy(() => import('@/pages/auth/signup'))
const Profile = lazy(() => import('@/pages/profile'))
const MapPage = lazy(() => import('@/pages/map'))
const Favorites = lazy(() => import('@/pages/favorites'))
const HelpDetail = lazy(() => import('@/pages/help-detail'))
const Settings = lazy(() => import('@/pages/settings'))
const AdminPanel = lazy(() => import('@/pages/admin/panel'))
const AdminTalepler = lazy(() => import('@/pages/admin/talepler'))
const AdminImkanlar = lazy(() => import('@/pages/admin/imkanlar'))
const AdminKullanicilar = lazy(() => import('@/pages/admin/kullanicilar'))
const NotFound = lazy(() => import('@/pages/not-found'))

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Auth pages - no navbar/footer */}
          <Route element={<AuthLayout />}>
            <Route path="/giris" element={<Signin />} />
            <Route path="/kayit" element={<Signup />} />
          </Route>

          {/* Main layout with navbar/footer */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/yardim/:help_id" element={<HelpDetail />} />
            <Route path="/favoriler" element={<Favorites />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profil" element={<Profile />} />
              <Route path="/ayarlar" element={<Settings />} />
              <Route path="/harita" element={<MapPage />} />
            </Route>

            {/* Admin routes */}
            <Route element={<ProtectedRoute admin />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/admin/talepler" element={<AdminTalepler />} />
                <Route path="/admin/imkanlar" element={<AdminImkanlar />} />
                <Route path="/admin/kullanicilar" element={<AdminKullanicilar />} />
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}
