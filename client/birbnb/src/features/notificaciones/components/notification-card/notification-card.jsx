import { Checkbox } from '@mui/material'
import '../../notificaciones.css'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import Api from '../../../../api/api'

const NotificationCard = ({
  mensaje,
  fechaAlta,
  leida,
  fechaLeida,
  idNotificacion,
  handlerMarcarLeida,
}) => {
  const onMarcarLeida = async () => {
    console.log('Id de la notificacion a leer: ', idNotificacion)
    await handlerMarcarLeida(idNotificacion)
  }

  return (
    <div className="card-container">
      <CircleNotificationsIcon
        style={{ fontSize: 64, margin: 0 }}
        className="notification-icon"
      />
      <div className="notification-card-content">
        <h3>{mensaje}</h3>
        <h3>Fecha alta: {fechaAlta}</h3>
        <h3>Leida: {leida ? 'Si' : 'No'}</h3>
        {leida ? <h3>Fecha leida: {fechaLeida}</h3> : <></>}
      </div>
      <div className="card-end">
        <></>
        <Checkbox onClick={onMarcarLeida} disabled={leida} />
      </div>
    </div>
  )
}

export default NotificationCard
