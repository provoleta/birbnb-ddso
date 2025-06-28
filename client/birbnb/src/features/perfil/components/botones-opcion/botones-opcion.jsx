import { useState } from 'react'
import '../../perfil.css'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../store/auth-context.jsx'

function BotonesGrupo({ mostrarEnPantalla }) {
  const [activo, setActivo] = useState(mostrarEnPantalla)
  const { esAnfitrion } = useAuthContext()
  const navigate = useNavigate()

  const handleClick = (nombreBoton) => {
    setActivo(nombreBoton)
    navigate(`/usuarios/perfil/${nombreBoton}`)
  }

  // TODO: agregar funcionalidad a los botones ademas de cambiar de estado
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
      {esAnfitrion && (
        <button
          className={
            activo === 'alojamientos'
              ? 'opcion-button-style-activo'
              : 'opcion-button-style'
          }
          onClick={() => handleClick('alojamientos')}
        >
          Alojamientos
        </button>
      )}
    </div>
  )
}

export default BotonesGrupo
