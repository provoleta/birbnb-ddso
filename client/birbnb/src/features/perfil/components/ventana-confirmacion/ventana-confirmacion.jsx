import { Box, TextField } from '@mui/material'
import './ventana-confirmacion.css'
import { useState } from 'react'

const VentanaConfirmacion = ({ mensaje, onConfirm, onCancel, setMotivo }) => {
  const cancelarReserva = () => {
    setMotivo('')
    onCancel()
  }
  return (
    <div className="ventana-flotante-confirmacion-overlay">
      <Box className="ventana-flotante-confirmacion">
        <h2>{mensaje}</h2>
        <div className="motivo-texto">
          <TextField
            label="Motivo (opcional)"
            variant="outlined"
            fullWidth
            onChange={(e) => setMotivo(e.target.value)}
          />
        </div>
        <button className="boton-confirmar-reserva" onClick={onConfirm}>
          CONFIRMAR
        </button>
        <button className="boton-cerrar-ventana" onClick={cancelarReserva}>
          CANCELAR
        </button>
      </Box>
    </div>
  )
}

const VentanaConfirmarReserva = ({ onConfirm }) => (
  <div className="ventana-flotante-confirmacion-overlay">
    <Box className="ventana-flotante-confirmacion">
      <h2>Reserva confirmada exitosamente</h2>
      <button className="boton-confirmar-reserva" onClick={onConfirm}>
        CERRAR
      </button>
    </Box>
  </div>
)

export { VentanaConfirmacion, VentanaConfirmarReserva }
