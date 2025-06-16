import { useParams } from 'react-router-dom'
import './detail-page.css'
import { alojamientos } from './alojamientosMockeados.js'
import CaracteristicaItem from '../../components/caracteristica/caracteristica-item.jsx'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import SliderFotos from '../../components/slider-fotos/slider-fotos.jsx'
import ReservationCalendar from '../../components/calendario-reserva/calendario-reserva.jsx'
const AlojamientoDetail = () => {
  const { id } = useParams()
  const alojamiento = alojamientos.find((alojamiento) => alojamiento.id === Number(id))

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
        <div className="contenedor-direccion">
          <div className="contenedor-titulo">
            <h1>{alojamiento.nombre}</h1>
          </div>
          <p className="especificacion-direccion">
            <LocationOnIcon fontSize="small" className="location-icon" />
            {alojamiento.direccion.calle} {alojamiento.direccion.numero},{' '}
            {alojamiento.direccion.ciudad} {alojamiento.direccion.pais}
          </p>
          <p className="locacion-puntual">
            <GpsFixedIcon fontSize="small" className="gps-icon" />
            Latitud: {alojamiento.direccion.lat} Longitud: {alojamiento.direccion.long}
          </p>
        </div>
      </div>
      <section className="imagenes">
        <SliderFotos images={alojamiento.fotos} />
      </section>

      <div className="contenedor-facheroinferior">
        <div className="contendor-inferior-foto">
          <section className="detalles-alojamiento">
            <div className="descripcion">
              <h2 className="titulo-descripcion">Descripcion alojamiento</h2>
              <p>{alojamiento.descripcion}</p>
            </div>
            <h1 className="titulo-caracteristicas">¿Que ofrece este lugar?</h1>
            <section className="caracteristicas">
              {alojamiento.caracteristicas.map((caracteristica) => (
                <CaracteristicaItem caracteristica={caracteristica} />
              ))}
            </section>

            <div className="anfitrion">
              <h2>Anfitrion</h2>
              <div className="perfil">
                <img className="avatar" src="/images/16480.png" alt="Foto de perfil" />

                <div className="informacion-perfil">
                  <h4>{alojamiento.anfitrion.nombre}</h4>
                  <p className="email">Contacto: {alojamiento.anfitrion.email}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="contenedor-reserva">
            <header className="encabezado-reserva">
              ${alojamiento.precioPorNoche} {moneda(alojamiento.moneda)} por noche
            </header>
            <div className="contenedor-datepicker">
              <div className="contenedor-fechas">
                <ReservationCalendar reservas={alojamiento.reservas} />
              </div>
            </div>
            <button className="boton-reservar">Reservar</button>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AlojamientoDetail
