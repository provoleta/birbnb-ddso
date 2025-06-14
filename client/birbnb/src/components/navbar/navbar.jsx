import './Navbar.css'
import { AppBar } from '@mui/material'
import SearchBar from '../seach-bar/search-bar'

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
          <SearchBar />
        </div>
      </div>
    </AppBar>
  )
}

export default Navbar
