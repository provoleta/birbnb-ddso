import './onSession.css'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import NotificationIcon from '@mui/icons-material/Notifications'
import { useNavigate } from 'react-router'
import { useAuthContext } from '../../../store/auth-context'
import { useState } from 'react'

export function OnSession() {
  const { user, handleLogout } = useAuthContext() //TODO: terminar de hacerlo andar
  const navigate = useNavigate()
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  const verNotificaciones = () => {
    navigate(`/usuarios/notificaciones/${user.token}`)
  }

  return (
    <div className="onSession">
      <IconButton onClick={verNotificaciones}>
        <NotificationIcon />
      </IconButton>
      <Avatar
        alt="User Avatar"
        src="/images/user-avatar.png"
        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
      />
      {profileMenuOpen && (
        <div className="profileMenu">
          <button>Perfil</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  )
}
