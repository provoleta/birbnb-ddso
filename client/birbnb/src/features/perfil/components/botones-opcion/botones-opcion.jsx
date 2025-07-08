import { useState } from 'react'
import '../../perfil.css'
import { useNavigate } from 'react-router-dom'
import './botones.css'
import { useAuthContext } from '../../../../store/auth-context.jsx'

function BotonesGrupo({ mostrarEnPantalla }) {
  const [activo, setActivo] = useState(mostrarEnPantalla)
  const { esAnfitrion } = useAuthContext()
  const navigate = useNavigate()
  const handleClick = (nombreBoton) => {
    setActivo(nombreBoton)
    navigate(`/usuarios/perfil/${nombreBoton}`)
  }
  const { user } = useAuthContext()
  const tipoUsuario = user?.tipo

  const path = window.location.pathname.split('/').pop()

  return (
    <div className="botones-opcion-container">
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

      {tipoUsuario === 'ANFITRION' && (
        <button
          className={
            path === 'alojamientos' ? 'opcion-button-style-activo' : 'opcion-button-style'
          }
          onClick={() => handleClick('alojamientos')}
        >
          Alojamientos
        </button>
      )}

      {tipoUsuario === 'ANFITRION' && (
        <button
          className={
            path === 'reservas-pendientes'
              ? 'opcion-button-style-activo'
              : 'opcion-button-style'
          }
          onClick={() => handleClick('reservas-pendientes')}
        >
          Reservas pendientes
        </button>
      )}
    </div>
  )
}

export default BotonesGrupo
