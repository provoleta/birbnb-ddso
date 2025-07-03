import './reserva-card.css'
import Api from '../../../../api/api'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import VentanaConfirmacion from '../ventana-confirmacion/ventana-confirmacion.jsx'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const ReservaCard = ({
  alojamiento,
  estado,
  fechaAlta,
  rangoFechas,
  idReserva,
  onReservaCancelada,
}) => {
  const [showCancelarReserva, setShowCancelarReserva] = useState(false)

  const CancelarReservaHandler = async () => {
    try {
      const response = await Api.cancelarReserva(idReserva)
      console.log(response)
      // response.status === 204
      //   ? alert('La reserva fue cancelada con exito')
      //   : console.log(response.message)
      onReservaCancelada()
      setShowCancelarReserva(false)
    } catch (error) {
      console.error('Error al cancelar la reserva:', error)
    }
  }

  const handleCancelarReserva = () => {
    setShowCancelarReserva(true)
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
        <h3>Estado: {estado}</h3>
        <h3>Fecha Alta: {formatDate(fechaAlta)}</h3>
        <h3>Fecha Check-in: {formatDate(rangoFechas.fechaInicio)}</h3>
        <h3>Fecha Check-out: {formatDate(rangoFechas.fechaFin)}</h3>
      </div>
      <Button
        variant="contained"
        style={{
          position: 'relative',
          marginTop: 'auto',
          backgroundColor: '#FFD700',
          color: '#000',
        }}
        startIcon={<DeleteIcon />}
        onClick={handleCancelarReserva}
      >
        Cancelar Reserva
      </Button>
      {showCancelarReserva && (
        <VentanaConfirmacion
          mensaje="¿Estás seguro de que deseas cancelar esta reserva?"
          onConfirm={CancelarReservaHandler}
          onCancel={() => setShowCancelarReserva(false)}
        />
      )}
    </div>
  )
}

export default ReservaCard
