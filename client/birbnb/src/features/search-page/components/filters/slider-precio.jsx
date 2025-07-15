import './slider.css'
import { Slider, Typography, Box } from '@mui/material'
import { useState } from 'react'

const SliderPrecio = ({ rangoPrecio, setRangoPrecio }) => {
  const [rangoVisual, setRangoVisual] = useState(rangoPrecio)

  const handleChange = (event, newValue) => {
    setRangoVisual(newValue)
  }

  const handlePriceChange = (event, newValue) => {
    setRangoPrecio(newValue)
  }
  return (
    <div className="slider-precio-container">
      <div className="slider-label">
        <Typography id="rango-precio-label" gutterBottom variant="h6">
          Rango de precio
        </Typography>
        <Box sx={{ width: '100%', padding: '0 10px' }}>
          <Slider
            value={rangoVisual}
            onChangeCommitted={handlePriceChange}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={250}
            step={1}
            aria-labelledby="rango-precio-label"
            getAriaValueText={(value) => `$${value}`}
            valueLabelFormat={(value) => `$${value}`}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" aria-label={`Precio mínimo: $${rangoPrecio[0]}`}>
              ${rangoPrecio[0]}
            </Typography>
            <Typography variant="body2" aria-label={`Precio máximo: $${rangoPrecio[1]}`}>
              ${rangoPrecio[1]}
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default SliderPrecio
