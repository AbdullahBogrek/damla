import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function ProtectedRoute({ component: Component, admin, ...rest }) {
    const { loggedIn, user } = useAuth()

    if (admin && user.role !== "admin" ){
        return  <Navigate to="/" />
    }

    return loggedIn ? <Outlet /> : <Navigate to="/giris" />
}

export default ProtectedRoute