import { useState } from 'react'
import '../../perfil.css'
import { useNavigate } from 'react-router-dom'

function BotonesGrupo({ mostrarEnPantalla }) {
  const [activo, setActivo] = useState(mostrarEnPantalla || 'notificaciones')
  const navigate = useNavigate()

  const handleClick = (nombreBoton) => {
    setActivo(nombreBoton)
    navigate(`/usuarios/perfil/${nombreBoton}`)
  }

  //TODO: agregar funcionalidad a los botones ademas de cambiar de estado
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button
        className={
          activo === 'notificaciones'
            ? 'opcion-button-style-activo'
            : 'opcion-button-style'
        }
        onClick={() => handleClick('notificaciones')}
      >
        Notificaciones
      </button>
      <button
        className={
          activo === 'reservas' ? 'opcion-button-style-activo' : 'opcion-button-style'
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
