import { useAuthContext } from '../../../../store/auth-context'
import { useNavigate } from 'react-router-dom'
import Api from '../../../../../src/api/api'

function formatDateToDDMMYYYY(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}
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
      fechaAlta: formatDateToDDMMYYYY(new Date()),
      huespedReservadorId: user._id,
      idAlojamiento: alojamientoId,
      rangoFechas: {
        fechaInicio: formatDateToDDMMYYYY(fechas[0]),
        fechaFin: formatDateToDDMMYYYY(fechas[1]),
      },
    }

    console.log('Reserva a procesar:', reserva)

    Api().crearReserva(reserva)

    alert('¡Reserva creada con éxito!')
    window.location.reload()
  }

  return { procesarReserva }
}

export default useCreacionReserva
