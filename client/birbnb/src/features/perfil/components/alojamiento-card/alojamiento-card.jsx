const AlojamientoCard = ({ alojamiento }) => {
  const recaudacionTotal = (reservas) => {
    return reservasNuevasYConfirmadas(reservas).reduce(total)
  }

  // FALTA TERMINARLO Y ABSTRAER BIEN LA LOGICA 🚨
  const totalReservasConfirmadas = (reservas) => {
    reservas.filter((reserva) => reservasNuevasYConfirmadas(reservas))
  }

  const reservasNuevasYConfirmadas = (reservas) => {
    return reservas.filter(
      (reserva) => reserva.estado === 'CONFIRMADA' && fechaProxima(reserva.rangoFechas),
    )
  }

  const reservasConfirmadas = (reservas) => {
    return reservas.filter((reserva) => reserva.estado === 'CONFIRMADA')
  }

  const fechaProxima = (rangoFechas) => {
    return rangoFechas.fechaInicio > new Date()
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
          <h3>Dinero : {recaudacionTotal(alojamiento.reservas)} </h3>
        </div>

        <div className="alojamiento-info"></div>
      </div>
    </div>
  )
}

export default AlojamientoCard
