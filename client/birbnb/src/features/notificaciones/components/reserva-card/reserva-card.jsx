import './reserva-card.css'
import Api from '../../../../api/api'
const ReservaCard = ({
  alojamiento,
  fechaCreada,
  estado,
  fechaAlta,
  rangoFechas,
  idReserva,
}) => {
  const CancelarReservaHandler = () => {
    try {
      Api.delete(`/reservas/${idReserva}`)
      alert('Reserva borrada exitosamente')
    } catch (error) {
      console.error('Error al cancelar la reserva:', error)
      alert('No se pudo cancelar la reserva. Inténtalo de nuevo más tarde.')
    }
  }

  return (
    <div className="card-container">
      <div>
        <img
          className="imagen-reserva"
          src={alojamiento.fotos[0].path}
          alt={alojamiento.nombre}
        />
      </div>
      <div className="reserva-content">
        <h3>{alojamiento.nombre}</h3>
        <h3>Fecha de reserva: {fechaCreada}</h3>
        <h3>Estado: {estado}</h3>
        <h3>Fecha Alta: {fechaAlta}</h3>
        <h3>Fecha llegada: {rangoFechas.fechaInicio}</h3>
        <h3>Fecha salida: {rangoFechas.fechaFin}</h3>
      </div>
      <button className="cancelar-reserva-btn" onClick={CancelarReservaHandler}>
        Cancelar Reserva
      </button>
    </div>
  )
}

export default ReservaCard
