import { useParams } from 'react-router-dom'
//import { alojamientos } from ""
import { Card } from '@mui/material'

function DetailPage() {
  const alojamientoDetail = () => {
    const nombre = useParams()
    const alojamiento = alojamientos.find(
      (alojamientos) => alojamientos.nombre === nombre,
    )
  }

  if (!alojamiento) return <div>Alojamiento no encontrado😔</div>

  return (
    <div>
      <div>
        <h1>{alojamiento.nombre}</h1>
        <h3>{alojamiento.direccion}</h3>
      </div>
      <section className="imagenes">
        {/* Carousel */}
        <img src={alojamiento.fotos} alt={alojamiento.nombre} />
      </section>

      <section className="detalles-alojamiento">
        <div className="descripcion">
          <h2>Descripcion alojamiento</h2>
          <p>{alojamiento.descripcion}</p>
        </div>

        <section className="caracteristicas">
          {/* alojamiento.caracteristicas.map({/*
            1. Transformar a componente Caracteristica
            2. Solo traer los que tiene
            3. Idea: Tener las 4 caracteristicas de nuestro alojamiento
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
//hola nico 🌮

export default DetailPage
