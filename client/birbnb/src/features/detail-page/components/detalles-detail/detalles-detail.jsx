import './detalles-detail.css'
import CaracteristicaItem from '../caracteristica/caracteristica-item.jsx'
import PeopleIcon from '@mui/icons-material/People'

const Detalles = ({ alojamiento }) => {
  return (
    <div className="contenedor-descripcion">
      <div className="descripcion">
        <h2>Descripción alojamiento</h2>
        <p className="caracteristicas">{alojamiento.descripcion}</p>
      </div>

      {alojamiento.caracteristicas.length > 0 && (
        <>
          <h2>¿Que ofrece este lugar?</h2>
          <section className="caracteristicas">
            {alojamiento.caracteristicas.map((caracteristica, index) => (
              <CaracteristicaItem key={index} caracteristica={caracteristica} />
            ))}
          </section>
        </>
      )}

      <div className="huespedes">
        <h2>Capacidad</h2>
        <section className="caracteristicas">
          <div className="huespedes-max">
            <PeopleIcon className="icono-personas" />
            {alojamiento.cantHuespedesMax > 1 ? (
              <>Hasta {alojamiento.cantHuespedesMax} huéspedes permitidos</>
            ) : (
              <>{} 1 huésped permitido</>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Detalles
