import './onSession.css'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import NotificationIcon from '@mui/icons-material/Notifications'
import HomeIcon from '@mui/icons-material/Home'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router'
import { useAuthContext } from '../../../store/auth-context'
import { useState } from 'react'
import { useEffect, useRef } from 'react'

export function OnSession() {
  const { handleLogout, user } = useAuthContext() //TODO: terminar de hacerlo andar
  const tipoUsuario = user?.tipo
  const navigate = useNavigate()
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  const verPerfil = (opcion) => {
    navigate(`/usuarios/perfil${opcion}`)
  }

  const menuRef = useRef(null)
  const avatarRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false)
      }
    }
    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileMenuOpen])

  return (
    <div className="onSession">
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
      <div className="user-info">
        <Avatar
          alt="User Avatar"
          src="/images/user-avatar.png"
          ref={avatarRef}
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
        />
        {profileMenuOpen && (
          <div className="profile-menu" ref={menuRef}>
            <IconButton className="menu-button" onClick={handleLogout}>
              <p className="logOut-titulo" style={{ marginRight: '10px' }}>
                Cerrar sesión{' '}
              </p>
              <LogoutIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  )
}
