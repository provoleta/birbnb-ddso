import { Slider, Typography, Box } from '@mui/material'

const SliderPrecio = ({ rangoPrecio, setRangoPrecio }) => {
  const handlePriceChange = (event, newValue) => {
    setRangoPrecio(newValue)
  }
  return (
    <div>
      <Typography gutterBottom variant="h6">
        Rango de precio
      </Typography>
      <Box sx={{ width: '100%', padding: '0 10px' }}>
        <Slider
          value={rangoPrecio}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={250}
          step={1}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2">${rangoPrecio[0]}</Typography>
          <Typography variant="body2">${rangoPrecio[1]}</Typography>
        </Box>
      </Box>
    </div>
  )
}

export default SliderPrecio
