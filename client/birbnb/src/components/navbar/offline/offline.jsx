import { useNavigate } from 'react-router-dom'
import './offline.css'

export function Offline() {
  const navigate = useNavigate()

  const login = () => {
    navigate('/login')
  }

  const register = () => {
    navigate('/register')
  }
  //TODO: Estaria bueno que Crear Cuenta sea un boton que te redireccione al formulario para registrarte
  return (
    <div className="app-nav-links">
      <div className="underline-button"> ¿Sos Anfitrión? </div>

      <div className="underline-button" onClick={register}>
        Crear Cuenta
      </div>
      <button className="button-iniciar-sesion" onClick={login}>
        Iniciar Sesion
      </button>
    </div>
  )
}
