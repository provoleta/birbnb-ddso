import './reserva-card.css'
import Api from '../../../../api/api'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState } from 'react'

const ReservaCard = ({
  alojamiento,
  estado,
  fechaAlta,
  rangoFechas,
  idReserva,
  onReservaCancelada,
}) => {
  const CancelarReservaHandler = async () => {
    try {
      const response = await Api().cancelarReserva(idReserva)
      console.log(response)
      response.status === 204
        ? alert('La reserva fue cancelada con exito')
        : console.log(response.message)
      onReservaCancelada()
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
        <h3>Estado: {estado}</h3>
        <h3>Fecha Alta: {fechaAlta}</h3>
        <h3>Fecha Check-in: {rangoFechas.fechaInicio}</h3>
        <h3>Fecha Check-out: {rangoFechas.fechaFin}</h3>
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
