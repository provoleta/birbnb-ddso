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

  const handleNewToken = async (newToken) => {
    setToken(newToken)
    console.log(token)
    let userData = await Api().getProfile(newToken)
    setUser(userData)
    setLogueado(true)
  }

  const logout = () => {
    // Aquí podrías hacer una llamada a la API para cerrar sesión
    setUser(null)
    setToken(null)
    setLogueado(false)
  }

  return (
    <AuthContext.Provider value={{ handleNewToken, logueado, token, user }}>
      {children}
    </AuthContext.Provider>
  )
}
