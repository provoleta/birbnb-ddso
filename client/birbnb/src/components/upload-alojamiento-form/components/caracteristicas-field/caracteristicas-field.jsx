import './caracteristicas-field.css'

export default function AlojamientoCaracteristicasField({ caracteristicas, onChange }) {
  return (
    <div className="alojamiento-caracteristicas-field">
      <h3>Características del Alojamiento</h3>
      {Object.keys(caracteristicas).map((key) => (
        <label key={key}>
          <input
            type="checkbox"
            name={key}
            checked={caracteristicas[key]}
            onChange={onChange}
          />
          {(() => {
            const label = key.split('_')[0]
            return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()
          })()}
        </label>
      ))}
    </div>
  )
}
