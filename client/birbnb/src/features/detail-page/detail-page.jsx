import { useParams } from 'react-router-dom'
import { Card } from '@mui/material'
import './detail-page.css'
import { alojamientos } from './alojamientosMockeados.js'
import CaracteristicaItem from '../../components/caracteristica/caracteristica-item.jsx'

const AlojamientoDetail = () => {
  const { id } = useParams()
  const alojamiento = alojamientos.find((alojamiento) => alojamiento.id === Number(id))

  if (!alojamiento) return <div> `{} Alojamiento no encontrado😔`</div>

  return (
    <div classname="">
      <div>
        <h1>{alojamiento.nombre}</h1>
        <p>
          {alojamiento.direccion.calle} {alojamiento.direccion.numero},{' '}
          {alojamiento.direccion.ciudad} {alojamiento.direccion.pais}
        </p>
        <p>
          Latitud: {alojamiento.direccion.lat} Longitud: {alojamiento.direccion.long}
        </p>
      </div>
      <section className="imagenes">
        {/* Carousel */}
        {/* <img src={alojamiento.fotos} alt={alojamiento.nombre} /> */}
      </section>

      <section className="detalles-alojamiento">
        <div className="descripcion">
          <h2>Descripcion alojamiento</h2>
          <p>{alojamiento.descripcion}</p>
        </div>

        <section className="caracteristicas">
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
          <div class="foto-perfil">
            <img></img>
          </div>
          <div class="informacion-perfil">
            <p>{alojamiento.anfitrion.nombre}</p>
            <p>{alojamiento.anfitrion.email}</p>
          </div>
        </div>
      </section>

      <section classname="reservar">
        <div>
          <Card>
            <header>
              `${alojamiento.precioPorNoche} {alojamiento.moneda} por noche`
            </header>
            <div classname="contenedor-reservar">
              <div classname="contenedor-fechas"></div>
              <div classname="contenedor-viajeros"></div>
            </div>
            <button className="boton-reservar">reservar</button>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default AlojamientoDetail
