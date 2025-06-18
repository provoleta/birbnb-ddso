import ReservaCard from '../reserva-card/reserva-card'
import Api from '../../../../api/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../store/auth-context'

const MostrarReservas = ({ userId }) => {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const { token, logueado } = useAuthContext()
  const navigate = useNavigate()

  const fetchReservas = async () => {
    try {
      const response = await Api().getReservas(token)
      // const data = await response.json()
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
    return <div>Cargando reservas...</div>
  }
  console.log('Reservas del usuario:', reservas)
  return (
    <>
      <h2>Tus reservas</h2>
      <div className="fondo-gris">
        {reservas.map((result) => (
          <ReservaCard
            key={result.id}
            alojamiento={result.alojamiento}
            fechaCreada={result.createdAt}
            estado={result.estado}
            fechaAlta={result.fechaAlta}
            rangoFechas={result.rangoFechas}
            idReserva={result.idReserva}
            onReservaCancelada={fetchReservas}
          />
        ))}
      </div>
    </>
  )
}

export default MostrarReservas
