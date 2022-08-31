import { useState, createContext, useEffect, useContext } from "react"
import { fetchLogout, fetchMe } from "../Api"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const me = await fetchMe()

                setLoggedIn(true)
                setUser(me)
                setLoading(false)

                console.log("me", me)
            } catch (e) {
                setLoading(false)
            }
        })()
    }, [])

    const login = (data) => {
        setLoggedIn(true)
        setUser(data.user)

        localStorage.setItem("access-token", data.accessToken)
        localStorage.setItem("refresh-token", data.refreshToken)
    }

    const logout = async () => {
        setLoggedIn(false)
        setUser(null)
        
        await fetchLogout();

        localStorage.removeItem("access-token")
        localStorage.removeItem("refresh-token")
    }

    const values = {
        loggedIn,
        user,
        login,
        logout,
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export {AuthProvider, useAuth}