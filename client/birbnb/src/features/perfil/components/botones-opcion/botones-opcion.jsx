import { useState } from 'react'
import '../../perfil.css'
import { useNavigate } from 'react-router-dom'

function BotonesGrupo({ mostrarEnPantalla }) {
  const [activo, setActivo] = useState(mostrarEnPantalla)
  const navigate = useNavigate()
  const handleClick = (nombreBoton) => {
    setActivo(nombreBoton)
    navigate(`/usuarios/perfil/${nombreBoton}`)
  }

  const path = window.location.pathname.split('/').pop()

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button
        className={
          path === 'notificaciones' ? 'opcion-button-style-activo' : 'opcion-button-style'
        }
        onClick={() => handleClick('notificaciones')}
      >
        Notificaciones
      </button>
      <button
        className={
          path === 'reservas' ? 'opcion-button-style-activo' : 'opcion-button-style'
        }
        onClick={() => handleClick('reservas')}
      >
        Reservas
      </button>
      {/* <button
        className={
          path === 'alojamiento'
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
