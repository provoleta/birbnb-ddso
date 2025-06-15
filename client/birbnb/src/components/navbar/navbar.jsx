import './Navbar.css'
import { AppBar } from '@mui/material'
import SearchBar from '../seach-bar/search-bar'
import LogoConAudio from '../../features/sound-icon/sound-icon'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const login = () => {
    navigate('/login')
  }

  return (
    <AppBar position="static" elevation={0}>
      <div className="app-nav">
        <div className="app-nav-header">
          <div className="app-nav-logo">
            {/* <img src="/images/logo.png" alt="Logo" /> */}
            <LogoConAudio />
          </div>
          <div className="app-nav-links">
            <div> ¿Sos Anfitrión? </div>
            <div> Crear Cuenta </div>
            <button className="button-iniciar-sesion" onClick={login}>
              Iniciar Sesion
            </button>
          </div>
        </div>
        <SearchBar />
      </div>
    </AppBar>
  )
}

export default Navbar
