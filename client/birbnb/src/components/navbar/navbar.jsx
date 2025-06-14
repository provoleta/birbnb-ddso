import './Navbar.css'
import { AppBar } from '@mui/material'

const Navbar = () => {
  return (
    <AppBar position="static" elevation={0}>
      <div className="app-nav">
        <div className="app-nav-header">
          <div className="app-nav-logo">
            <img src="/images/logo.png" alt="Logo" />
          </div>
          <div className="app-nav-links">
            <div> ¿Sos Anfitrion? </div>
            <div> Crear Cuenta </div>
            <div> Iniciar Sesion </div>
          </div>
        </div>
        <div className="app-nav-search">
          <input type="text" placeholder="Buscar" />
          <input type="date" placeholder="Check-in" />
          <input type="date" placeholder="Check-out" />
          <input type="number" placeholder="Huespedes" />
          <button>Buscar</button>
        </div>
      </div>
    </AppBar>
  )
}

export default Navbar
