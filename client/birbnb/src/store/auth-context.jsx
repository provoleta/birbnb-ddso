import { createContext, useState, useContext } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Api from '../api/api'

const AuthContext = createContext()

export function useAuthContext() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [logueado, setLogueado] = useState(false)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      Api()
        .getProfile(token)
        .then((data) => {
          setUser(data)
          setLogueado(true)
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error)
          setUser(null)
        })
    } else {
      setUser(null)
    }
  }, [token])

  const logout = () => {
    // Aquí podrías hacer una llamada a la API para cerrar sesión
    setUser(null)
    setToken(null)
    setLogueado(false)
  }

  return (
    <AuthContext.Provider value={{ setToken, logueado }}>{children}</AuthContext.Provider>
  )
}
