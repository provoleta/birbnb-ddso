import { Box, TextField } from '@mui/material'
import './ventana-confirmacion.css'
import { useState } from 'react'

const VentanaConfirmacion = ({ mensaje, onConfirm, onCancel, setMotivo }) => {
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
        <button className="boton-cerrar-ventana" onClick={onCancel}>
          CANCELAR
        </button>
      </Box>
    </div>
  )
}

export default VentanaConfirmacion
