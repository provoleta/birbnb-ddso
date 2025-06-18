import './reserva-card.css'
import Api from '../../../../api/api'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'

const ReservaCard = ({
  alojamiento,
  fechaCreada,
  estado,
  fechaAlta,
  rangoFechas,
  idReserva,
}) => {
  const CancelarReservaHandler = async () => {
    try {
      const response = await Api().cancelarReserva(idReserva)
      console.log(response)
      response.status === '200'
        ? alert('La reserva fue cancelada con exito')
        : alert(response.message)
    } catch (error) {
      console.error('Error al cancelar la reserva:', error)
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
      <Button
        variant="contained"
        style={{ position: 'relative', marginTop: 'auto' }}
        startIcon={<DeleteIcon />}
        color="secondary"
        onClick={CancelarReservaHandler}
      >
        Cancelar Reserva
      </Button>
    </div>
  )
}

export default ReservaCard
