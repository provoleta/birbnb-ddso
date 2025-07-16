import { useRef } from 'react'
import './image-field.css'

export default function AlojamientoImageField({ id, label, onChange, image }) {
  const inputRef = useRef(null)

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div className="alojamiento-image-field">
      <label
        htmlFor={id}
        className="image-field-label"
        onClick={handleContainerClick}
        style={{ cursor: 'pointer', display: 'block', width: '100%' }}
      >
        <span>{label || 'Subir Imagen'}</span>
      </label>
      <input
        type="file"
        id={id}
        accept="image/*"
        onChange={onChange}
        ref={inputRef}
        style={{ display: 'none' }}
        aria-label={label || 'Subir Imagen'}
      />
    </div>
  )
}
