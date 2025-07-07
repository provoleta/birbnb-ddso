import './onSession.css'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import NotificationIcon from '@mui/icons-material/Notifications'
import HomeIcon from '@mui/icons-material/Home'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import LogoutIcon from '@mui/icons-material/Logout'
import PlusIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router'
import { useAuthContext } from '../../../store/auth-context'
import { useState, useEffect, useRef } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

export function OnSession() {
  const { handleLogout, user } = useAuthContext()
  const tipoUsuario = user?.tipo
  const navigate = useNavigate()
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef(null)
  const avatarRef = useRef(null)
  const sessionButtonsRef = useRef(null)

  const nuevoAlojamiento = () => {
    navigate('/upload')
  }

  const verPerfil = (opcion) => {
    navigate(`/usuarios/perfil${opcion}`)
    setMenuOpen(false)
  }

  const getImageSrc = (base64String) => {
    if (!base64String) return null
    if (base64String.startsWith('data:')) return base64String
    return `data:image/jpeg;base64,${base64String}`
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false)
      }
      if (
        menuOpen &&
        sessionButtonsRef.current &&
        !sessionButtonsRef.current.contains(event.target) &&
        !event.target.closest('.hamburger-menu')
      ) {
        setMenuOpen(false)
      }
    }
    if (profileMenuOpen || menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileMenuOpen, menuOpen])

  return (
    <div className="onSession">
      <div className="hamburger-menu">
        <IconButton onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </div>
      <div
        className={`session-buttons${menuOpen ? ' open' : ''}`}
        ref={sessionButtonsRef}
      >
        <IconButton onClick={nuevoAlojamiento}>
          <PlusIcon />
        </IconButton>
        <IconButton onClick={() => verPerfil('/notificaciones')}>
          <NotificationIcon />
        </IconButton>
        <IconButton onClick={() => verPerfil('/reservas')}>
          <BookmarkIcon />
        </IconButton>
        {tipoUsuario === 'ANFITRION' && (
          <IconButton onClick={() => verPerfil('/alojamientos')}>
            <HomeIcon />
          </IconButton>
        )}
      </div>
      <div className="user-info">
        <Avatar
          alt="User Avatar"
          src={getImageSrc(user?.profileImage)}
          ref={avatarRef}
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
        />
        <div className={`profile-menu${profileMenuOpen ? ' open' : ''}`} ref={menuRef}>
          <IconButton className="menu-button" onClick={handleLogout}>
            <p className="logOut-titulo" style={{ marginRight: '10px' }}>
              Cerrar sesión{' '}
            </p>
            <LogoutIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
