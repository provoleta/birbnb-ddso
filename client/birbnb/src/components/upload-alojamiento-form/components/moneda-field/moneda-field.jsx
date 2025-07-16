import { TextField, MenuItem } from '@mui/material'
import '../../upload-alojamiento-form.css'

const currencies = [
  {
    value: 'DOLAR_USA',
    label: 'US$',
  },
  {
    value: 'PESO_ARG',
    label: 'AR$',
  },
  {
    value: 'REALES',
    label: 'R$',
  },
]

export default function AlojamientoMonedaField({ id, onChange }) {
  return (
    <div className="alojamiento-moneda-field">
      <TextField id={id} select defaultValue="PESO_ARG" onChange={onChange}>
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  )
}
