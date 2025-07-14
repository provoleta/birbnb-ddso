import NotificationCard from '../notification-card/notification-card'
import SortButton from '../sort-button/sort-button'
import { useEffect, useState } from 'react'
import '../../perfil.css'
import { useNavigate } from 'react-router'
import api from '../../../../api/api'
import { useAuthContext } from '../../../../store/auth-context'
import Loader from '../../../../components/loader/loader.jsx'
const MostrarNotificaciones = () => {
  const [sortOption, setSortOption] = useState('No leidas') // Inicialmente se ordena por no leidas
  const [notificaciones, setNotificaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingNotifications, setLoadingNotifications] = useState({}) // Estado para loaders individuales
  const { token, logueado, loadingAuth } = useAuthContext()
  const [leida, setLeida] = useState(false) //Por defecto quiero mostrar las no leidas

  const handleSortChange = (option) => {
    setSortOption(option)
  }

  const navigate = useNavigate()

  useEffect(() => {
    sortOption === 'Leidas' ? setLeida(true) : setLeida(false)
    setLoading(true) // Activa el loader cuando cambia el filtro
  }, [sortOption])

  useEffect(() => {
    if (!loadingAuth && logueado) {
      const fetchNotificaciones = async () => {
        try {
          const response = await api.getNotificaciones(leida)
          setNotificaciones(Array.isArray(response) ? response : [])
        } catch (error) {
          console.error('Error al obtener las notificaciones:', error.message)
        } finally {
          setLoading(false)
        }
      }
      fetchNotificaciones()
    }
  }, [token, leida, loadingAuth, logueado])

  useEffect(() => {
    if (!logueado && !loadingAuth) {
      navigate('/')
    }
  }, [logueado, loadingAuth, navigate])

  const handlerMarcarLeida = async (idNotificacion) => {
    try {
      // Activar loader para esta notificación específica
      setLoadingNotifications((prev) => ({ ...prev, [idNotificacion]: true }))

      await api.marcarComoLeida(idNotificacion)
      const response = await api.getNotificaciones(token, leida)
      setNotificaciones(response)
    } catch (error) {
      console.error('Error al marcar como leída:', error)
    } finally {
      // Desactivar loader para esta notificación específica
      setLoadingNotifications((prev) => ({ ...prev, [idNotificacion]: false }))
    }
  }

  return (
    <>
      <h2>Tus notificaciones</h2>
      <div className="button-container">
        <SortButton currentSortOption={sortOption} onSortChange={handleSortChange} />
      </div>
      {loading ? (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '55%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          {notificaciones.length > 0 && (
            <div className="fondo-gris">
              {notificaciones.map((result) => (
                <NotificationCard
                  key={result.idNotificacion}
                  mensaje={result.mensaje}
                  fechaAlta={result.fechaAlta}
                  leida={result.leida}
                  fechaLeida={result.fechaLeida}
                  idNotificacion={result.idNotificacion}
                  handlerMarcarLeida={handlerMarcarLeida}
                  isLoading={loadingNotifications[result.idNotificacion] || false}
                />
              ))}
            </div>
          )}
          {notificaciones.length === 0 && <p>Sin notificaciones.</p>}
        </>
      )}
    </>
  )
}

export default MostrarNotificaciones
