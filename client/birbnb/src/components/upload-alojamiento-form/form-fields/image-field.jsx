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
    <div
      className="alojamiento-image-field"
      onClick={handleContainerClick}
      style={{ cursor: 'pointer' }}
    >
      <input
        type="file"
        id={id}
        accept="image/*"
        onChange={onChange}
        ref={inputRef}
        style={{ display: 'none' }}
      />
      <span>{label || 'Subir Imagen'}</span>
    </div>
  )
}
