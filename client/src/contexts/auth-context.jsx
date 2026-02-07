import { useState, createContext, useEffect, useContext } from 'react'
import { fetchLogout, fetchMe } from '@/lib/api'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const me = await fetchMe()
        setLoggedIn(true)
        setUser(me)
        setLoading(false)
      } catch (e) {
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
        setLoading(false)
      }
    })()
  }, [])

  const login = (data) => {
    setLoggedIn(true)
    setUser(data.user)
    localStorage.setItem('access-token', data.accessToken)
    localStorage.setItem('refresh-token', data.refreshToken)
  }

  const logout = async () => {
    setLoggedIn(false)
    setUser(null)
    await fetchLogout()
    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
  }

  const values = {
    loggedIn,
    user,
    login,
    logout,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
