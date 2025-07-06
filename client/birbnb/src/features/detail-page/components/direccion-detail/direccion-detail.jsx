import './direccion-detail.css'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const Direccion = ({ alojamiento }) => {
  return (
    <div className="contenedor-direccion">
      <div className="contenedor-titulo">
        <h1>{alojamiento.nombre}</h1>
      </div>
      <p className="especificacion-direccion">
        <LocationOnIcon fontSize="small" className="location-icon" />
        {alojamiento.direccion.calle} {alojamiento.direccion.numero},{' '}
        {alojamiento.direccion.ciudad} {alojamiento.direccion.pais}
      </p>
    </div>
  )
}

export default Direccion
