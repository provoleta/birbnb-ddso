import { TextField } from '@mui/material'
import '../../upload-alojamiento-form.css'

export default function AlojamientoNumberField({ id, label, value, onChange }) {
  return (
    <div className="alojamiento-number-field">
      <TextField
        id={id}
        label={label}
        variant="outlined"
        type="number"
        required="true"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
