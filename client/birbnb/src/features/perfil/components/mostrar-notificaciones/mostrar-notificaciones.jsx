import NotificationCard from '../notification-card/notification-card'
import SortButton from '../sort-button/sort-button'
import { useEffect, useState } from 'react'
import '../../perfil.css'
import { useNavigate } from 'react-router'
import api from '../../../../api/api'
import { useAuthContext } from '../../../../store/auth-context'
import CircularIndeterminate from '../../../../components/loader/loader'

const MostrarNotificaciones = () => {
  const [sortOption, setSortOption] = useState('No leidas') // Inicialmente se ordena por no leidas
  const [notificaciones, setNotificaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const { token, logueado, loadingAuth } = useAuthContext()
  const [leida, setLeida] = useState(false) //Por defecto quiero mostrar las no leidas

  const handleSortChange = (option) => {
    setSortOption(option)
  }

  const navigate = useNavigate()

  useEffect(() => {
    sortOption === 'Leidas' ? setLeida(true) : setLeida(false)
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

  if (loading) {
    return <CircularIndeterminate />
  }

  const handlerMarcarLeida = async (idNotificacion) => {
    await api.marcarComoLeida(idNotificacion)
    const response = await api.getNotificaciones(token, leida)
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
              key={result.idNotificacion}
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
      {notificaciones.length === 0 && <p>Sin notificaciones.</p>}
    </>
  )
}

export default MostrarNotificaciones
