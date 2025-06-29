import './offline.css'
import { useState } from 'react'
import SesionFlotante from '../../sesion-flotante/sesion-flotante'

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
      {/* Links visibles en desktop */}
      <div className="app-nav-links">
        <div className="underline-button" onClick={register}>
          Crear Cuenta
        </div>
        <button className="button-iniciar-sesion" onClick={login}>
          Iniciar Sesion
        </button>
      </div>

      {/* Menú hamburguesa para mobile */}
      <div className="hamburger-menu">
        <button
          className="hamburger-icon"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          &#9776;
        </button>
        {menuOpen && (
          <>
            {/* Fondo oscuro para cerrar el menú al hacer clic fuera */}
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
