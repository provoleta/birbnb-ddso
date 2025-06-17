import './onSession.css'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import NotificationIcon from '@mui/icons-material/Notifications'
import { useNavigate } from 'react-router'
import { useAuthContext } from '../../../store/auth-context'

export function OnSession() {
  const user = useAuthContext() //TODO: terminar de hacerlo andar
  const navigate = useNavigate()
  const verNotificaciones = () => {
    navigate(`/usuarios/notificaciones/${user.token}`)
  }

  return (
    <div className="onSession">
      <IconButton onClick={verNotificaciones}>
        <NotificationIcon />
      </IconButton>
      <Avatar alt="User Avatar" src="/images/user-avatar.png" />
    </div>
  )
}
