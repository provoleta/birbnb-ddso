import { useState } from 'react'
import '../../notificaciones.css'

function BotonesGrupo() {
  const [activo, setActivo] = useState(null)

  const botones = ['Notificaciones', 'Reservas', 'Alojamientos']
  //TODO: agregar funcionalidad a los botones ademas de cambiar de estado
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {botones.map((texto, idx) => (
        <button
          key={idx}
          onClick={() => setActivo(idx)}
          className={
            activo === idx
              ? 'notification-button-style-activo'
              : 'notification-button-style'
          }
        >
          {texto}
        </button>
      ))}
    </div>
  )
}

export default BotonesGrupo
