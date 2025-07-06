import dayjs from 'dayjs'

const AlojamientoCard = ({ alojamiento }) => {
  const recaudacionTotal = (reservas) => {
    return reservasNuevasYConfirmadas(reservas).reduce((total, reserva) => {
      return total + RecaudacionPorReserva(reserva)
    }, 0)
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
    <div className="card-container">
      <div>
        <img
          className="imagen-alojamiento"
          src={alojamiento.fotos[0].path}
          alt={alojamiento.nombre}
        />
      </div>
      <div className="alojamiento-content">
        <h1>{alojamiento.nombre}</h1>
        <div className="alojamiento-info">
          <h3>Cantidad maxima huespedes: {alojamiento.cantHuespedesMax}</h3>
        </div>
        <div className="alojamiento-info">
          <h3>Cantidad de reservas: {totalReservasConfirmadas(alojamiento.reservas)} </h3>
        </div>

        <div className="alojamiento-info">
          <h3>Dinero recaudado: {recaudacionTotal(alojamiento.reservas)} </h3>
        </div>

        <div className="alojamiento-info"></div>
      </div>
    </div>
  )
}

export default AlojamientoCard
