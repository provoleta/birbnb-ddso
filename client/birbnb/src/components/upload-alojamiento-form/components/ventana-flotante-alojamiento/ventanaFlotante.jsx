import './ventanaFlotante.css'
import { Box } from '@mui/material'

function VentanaFlotanteReserva({ mensaje, onClose }) {
  return (
    <div className="ventana-flotante-reserva-overlay">
      <Box className="ventana-flotante-reserva">
        <h2>{mensaje}</h2>
        <button className="boton-cerrar-ventana" onClick={onClose}>
          Cerrar
        </button>
      </Box>
    </div>
  )
}

export default VentanaFlotanteReserva
