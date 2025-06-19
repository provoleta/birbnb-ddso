import './Navbar.css'
import { AppBar } from '@mui/material'
import SearchBar from '../seach-bar/search-bar'
import LogoConAudio from '../../features/sound-icon/sound-icon'
import { Offline } from './offline/offline.jsx'
import { OnSession } from './onSession/onSession.jsx'
import { useAuthContext } from '../../store/auth-context'

const Navbar = () => {
  const { logueado } = useAuthContext()
  return (
    <AppBar position="static" elevation={0}>
      <div className="app-nav">
        <div className="app-nav-header">
          <div className="app-nav-logo">
            {/* <img src="/images/logo.png" alt="Logo" /> */}
            <LogoConAudio />
          </div>
          {/* {console.log('logueado', logueado)} */}
          {logueado ? <OnSession /> : <Offline />}
        </div>
        <SearchBar />
      </div>
    </AppBar>
  )
}

export default Navbar
