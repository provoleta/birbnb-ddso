import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import PoolIcon from '@mui/icons-material/Pool'
import PetsIcon from '@mui/icons-material/Pets'
import WifiIcon from '@mui/icons-material/Wifi'
import { Typography, Box, Checkbox, FormControlLabel, Avatar } from '@mui/material'

const CaracteristicaCheckbox = ({ nombre, icono, label, checked, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox checked={checked} onChange={onChange} name={nombre} color="secondary" />
      }
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ bgcolor: '#f0e6ff', width: 36, height: 36 }}>{icono}</Avatar>
          <Typography>{label}</Typography>
        </Box>
      }
    />
  )
}

const FiltrosCaracteristicas = ({ servicios, setServicios }) => {
  const handleChange = (event) => {
    setServicios({
      ...servicios,
      [event.target.name]: event.target.checked,
    })
  }

  const opcionesCaracteristicas = [
    {
      nombre: 'estacionamiento',
      label: 'Estacionamiento',
      icono: <DirectionsCarIcon sx={{ color: '#673ab7' }} fontSize="small" />,
    },
    {
      nombre: 'piscina',
      label: 'Piscina',
      icono: <PoolIcon sx={{ color: '#673ab7' }} fontSize="small" />,
    },
    {
      nombre: 'mascotas_permitidas',
      label: 'Mascotas permitidas',
      icono: <PetsIcon sx={{ color: '#673ab7' }} fontSize="small" />,
    },
    {
      nombre: 'wifi',
      label: 'Wifi',
      icono: <WifiIcon sx={{ color: '#673ab7' }} fontSize="small" />,
    },
  ]

  return (
    <div className="filtro-servicios-container">
      <Typography gutterBottom variant="h6">
        Características
      </Typography>
      {opcionesCaracteristicas.map((servicio) => (
        <CaracteristicaCheckbox
          key={servicio.nombre}
          nombre={servicio.nombre}
          label={servicio.label}
          icono={servicio.icono}
          checked={servicios[servicio.nombre]}
          onChange={handleChange}
        />
      ))}
    </div>
  )
}

export default FiltrosCaracteristicas
