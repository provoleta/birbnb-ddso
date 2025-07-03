import { Checkbox } from '@mui/material'
import '../../perfil.css'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import MessageIcon from '@mui/icons-material/Message'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread'

const NotificationCard = ({
  mensaje,
  fechaAlta,
  leida,
  fechaLeida,
  idNotificacion,
  handlerMarcarLeida,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const onMarcarLeida = async () => {
    console.log('Id de la notificacion a leer: ', idNotificacion)
    await handlerMarcarLeida(idNotificacion)
  }

  const iconoSegunLeida = (leida) => {
    return leida ? (
      <MarkEmailReadIcon style={{ color: '#4CAF50' }} />
    ) : (
      <MarkEmailUnreadIcon style={{ color: '#F44336' }} />
    )
  }

  return (
    <div className="card-container">
      <CircleNotificationsIcon
        style={{ fontSize: 64, margin: 0 }}
        className="notification-icon"
      />
      <div className="notification-card-content">
        <div className="notification-info">
          <MessageIcon style={{ color: '#2196F3' }} />
          <h3>{mensaje}</h3>
        </div>
        <div className="notification-info">
          <CalendarTodayIcon style={{ color: '#666' }} />

          <h3>Fecha alta: {formatDate(fechaAlta)}</h3>
        </div>
        <div className="notification-info">
          {iconoSegunLeida(leida)}
          <h3> {leida ? `Leída: ${formatDate(fechaLeida)}` : 'No Leída'}</h3>
        </div>
      </div>
      <div className="card-end">
        <h4>{leida ? '' : 'Marcar como leída'}</h4>
        <Checkbox checked={leida} onChange={onMarcarLeida} disabled={leida} />
      </div>
    </div>
  )
}

export default NotificationCard
