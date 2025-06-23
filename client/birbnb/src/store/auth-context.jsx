import { createContext, useState, useContext } from 'react'
import { useEffect } from 'react'
import api from '../api/api'
import dayjs from 'dayjs'

const AuthContext = createContext()

function ultimaValidacionValida(ultimaActualizacion) {
  if (!ultimaActualizacion) return false

  const fechaUltimaActualizacion = dayjs(ultimaActualizacion)
  const fechaActual = dayjs()
  console.log('Fecha actual:', fechaActual.format())
  console.log('Fecha última actualización:', fechaUltimaActualizacion.format())
  return fechaActual.diff(fechaUltimaActualizacion, 'minute') <= 59
}

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
      const ultimaActualizacion = localStorage.getItem('ultimaActualizacion')
      if (!ultimaValidacionValida(ultimaActualizacion)) return
      setToken(storedToken)
      api.tokenAuth = storedToken
      api.getProfile().then((userData) => {
        setUser(userData)
        setLogueado(true)
      })
    }
  }, [])

  const handleNewToken = async (newToken) => {
    setToken(newToken)
    localStorage.setItem('token', newToken)
    localStorage.setItem('ultimaActualizacion', dayjs().toISOString())
    let userData = await api.getProfile(newToken)
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
