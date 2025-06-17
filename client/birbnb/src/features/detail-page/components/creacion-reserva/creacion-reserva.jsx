import { useAuthContext } from '../../../../store/auth-context'
import { useNavigate } from 'react-router-dom'

//{ fechaAlta, huespedReservadorId, idAlojamiento, rangoFechas } = reserva
const useCreacionReserva = (fechas, alojamientoId) => {
  const { logueado, user } = useAuthContext()
  const navigate = useNavigate()

  const procesarReserva = () => {
    if (!logueado) {
      navigate('/login', {
        state: { redirectAfterLogin: `/alojamientos/${alojamientoId}` },
      })
      return
    }

    if (!user) {
      alert('Espera un momento mientras cargamos tu información...')
      return
    }

    const reserva = {
      fechaAlta: new Date().toISOString(),
      huespedReservadorId: user._id,
      idAlojamiento: alojamientoId,
      rangoFechas: {
        fechaInicio: fechas[0].toISOString(),
        fechaFin: fechas[1].toISOString(),
      },
    }

    console.log('Reserva a procesar:', reserva)

    // Api().crearReserva(reserva, token)

    alert('¡Reserva creada con éxito!')
  }

  return { procesarReserva }
}

export default useCreacionReserva
