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
            <button className="button-iniciar-sesion"> Iniciar Sesion </button>
          </div>
        </div>
        <div className="app-nav-search">
          <input className="main-input left" type="text" placeholder="Buscar" />
          <input className="main-input" type="date" placeholder="Check-in" />
          <input className="main-input" type="date" placeholder="Check-out" />
          <input className="main-input right" type="number" placeholder="Huespedes" min="1" />
          <button className="button-busqueda">Buscar</button>
        </div>
      </div>
    </AppBar>
  )
}

export default Navbar
