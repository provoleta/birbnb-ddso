import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../../api/api'
import { useAuthContext } from '../../../../store/auth-context'
import '../../perfil.css'
import AlojamientoCard from '../alojamiento-card/alojamiento-card'
//import './alojamientos.css'

import CircularIndeterminate from '../../../../components/loader/loader'

const MostrarAlojamientos = () => {
  const [alojamientos, setAlojamientos] = useState([])
  const [loading, setLoading] = useState(true)
  const { logueado, loadingAuth } = useAuthContext()
  const navigate = useNavigate()

  const fetchAlojamientos = async () => {
    try {
      const response = await api.getAlojamientosAnfitrion()
      setAlojamientos(response)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loadingAuth && logueado) {
      fetchAlojamientos()
    }
  }, [loadingAuth, logueado])

  useEffect(() => {
    if (!loadingAuth && !logueado) {
      navigate('/')
    }
  }, [logueado, navigate, loadingAuth])

  if (loading) {
    return <CircularIndeterminate />
  }
  return (
    <>
      <h2>Tus Alojamientos</h2>

      {alojamientos.length > 0 && (
        <div className="fondo-gris">
          {alojamientos.map((result) => (
            <AlojamientoCard key={result.idAlojamiento} alojamiento={result} />
          ))}
        </div>
      )}
      {alojamientos.length === 0 && <p>Todavia no tenes alojamientos.</p>}
    </>
  )
}

export default MostrarAlojamientos
