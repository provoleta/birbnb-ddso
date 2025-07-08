import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../../api/api'
import { useAuthContext } from '../../../../store/auth-context'
import CircularIndeterminate from '../../../../components/loader/loader'
import ReservaCard from '../reserva-card/reserva-card'
import ReservasPendientesCard from '../reservasPendientes-card/reservasPendientes-card'

const MostrarReservasPendientes = (usuarioId) => {
  const [reservasPendientes, setReservasPendientes] = useState([])
  const [loading, setLoading] = useState(true)
  const { logueado, loadingAuth } = useAuthContext()
  const navigate = useNavigate()

  const fetchReservasPendientes = async () => {
    try {
      const response = await api.getAlojamientosAnfitrion(usuarioId)
      const todasLasReservas = response.flatMap((alojamiento) =>
        alojamiento.reservas.map((reserva) => ({
          ...reserva,
          alojamiento: alojamiento, // Incluir info del alojamiento
        })),
      )
      const reservasPendientes = todasLasReservas.filter(
        (reserva) => reserva.estado === 'PENDIENTE',
      )
      console.log(reservasPendientes)
      setReservasPendientes(reservasPendientes)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loadingAuth && logueado) {
      fetchReservasPendientes()
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
      <h2>Tus reservas pendientes de confirmacion</h2>
      {reservasPendientes.length > 0 && (
        <div className="fondo-gris">
          {reservasPendientes.map((result) => (
            <ReservasPendientesCard
              key={result.idReserva}
              alojamiento={result.alojamiento}
              estado={result.estado}
              fechaAlta={result.fechaAlta}
              rangoFechas={result.rangoFechas}
              idReserva={result._id}
              onReservaCancelada={fetchReservasPendientes}
              onReservaConfirmada={fetchReservasPendientes}
            />
          ))}
        </div>
      )}
      {reservasPendientes.length === 0 && <p>Todavia no se realizaron reservas.</p>}
    </>
  )
}

export default MostrarReservasPendientes
