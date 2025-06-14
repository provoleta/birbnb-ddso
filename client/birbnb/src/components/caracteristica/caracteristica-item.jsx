import WifiIcon from '@mui/icons-material/Wifi'
import PoolIcon from '@mui/icons-material/Pool'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import PetsIcon from '@mui/icons-material/Pets'

const CaracteristicaItem = ({ caracteristica }) => {
  const getIcon = (caracteristica) => {
    switch (caracteristica) {
      case 'WIFI':
        return <WifiIcon />
      case 'PISCINA':
        return <PoolIcon />
      case 'ESTACIONAMIENTO':
        return <LocalParkingIcon />
      case 'MASCOTAS_PERMITIDAS':
        return <PetsIcon />
      default:
        return null
    }
  }

  return (
    <div className="caracteristica-item">
      <h3>
        {getIcon(caracteristica)}
        {caracteristica}
      </h3>
    </div>
  )
}

export default CaracteristicaItem
