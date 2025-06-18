import NotificationCard from '../notification-card/notification-card'
import SortButton from '../sort-button/sort-button'
import { useEffect, useState } from 'react'
import '../../notificaciones.css'
import { useNavigate } from 'react-router'
import Api from '../../../../api/api'
import { useAuthContext } from '../../../../store/auth-context'

const MostrarNotificaciones = ({ id, sortOption, handleSortChange }) => {
  const [notificaciones, setNotificaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const { token, logueado } = useAuthContext()
  const [leida, setLeida] = useState(false) //Por defecto quiero mostrar las no leidas
  const navigate = useNavigate()

  useEffect(() => {
    sortOption === 'Leidas' ? setLeida(true) : setLeida(false)
  }, [sortOption])

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await Api().getNotificaciones(token, leida)
        // const data = await response.json()
        setNotificaciones(response)
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotificaciones()
  }, [token, leida])

  if (!logueado) {
    navigate('/')
  }

  if (loading) {
    return <div>Cargando reservas...</div>
  }

  return (
    <>
      <h2>Tus notificaciones</h2>
      <div className="button-container">
        <SortButton currentSortOption={sortOption} onSortChange={handleSortChange} />
      </div>
      <div className="fondo-gris">
        {notificaciones.map((result) => (
          <NotificationCard
            mensaje={result.mensaje}
            fechaAlta={result.fechaAlta}
            leida={result.leida}
            fechaLeida={result.fechaLeida}
          />
        ))}
      </div>
    </>
  )
}

export default MostrarNotificaciones
