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
        required={true}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          // Permitir teclas de navegación y control
          const allowedKeys = [
            'Backspace',
            'Delete',
            'Tab',
            'Escape',
            'Enter',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
          ]

          // Si es una tecla permitida, dejar pasar
          if (allowedKeys.includes(e.key)) {
            return
          }

          // Permitir números del 0-9
          if (e.key >= '0' && e.key <= '9') {
            return
          }

          // Bloquear el guión (-) y cualquier otra tecla
          e.preventDefault()
        }}
        onPaste={(e) => e.preventDefault()}
        inputProps={{
          min: 1,
        }}
      />
    </div>
  )
}
