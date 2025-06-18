import './onSession.css'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import NotificationIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout' // Importa el ícono de logout
import { useNavigate } from 'react-router'
import { useAuthContext } from '../../../store/auth-context'
import { useState } from 'react'
import { useEffect, useRef } from 'react'

export function OnSession() {
  const { user, handleLogout } = useAuthContext() //TODO: terminar de hacerlo andar

  const navigate = useNavigate()
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  const verNotificaciones = () => {
    navigate(`/usuarios/notificaciones/${user._id}`)
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
      <IconButton onClick={verNotificaciones}>
        <NotificationIcon />
      </IconButton>
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
                Log out{' '}
              </p>
              <LogoutIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  )
}
