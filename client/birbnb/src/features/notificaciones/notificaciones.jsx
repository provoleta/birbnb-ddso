import { useParams } from 'react-router'
import { usuarios } from './usuariosMock.js'
import './notificaciones.css'
import { useState } from 'react'
import NotificationCard from './components/notification-card/notification-card.js'
import BotonesGrupo from './components/filters/tipos-de-notificaciones.jsx'
import { Icon } from '@mui/material'

export default function Notificaciones() {
  const [sortOption, setSortOption] = useState('') // Inicialmente se ordena por menor precio
  const [currentPage, setCurrentPage] = useState(1) // Estado para la página actual
  const itemsPerPage = 10 // Número de alojamientos por página
  const { id } = useParams()
  const usuario = usuarios.find((usuario) => usuario.id === Number(id))
  const notificaciones = usuario.notificaciones
  if (!usuario) return <div>Usuario no encontrado😔</div>

  return (
    <div>
      <div className="notifications-container">
        <div className="notifications-filters-container">
          <h2>Tus notificaciones</h2>
          <BotonesGrupo />
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
      </div>
    </div>
  )
}
