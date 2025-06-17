import { useParams } from 'react-router-dom'
import './detail-page.css'
import { alojamientos } from './alojamientosMockeados.js'
import SliderFotos from './components/slider-fotos/slider-fotos.jsx'
import ReservationCalendar from './components/calendario-reserva/calendario-reserva.jsx'
import Anfitrion from './components/anfitrion-detail/anfitrion-detail.jsx'
import { useState } from 'react'
import Direccion from './components/direccion-detail/direccion-detail.jsx'
import useCreacionReserva from './components/creacion-reserva/creacion-reserva.jsx'
import Detalles from './components/detalles-detail/detalles-detail.jsx'

const AlojamientoDetail = () => {
  const { id } = useParams()
  const alojamiento = alojamientos.find((alojamiento) => alojamiento.id === Number(id))

  const [fechas, setFechas] = useState([null, null])

  const handlerFechas = (nuevasFechas) => {
    setFechas(nuevasFechas)
  }

  const { procesarReserva } = useCreacionReserva(fechas, alojamiento.id)

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
              ${alojamiento.precioPorNoche} {moneda(alojamiento.moneda)} por noche
            </header>
            <div className="contenedor-datepicker">
              <ReservationCalendar
                reservas={alojamiento.reservas}
                onFechas={handlerFechas}
              />
            </div>
            <button
              className="boton-reservar"
              onClick={procesarReserva}
              disabled={!fechas[0] || !fechas[1]}
            >
              Reservar
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AlojamientoDetail
