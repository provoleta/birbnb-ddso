import './perfil.css'
import { useState } from 'react'
import BotonesGrupo from './components/filters/tipos-de-notificaciones.jsx'
import MostrarNotificaciones from './components/mostrar-notificaciones/mostrar-notificaciones.jsx'
import MostrarReservas from './components/mostrar-reservas/mostrar-reservas.jsx'
import MostrarAlojamientos from './components/mostrar-alojamientos/mostrar-alojamientos.jsx'

export default function Perfil() {
  const [mostrarEnPantalla, setMostrarEnPantalla] = useState('notificaciones')

  return (
    <div>
      <div className="perfil-container">
        <div className="perfil-opciones-container">
          <BotonesGrupo setMostrar={setMostrarEnPantalla} />
        </div>
        <div className="fondo-perfil">
          <div>
            {mostrarEnPantalla === 'notificaciones' ? (
              <MostrarNotificaciones />
            ) : mostrarEnPantalla === 'reservas' ? (
              <MostrarReservas />
            ) : (
              mostrarEnPantalla === 'alojamientos'(<MostrarAlojamientos />)
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
