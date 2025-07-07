import { TextField } from '@mui/material'
import '../upload-alojamiento-form.css'

export default function AlojamientoTextField({ id, label, value, onChange }) {
  return (
    <div className="alojamiento-text-field">
      <TextField
        id={id}
        label={label}
        variant="outlined"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
