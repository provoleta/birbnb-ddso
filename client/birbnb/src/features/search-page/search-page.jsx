import './search-page.css'
import { useState } from 'react'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import PoolIcon from '@mui/icons-material/Pool'
import PetsIcon from '@mui/icons-material/Pets'
import WifiIcon from '@mui/icons-material/Wifi'
import {
  Button,
  Slider,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Avatar,
} from '@mui/material'

export default function SearchPage({ searchValue }) {
  // Estos alojamientos tendrian que venir del backend
  const alojamientosEjemplo = [
    {
      id: 1,
      title: 'Apartamento en el centro',
      description: 'Hermoso apartamento con vistas a la ciudad',
      price: 120,
      image:
        'https://www.aedashomes.com/blog/wp-content/uploads/2021/05/diferencia-apartamento-piso-interior.jpeg',
    },
    {
      id: 2,
      title: 'Casa de playa',
      description: 'Casa frente al mar con acceso directo a la playa',
      price: 200,
      image:
        'https://decofilia.com/wp-content/uploads/2023/05/como-decorar-casas-de-playa-00.jpg',
    },
    {
      id: 3,
      title: 'Cabaña en la montaña',
      description: 'Acogedora cabaña con vistas panorámicas',
      price: 150,
      image:
        'https://complejoclarita.com.ar/wp-content/uploads/cabanas-rodeadas-de-montanas-y-naturaleza.jpg',
    },
  ]

  return (
    <div className="search-page-container">
      <div className="search-filters-container">
        <h2>Filtros de búsqueda</h2>
        <SliderPrecio />
        <FiltroServicios />
      </div>

      <div className="search-results-container">
        <div className="search-header">
          <h1>Resultados de busqueda para: {searchValue}</h1>
        </div>
        {/* TODO: aplicar filtros con botones */}
        <div className="button-container">
          <Button variant="outlined">Ordenar por</Button>
        </div>
        <div className="search-results">
          {alojamientosEjemplo.map((result) => (
            <SearchCard
              key={result.id} // Esta linea es importante para que React pueda identificar cada elemento de la lista
              titulo={result.title}
              descripcion={result.description}
              precioPorNoche={result.price}
              imagen={result.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const SearchCard = ({ titulo, descripcion, precioPorNoche, imagen }) => {
  return (
    <div className="search-card-container">
      <div className="card-image">
        <img src={imagen} alt={titulo} />
      </div>
      <div className="card-content">
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
        <p className="card-price">${precioPorNoche} por noche</p>
      </div>
      <button className="view-more-button"> Ver más </button>
    </div>
  )
}

const SliderPrecio = ({}) => {
  const [priceRange, setPriceRange] = useState([0, 1000000])

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue)
  }
  return (
    <div>
      <Typography gutterBottom variant="h6">
        Rango de precio
      </Typography>
      <Box sx={{ width: '100%', padding: '0 10px' }}>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000000}
          step={10}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2">${priceRange[0]}</Typography>
          <Typography variant="body2">${priceRange[1]}</Typography>
        </Box>
      </Box>
    </div>
  )
}

const ServicioCheckbox = ({ nombre, icono, label, checked, onChange }) => {
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

const FiltroServicios = () => {
  const [servicios, setServicios] = useState({
    estacionamiento: false,
    piscina: false,
    mascotas: false,
    wifi: false,
  })

  const handleChange = (event) => {
    setServicios({
      ...servicios,
      [event.target.name]: event.target.checked,
    })
  }

  // Definición de los servicios con sus propiedades
  const opcionesServicios = [
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
      nombre: 'mascotas',
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
      {opcionesServicios.map((servicio) => (
        <ServicioCheckbox
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
