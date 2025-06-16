import { useParams } from 'react-router-dom'
import { Card } from '@mui/material'
import './detail-page.css'
import { alojamientos } from './alojamientosMockeados.js'
import CaracteristicaItem from '../../components/caracteristica/caracteristica-item.jsx'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import foto from './vojtech-bruzek-Yrxr3bsPdS0-unsplash.jpg'

const AlojamientoDetail = () => {
  const { id } = useParams()
  const alojamiento = alojamientos.find((alojamiento) => alojamiento.id === Number(id))

  if (!alojamiento) return <div> `{} Alojamiento no encontrado😔`</div>

  return (
    <div className="contenedor-general">
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
      <section className="imagenes">
        {/* aca pongo una fotarda para ver como va quedando el 
        diseño */}
        <img src={foto} alt="" className="foto-hotel" />
        {/* Carousel */}
        {/* <img src={alojamiento.fotos} alt={alojamiento.nombre} /> */}
      </section>
      <div className="contendor-inferior-foto">
        <section className="detalles-alojamiento">
          <div className="descripcion">
            <h2 className="titulo-descripcion">Descripcion alojamiento</h2>
            <p>{alojamiento.descripcion}</p>
          </div>

          <section className="caracteristicas">
            <h1 className="titulo-caracteristicas">¿Que ofrece este lugar?</h1>
            {alojamiento.caracteristicas.map((caracteristica) => (
              <CaracteristicaItem caracteristica={caracteristica} />
            ))}

            {/*
            1. En algun lugar tengo los 4 componentes de caracteristicas
            2. Recorro las caracteristicas y las transformo en uno de esos componentes
            3. Funcion intermedia que toma la caracteristica y devuelve el componente
            4. Cada caracteristica tiene un nombre y un icono
            */}
          </section>

          <div className="anfitrion">
            <div className="foto-perfil">
              <img></img>
            </div>
            <div className="informacion-perfil">
              <p>{alojamiento.anfitrion.nombre}</p>
              <p>{alojamiento.anfitrion.email}</p>
            </div>
          </div>
        </section>

        <section className="contenedor-reserva">
          <header>
            `${alojamiento.precioPorNoche} {alojamiento.moneda} por noche`
          </header>
          <div className="contenedor-datepicker">
            <div className="contenedor-fechas">
              <button></button>
            </div>
            <div className="contenedor-viajeros">
              <button></button>
            </div>
          </div>
          <button className="boton-reservar">reservar</button>
        </section>
      </div>
    </div>
  )
}

export default AlojamientoDetail
