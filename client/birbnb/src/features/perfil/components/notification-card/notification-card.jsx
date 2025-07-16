import { Checkbox } from '@mui/material'
import '../../perfil.css'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import MessageIcon from '@mui/icons-material/Message'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread'
import Loader from '../../../../components/loader/loader.jsx'

const NotificationCard = ({
  mensaje,
  fechaAlta,
  leida,
  fechaLeida,
  idNotificacion,
  handlerMarcarLeida,
  isLoading = false,
}) => {
  const formatDate = (dateString) => {
    const fechaStr = dateString.split('T')[0]
    const date = new Date(fechaStr + 'T00:00:00')
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const onMarcarLeida = async () => {
    await handlerMarcarLeida(idNotificacion)
  }

  const iconoSegunLeida = (leida) => {
    return leida ? (
      <MarkEmailReadIcon style={{ color: '#4CAF50' }} />
    ) : (
      <MarkEmailUnreadIcon style={{ color: '#F44336' }} />
    )
  }

  const formatMessage = (m) => {
    const isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/g

    return m.replace(isoDateRegex, (match) => {
      return formatDate(match)
    })
  }

  return (
    <>
      {isLoading ? (
        <div
          className="card-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'auto',
            maxHeight: 'auto',
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className="card-container">
          <CircleNotificationsIcon
            style={{ fontSize: 64, margin: 0 }}
            className="notification-icon"
          />
          <div className="notification-card-content">
            <div className="notification-info">
              <MessageIcon style={{ color: '#2196F3' }} />
              <h3>{formatMessage(mensaje)}</h3>
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
            {!leida && (
              <label htmlFor={`checkbox-${idNotificacion}`}>
                <h4>Marcar como leída</h4>
              </label>
            )}
            <Checkbox
              id={`checkbox-${idNotificacion}`}
              checked={leida}
              onChange={onMarcarLeida}
              disabled={leida}
              aria-label="Marcar como leída"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default NotificationCard
