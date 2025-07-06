import './mapa-detail.css'

const Mapa = ({ alojamiento }) => {
  const latitud = alojamiento.direccion.lat
  const longitud = alojamiento.direccion.long

  const url = `https://www.google.com/maps?q=${latitud},${longitud}&z=15&output=embed`

  return (
    <div className="mapa">
      <iframe
        width="100%"
        height="100%"
        max-width="600px"
        style={{ borderRadius: '16px', display: 'block', maxWidth: '100%' }}
        src={url}
        title="Mapa de ubicación del alojamiento"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default Mapa
