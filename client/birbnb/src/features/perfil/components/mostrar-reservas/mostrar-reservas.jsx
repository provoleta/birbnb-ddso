import ReservaCard from '../reserva-card/reserva-card'
import api from '../../../../api/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../store/auth-context'
import CircularIndeterminate from '../../../../components/loader/loader'
import '../../perfil.css'

const MostrarReservas = () => {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const { logueado } = useAuthContext()
  const navigate = useNavigate()

  const fetchReservas = async () => {
    try {
      const response = await api.getReservas()
      setReservas(response)
    } catch (error) {
      console.error('Error al obtener las reservas:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchReservas()
  }, [])

  if (!logueado) {
    navigate('/')
  }

  if (loading) {
    // Falta bajarlo un poco
    return <CircularIndeterminate />
  }
  //console.log('Reservas del usuario:', reservas)
  return (
    <>
      <h2>Tus reservas</h2>
      {reservas.length > 0 && (
        <div className="fondo-gris">
          {reservas.map((result) => (
            <ReservaCard
              key={result.id}
              alojamiento={result.alojamiento}
              estado={result.estado}
              fechaAlta={result.fechaAlta}
              rangoFechas={result.rangoFechas}
              idReserva={result.idReserva}
              onReservaCancelada={fetchReservas}
            />
          ))}
        </div>
      )}
      {reservas.length === 0 && <p>Todavia no se realizaron reservas.</p>}
    </>
  )
}

export default MostrarReservas
