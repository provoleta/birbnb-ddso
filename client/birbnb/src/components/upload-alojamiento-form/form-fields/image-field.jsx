import './image-field.css'

export default function AlojamientoImageField({ id, label, onChange, image }) {
  return (
    <div className="alojamiento-image-field">
      <input
        type="file"
        id={id}
        accept="image/*"
        onChange={onChange}
        style={{ display: 'none' }}
      />
      <label htmlFor={id} className="image-upload-label">
        <span>{label || 'Subir Imagen'}</span>
      </label>
    </div>
  )
}
