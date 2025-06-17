import { useAuthContext } from '../../../../store/auth-context'
import { useNavigate } from 'react-router-dom'

//{ fechaAlta, huespedReservadorId, idAlojamiento, rangoFechas } = reserva
const useCreacionReserva = ({ fechas, alojamientoId }) => {
  const { logueado, token, user } = useAuthContext()
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

    try {
      const reserva = {
        fechaAlta: new Date().toISOString(),
        huespedReservadorId: user.id,
        idAlojamiento: alojamientoId,
        rangoFechas: {
          fechaInicio: fechas[0].toISOString(),
          fechaFin: fechas[1].toISOString(),
        },
      }

      console.log('Reserva a procesar:', reserva)

      // Aquí iría tu llamada a la API para crear la reserva
      // Api().crearReserva(reserva, token)

      alert('¡Reserva creada con éxito!')
      // navigate('/mis-reservas');  // Opcional: redirigir a la página de reservas
    } catch (error) {
      console.error('Error al procesar la reserva:', error)
      alert('Hubo un problema al crear la reserva. Intenta nuevamente.')
    }

    // Armo la reserva
  }

  return { procesarReserva }
}

export default useCreacionReserva
