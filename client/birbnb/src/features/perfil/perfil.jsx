import './perfil.css'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import BotonesGrupo from './components/botones-opcion/botones-opcion.jsx'
import MostrarNotificaciones from './components/mostrar-notificaciones/mostrar-notificaciones.jsx'
import MostrarReservas from './components/mostrar-reservas/mostrar-reservas.jsx'
import MostrarAlojamientos from './components/mostrar-alojamientos/mostrar-alojamientos.jsx'

export default function Perfil({ mostrarEnPantalla }) {
  return (
    <div>
      <div className="perfil-container">
        <div className="perfil-opciones-container">
          <BotonesGrupo activo={mostrarEnPantalla} />
        </div>
        <div className="fondo-perfil">
          <div>
            {mostrarEnPantalla === 'notificaciones' ? (
              <MostrarNotificaciones />
            ) : mostrarEnPantalla === 'reservas' ? (
              <MostrarReservas />
            ) : (
              <MostrarAlojamientos />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
