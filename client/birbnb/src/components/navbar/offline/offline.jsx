import './offline.css'
import { useState } from 'react'
import SesionFlotante from '../../sesion-flotante/sesion-flotante'
import MenuIcon from '@mui/icons-material/Menu'

export function Offline() {
  const [showSesionFlotante, setShowSesionFlotante] = useState(false)
  const [initialMode, setInitialMode] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const login = () => {
    setShowSesionFlotante(true)
    setInitialMode('login')
  }

  const register = () => {
    setShowSesionFlotante(true)
    setInitialMode('register')
  }

  return (
    <nav>
      <div className="app-nav-links">
        <div className="underline-button" onClick={register}>
          Crear Cuenta
        </div>
        <button className="button-iniciar-sesion" onClick={login}>
          Iniciar Sesion
        </button>
      </div>
      <div className="hamburger-menu">
        <MenuIcon
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          className="hamburger-icon"
        />
        {menuOpen && (
          <>
            <div className="menu-backdrop" onClick={() => setMenuOpen(false)}></div>
            <div className="menu-content">
              <button className="menu-button" onClick={login}>
                Iniciar Sesión
              </button>
              <button className="menu-button" onClick={register}>
                Crear Cuenta
              </button>
            </div>
          </>
        )}
      </div>
      <SesionFlotante
        isOpen={showSesionFlotante}
        onClose={() => setShowSesionFlotante(false)}
        initialMode={initialMode}
      />
    </nav>
  )
}
