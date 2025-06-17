import NotificationCard from '../notification-card/notification-card'
import SortButton from '../sort-button/sort-button'
import { useMemo } from 'react'
import { usuarios } from '../../usuariosMock'
import '../../notificaciones.css'

const MostrarNotificaciones = ({ userId, sortOption, handleSortChange }) => {
  const usuario = usuarios.find((usuario) => usuario._id === userId)
  const notificaciones = usuario.notificaciones

  // Ordenar notificaciones usando useMemo para evitar cálculos innecesarios
  const sortedNotifications = useMemo(() => {
    const notificationsCopy = [...notificaciones] // Crea una copia para no modificar el original

    return notificationsCopy.sort((a, b) => {
      if (sortOption === 'Leidas primero') {
        if (a.leida && !b.leida) return -1
        if (!a.leida && b.leida) return 1
        return 0
      } else {
        if (!a.leida && b.leida) return -1
        if (a.leida && !b.leida) return 1
        return 0
      }
    })
  }, [sortOption]) // Se recalcula solo cuando cambia la opción de ordenamiento

  return (
    <>
      <h2>Tus notificaciones</h2>
      <div className="button-container">
        <SortButton currentSortOption={sortOption} onSortChange={handleSortChange} />
      </div>
      <div className="fondo-gris">
        {sortedNotifications.map((result) => (
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
