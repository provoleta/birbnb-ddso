import { useAuthContext } from '../../../../store/auth-context'
import api from '../../../../../src/api/api'

function formatDateToDDMMYYYY(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

//{ fechaAlta, huespedReservadorId, idAlojamiento, rangoFechas } = reserva
const useCreacionReserva = (fechas, alojamientoId, setConfirmacionReserva) => {
  const { user } = useAuthContext()

  const procesarReserva = async () => {
    if (!user) {
      alert('Espera un momento mientras cargamos tu información...')
      return
    }

    const reserva = {
      fechaAlta: formatDateToDDMMYYYY(new Date()),
      idAlojamiento: alojamientoId,
      rangoFechas: {
        fechaInicio: formatDateToDDMMYYYY(fechas[0]),
        fechaFin: formatDateToDDMMYYYY(fechas[1]),
      },
    }

    try {
      await api.crearReserva(reserva)
      setConfirmacionReserva(true)
    } catch (error) {
      console.error('Error al procesar la reserva:', error.message)
      alert('Error al procesar la reserva. Por favor, inténtalo de nuevo más tarde.')
      return
    }
  }

  return { procesarReserva }
}

export default useCreacionReserva
