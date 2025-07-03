import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './detail-page.css'
// Abstraccion de componentes
import SliderFotos from './components/slider-fotos/slider-fotos.jsx'
import ReservationCalendar from './components/calendario-reserva/calendario-reserva.jsx'
import Anfitrion from './components/anfitrion-detail/anfitrion-detail.jsx'
import Direccion from './components/direccion-detail/direccion-detail.jsx'
import Detalles from './components/detalles-detail/detalles-detail.jsx'
import Mapa from './components/mapa-detail/mapa-detail.jsx'
import CircularIndeterminate from '../../components/loader/loader.jsx'

// Creacion de reserva
import api from '../../api/api.jsx'
import useCreacionReserva from './components/creacion-reserva/creacion-reserva.jsx'
import SesionFlotante from '../../components/sesion-flotante/sesion-flotante.jsx'

import { useAuthContext } from '../../store/auth-context.jsx'
import VentanaFlotanteReserva from './components/ventana-flotante/ventanaFlotante.jsx'

const AlojamientoDetail = () => {
  const { id } = useParams()
  const [alojamiento, setAlojamiento] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fechas, setFechas] = useState([null, null])
  const [showConfirmacionReserva, setConfirmacionReserva] = useState(false)
  const { procesarReserva } = useCreacionReserva(
    fechas,
    id,
    showConfirmacionReserva,
    setConfirmacionReserva,
  )

  const { logueado } = useAuthContext()
  const [showSesionFlotante, setShowSesionFlotante] = useState(false)
  const [initialMode, setInitialMode] = useState('login')

  const handlerReservar = () => {
    if (!logueado) {
      setShowSesionFlotante(true)
      setInitialMode('register')
    } else {
      procesarReserva()
    }
  }
  useEffect(() => {
    api
      .obtenerAlojamiento(id)
      .then((data) => {
        setAlojamiento(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error al obtener alojamiento:', error)
        setLoading(false)
      })
  }, [id])

  const handlerFechas = (nuevasFechas) => {
    setFechas(nuevasFechas)
  }

  if (loading) {
    return (
      // <div className="loading-container">
      //   <p className="loading-text">Cargando información del alojamiento...</p>
      // </div>ç
      <CircularIndeterminate></CircularIndeterminate>
    )
  }

  if (!alojamiento) return <div> `{} Alojamiento no encontrado😔`</div>

  const moneda = (monedaOriginal) => {
    switch (monedaOriginal) {
      case 'DOLAR_USA':
        return 'USD'
      case 'PESO_ARG':
        return 'ARS'
      case 'REALES':
        return 'BRL'
      default:
        return ''
    }
  }

  return (
    <div className="contenedor-general">
      <div className="contenedor-fachero">
        <Direccion alojamiento={alojamiento} />
      </div>
      <section className="imagenes">
        <SliderFotos images={alojamiento.fotos} />
      </section>

      <div className="contenedor-facheroinferior">
        <div className="contendor-inferior-foto">
          <section className="detalles-alojamiento">
            <Detalles alojamiento={alojamiento} />
            <Anfitrion alojamiento={alojamiento} />
          </section>

          <section className="contenedor-reserva">
            <header className="encabezado-reserva">
              {moneda(alojamiento.moneda)} {alojamiento.precioPorNoche} por noche
            </header>
            <div className="contenedor-datepicker">
              <ReservationCalendar
                reservas={alojamiento.reservas}
                onFechas={handlerFechas}
              />
            </div>
            <button
              className="boton-reservar"
              onClick={handlerReservar}
              disabled={!fechas[0] || !fechas[1]}
              type="button"
            >
              Reservar
            </button>
          </section>
        </div>
        {showConfirmacionReserva && (
          <div>
            <VentanaFlotanteReserva
              mensaje={'¡Reserva creada con éxito!'}
              onClose={() => {
                setConfirmacionReserva(false)
                window.location.reload()
              }}
            />
          </div>
        )}
      </div>
      <div className="contenedor-mapa">
        <div className="contenedor-centrado">
          <div className="contenedor-titulomapa">
            <h2 className="titulo-mapa">¿Dónde vas a estar?</h2>
          </div>
          <Mapa alojamiento={alojamiento}></Mapa>
        </div>
      </div>
      <SesionFlotante
        isOpen={showSesionFlotante}
        onClose={() => setShowSesionFlotante(false)}
        initialMode={initialMode}
      />
    </div>
  )
}

export default AlojamientoDetail
