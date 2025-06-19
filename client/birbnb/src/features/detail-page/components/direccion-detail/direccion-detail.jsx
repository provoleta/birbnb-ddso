import './direccion-detail.css'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'

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
      <p className="locacion-puntual">
        <GpsFixedIcon fontSize="small" className="gps-icon" />
        Latitud: {alojamiento.direccion.lat} Longitud: {alojamiento.direccion.long}
      </p>
    </div>
  )
}

export default Direccion
