import NotificationCard from '../notification-card/notification-card'
import SortButton from '../sort-button/sort-button'
import { useEffect, useState } from 'react'
import '../../perfil.css'
import { useNavigate } from 'react-router'
import api from '../../../../api/api'
import { useAuthContext } from '../../../../store/auth-context'

const MostrarNotificaciones = () => {
  const [sortOption, setSortOption] = useState('No leidas') // Inicialmente se ordena por no leidas
  const [notificaciones, setNotificaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const { token, logueado } = useAuthContext()
  const [leida, setLeida] = useState(false) //Por defecto quiero mostrar las no leidas

  const handleSortChange = (option) => {
    setSortOption(option)
  }

  const navigate = useNavigate()

  useEffect(() => {
    sortOption === 'Leidas' ? setLeida(true) : setLeida(false)
  }, [sortOption])

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await api.getNotificaciones(leida)
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
    return <div>Cargando notificaciones...</div>
  }

  const handlerMarcarLeida = async (idNotificacion) => {
    const notificacionActualizada = await api.marcarComoLeida(idNotificacion)

    console.log('Notificación actualizada:', notificacionActualizada)

    const response = await api.getNotificaciones(token, leida)
    // const data = await response.json()
    setNotificaciones(response)
  }

  return (
    <>
      <h2>Tus notificaciones</h2>
      <div className="button-container">
        <SortButton currentSortOption={sortOption} onSortChange={handleSortChange} />
      </div>
      {notificaciones.length > 0 && (
        <div className="fondo-gris">
          {notificaciones.map((result) => (
            <NotificationCard
              mensaje={result.mensaje}
              fechaAlta={result.fechaAlta}
              leida={result.leida}
              fechaLeida={result.fechaLeida}
              idNotificacion={result.idNotificacion}
              handlerMarcarLeida={handlerMarcarLeida}
            />
          ))}
        </div>
      )}
      {notificaciones.length === 0 && <p1>Sin notificaciones.</p1>}
    </>
  )
}

export default MostrarNotificaciones
