import { useNavigate } from 'react-router-dom'
import './offline.css'

export function Offline() {
  const navigate = useNavigate()

  const login = () => {
    navigate('/login')
  }

  return (
    <div className="app-nav-links">
      <div> ¿Sos Anfitrión? </div>
      <div> Crear Cuenta </div>
      <button className="button-iniciar-sesion" onClick={login}>
        Iniciar Sesion
      </button>
    </div>
  )
}
