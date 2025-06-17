import './detalles-detail.css'
import CaracteristicaItem from '../caracteristica/caracteristica-item.jsx'

const Detalles = ({ alojamiento }) => {
  return (
    <div>
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
    </div>
  )
}

export default Detalles
