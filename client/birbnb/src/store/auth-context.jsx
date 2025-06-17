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
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      let userData = Api().getProfile(storedToken)
      setUser(userData)
      setLogueado(true)
    }
  }, [])

  const handleNewToken = async (newToken) => {
    setToken(newToken)
    localStorage.setItem('token', newToken)
    let userData = await Api().getProfile(newToken)
    setUser(userData)
    setLogueado(true)
  }

  const handleLogout = () => {
    // Aquí podrías hacer una llamada a la API para cerrar sesión
    setUser(null)
    setToken(null)
    setLogueado(false)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ handleNewToken, logueado, token, user, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}
