import React, { useState } from 'react'
import { Slider, Typography, Box } from '@mui/material'

const SliderPrecio = () => {
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

export default SliderPrecio
