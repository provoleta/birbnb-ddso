import { TextField, MenuItem } from '@mui/material'
import '../../upload-alojamiento-form.css'

const currencies = [
  {
    value: 'DOLAR_USA',
    label: '$',
  },
  {
    value: 'PESO_ARG',
    label: 'AR$',
  },
]

export default function AlojamientoMonedaField({ id, label, onChange }) {
  return (
    <div className="alojamiento-moneda-field">
      <TextField
        id={id}
        select
        label={label}
        defaultValue="PESO_ARG"
        onChange={onChange}
        variant="outlined"
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  )
}
