import WifiIcon from '@mui/icons-material/Wifi'
import PoolIcon from '@mui/icons-material/Pool'
import LocalParkingIcon from './coche-estacionado.png'
import PetsIcon from '@mui/icons-material/Pets'

const CaracteristicaItem = ({ caracteristica }) => {
  const getIcon = (caracteristica) => {
    switch (caracteristica) {
      case 'WIFI':
        return <WifiIcon />
      case 'PISCINA':
        return <PoolIcon />
      case 'ESTACIONAMIENTO':
        return <img src={LocalParkingIcon} alt="Icono estacionamiento" />
      case 'MASCOTAS_PERMITIDAS':
        return <PetsIcon />
      default:
        return null
    }
  }

  function formatearPalabra(palabra) {
    // Reemplaza _ por espacio, pone todo en minúscula
    let sinGuion = palabra.replace(/_/g, ' ').toLowerCase()
    // Capitaliza la primera letra
    return sinGuion.charAt(0).toUpperCase() + sinGuion.slice(1)
  }

  return (
    <div className="caracteristica-item">
      <div className="parrafo-caracteristica" role="text">
        {getIcon && (
          <span className="icono-caracteristica sr-only-icon">
            {getIcon(caracteristica)}
          </span>
        )}
        <span>{formatearPalabra(caracteristica)}</span>
      </div>
    </div>
  )
}

export default CaracteristicaItem
