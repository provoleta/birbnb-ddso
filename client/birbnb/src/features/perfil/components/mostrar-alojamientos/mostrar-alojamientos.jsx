import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../../api/api'
import { useAuthContext } from '../../../../store/auth-context'
import '../../perfil.css'
import AlojamientoCard from '../alojamiento-card/alojamiento-card'

import CircularIndeterminate from '../../../../components/loader/loader'

const MostrarAlojamientos = () => {
  const [alojamientos, setAlojamientos] = useState([])
  const [loading, setLoading] = useState(true)
  const { logueado } = useAuthContext()
  const navigate = useNavigate()

  const fetchAlojamientos = async () => {
    try {
      const response = await api.getAlojamientosAnfitrion()
      setAlojamientos(response)
    } catch (error) {
      console.log('Error al obtener los alojamientos del anfitrion')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlojamientos()
  }, [])

  if (!logueado) {
    navigate('/')
  }

  if (loading) {
    // Falta bajarlo un poco
    return <CircularIndeterminate />
  }

  return (
    <>
      <h2>Tus Alojamientos</h2>
      {alojamientos.length > 0 && (
        <div className="fondo-gris">
          {alojamientos.map((result) => (
            <AlojamientoCard key={result.id} alojamiento={result.alojamiento} />
          ))}
        </div>
      )}
      {alojamientos.length === 0 && <p>No contas con alojamientos a tu nombre</p>}
    </>
  )
}

export default MostrarAlojamientos
