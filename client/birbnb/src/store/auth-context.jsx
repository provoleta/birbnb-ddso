import { createContext, useState, useContext } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { set } from 'mongoose'

const AuthContext = createContext()

export function useAuthContext() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios
        .get('usuarios/perfil', { baseURL: 'http://localhost:6969' })
        .then((response) => {
          setUser(response.data)
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
  }

  return <AuthContext.Provider value={{ setToken }}>{children}</AuthContext.Provider>
}
