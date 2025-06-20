import './mapa-detail.css'

const Mapa = ({ alojamiento }) => {
  const latitud = alojamiento.direccion.lat
  const longitud = alojamiento.direccion.long

  const url = `https://www.google.com/maps?q=${latitud},${longitud}&z=15&output=embed`

  return (
    <div className="mapa">
      <iframe
        title="Mapa"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={url}
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default Mapa
