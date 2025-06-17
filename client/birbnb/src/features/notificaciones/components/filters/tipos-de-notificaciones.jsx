import { useState } from 'react'
import '../../notificaciones.css'

function BotonesGrupo({ setMostrar }) {
  const [activo, setActivo] = useState('notificaciones')

  const handleClick = (nombreBoton) => {
    setActivo(nombreBoton)
    setMostrar(nombreBoton)
  }

  //TODO: agregar funcionalidad a los botones ademas de cambiar de estado
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button
        className={
          activo === 'notificaciones'
            ? 'notification-button-style-activo'
            : 'notification-button-style'
        }
        onClick={() => handleClick('notificaciones')}
      >
        Notificaciones
      </button>
      <button
        className={
          activo === 'reservas'
            ? 'notification-button-style-activo'
            : 'notification-button-style'
        }
        onClick={() => handleClick('reservas')}
      >
        Reservas
      </button>
      {/* <button
        className={
          activo === 'alojamiento'
            ? 'notification-button-style-activo'
            : 'notification-button-style'
        }
        onClick={() => handleClick('alojamiento')}
      >
        Alojamientos
      </button> */}
    </div>
  )
}

export default BotonesGrupo

//        {botones.map((texto, idx) => (
//   <button
//   key={idx}
//   onClick={() => setActivo(idx)}
//   className={
//     activo === idx
//       ? 'notification-button-style-activo'
//       : 'notification-button-style'
//   }
// >
//   {texto}
// </button>
// ))}
