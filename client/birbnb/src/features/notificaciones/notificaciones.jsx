import { useParams } from 'react-router'
import './notificaciones.css'
import { useState } from 'react'
import BotonesGrupo from './components/filters/tipos-de-notificaciones.jsx'
import MostrarNotificaciones from './components/mostrar-notificaciones/mostrar-notificaciones.jsx'

export default function Notificaciones() {
  const [sortOption, setSortOption] = useState('No leidas primero') // Inicialmente se ordena por no leidas
  const [currentPage, setCurrentPage] = useState(1) // Estado para la página actual
  const itemsPerPage = 10 // Número de alojamientos por página
  const { id } = useParams()

  const [mostrarEnPantalla, setMostrarEnPantalla] = useState('notificaciones')

  const handleSortChange = (option) => {
    setSortOption(option)
  }

  return (
    <div>
      <div className="notifications-container">
        <div className="notifications-filters-container">
          <BotonesGrupo setMostrar={setMostrarEnPantalla} />
        </div>
        <div className="fondo-notificaciones">
          <div>
            {mostrarEnPantalla === 'notificaciones' ? (
              <MostrarNotificaciones
                userId={id}
                sortOption={sortOption}
                handleSortChange={handleSortChange}
              />
            ) : mostrarEnPantalla === 'reservas' ? (
              <></>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
