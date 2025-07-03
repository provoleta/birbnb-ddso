import { Box } from '@mui/material'
import './ventana-confirmacion.css'

const VentanaConfirmacion = ({ mensaje, onConfirm, onCancel }) => {
  return (
    <div className="ventana-flotante-confirmacion-overlay">
      <Box className="ventana-flotante-confirmacion">
        <h2>{mensaje}</h2>
        <button className="boton-confirmar-reserva" onClick={onConfirm}>
          Confirmar
        </button>
        <button className="boton-cerrar-ventana" onClick={onCancel}>
          Cancelar
        </button>
      </Box>
    </div>
  )
}

export default VentanaConfirmacion
