import './detalles-detail.css'
import CaracteristicaItem from '../caracteristica/caracteristica-item.jsx'

const Detalles = ({ alojamiento }) => {
  return (
    <div className="contenedor-descripcion">
      <div className="descripcion">
        <h2>Descripcion alojamiento</h2>
        <p className="caracteristicas">{alojamiento.descripcion}</p>
      </div>
      <h2>¿Que ofrece este lugar?</h2>
      <section className="caracteristicas">
        {alojamiento.caracteristicas.map((caracteristica, index) => (
          <CaracteristicaItem key={index} caracteristica={caracteristica} />
        ))}
      </section>
    </div>
  )
}

export default Detalles
