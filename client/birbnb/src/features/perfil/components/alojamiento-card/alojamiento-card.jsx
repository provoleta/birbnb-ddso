import dayjs from 'dayjs'
import PeopleIcon from '@mui/icons-material/People'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PaidIcon from '@mui/icons-material/Paid'
import './alojamiento-card.css'

const AlojamientoCard = ({ alojamiento }) => {
  const recaudacionTotal = (reservas) => {
    return reservasNuevasYConfirmadas(reservas).reduce((total, reserva) => {
      return total + RecaudacionPorReserva(reserva)
    }, 0)
  }

  const getImageSrc = (base64String) => {
    if (!base64String) return null
    if (base64String.startsWith('data:')) return base64String
    return `data:image/jpeg;base64,${base64String}`
  }

  const RecaudacionPorReserva = (reserva) => {
    const diasReserva = dayjs(reserva.rangoFechas.fechaFin).diff(
      dayjs(reserva.rangoFechas.fechaInicio),
      'day',
    )
    return diasReserva * reserva.precioPorNoche
  }

  // FALTA TERMINARLO Y ABSTRAER BIEN LA LOGICA 🚨
  const totalReservasConfirmadas = (reservas) => {
    return reservasNuevasYConfirmadas(reservas).length
  }

  const reservasNuevasYConfirmadas = (reservas) => {
    return reservas.filter(
      (reserva) => reserva.estado === 'CONFIRMADA' && fechaProxima(reserva.rangoFechas),
    )
  }

  const fechaProxima = (rangoFechas) => {
    return rangoFechas.fechaInicio > dayjs().toISOString()
  }
  return (
    <div className="card-container-alojamiento">
      <div>
        <img
          className="imagen-alojamiento"
          src={getImageSrc(alojamiento.fotos[0]?.path)}
          alt={`Imagen del alojamiento: ${alojamiento.nombre}`}
        />
      </div>
      <div className="alojamiento-content">
        <h1>{alojamiento.nombre}</h1>
        <div className="alojamiento-info">
          <PeopleIcon style={{ color: '#666', marginRight: '8px' }} />
          <h3>Capacidad máxima: {alojamiento.cantHuespedesMax} huéspedes</h3>
        </div>

        <div className="alojamiento-info">
          <CalendarTodayIcon style={{ color: '#666', marginRight: '8px' }} />
          <h3>Reservas confirmadas: {totalReservasConfirmadas(alojamiento.reservas)}</h3>
        </div>

        <div className="alojamiento-info">
          <AttachMoneyIcon style={{ color: '#4CAF50', marginRight: '8px' }} />
          <h3>Dinero a recaudar: ${recaudacionTotal(alojamiento.reservas)}</h3>
        </div>

        <div className="alojamiento-info">
          <PaidIcon style={{ color: '#2196F3', marginRight: '8px' }} />
          <h3>Precio por noche: ${alojamiento.precioPorNoche}</h3>
        </div>
      </div>
    </div>
  )
}

export default AlojamientoCard
