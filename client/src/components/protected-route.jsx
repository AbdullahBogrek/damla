import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth-context'

export function ProtectedRoute({ admin }) {
  const { loggedIn, user } = useAuth()

  if (!loggedIn) {
    return <Navigate to="/giris" replace />
  }

  if (admin && user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
