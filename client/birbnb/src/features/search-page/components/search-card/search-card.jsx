import './search-card.css'
import { useNavigate } from 'react-router-dom'

const SearchCard = ({ id, nombre, descripcion, precioPorNoche, fotos }) => {
  const navigate = useNavigate()

  const handleViewMore = () => {
    navigate(`/alojamientos/${id}`)
  }

  const getImageSrc = (base64String) => {
    console.log('Base64 String:', base64String)
    if (!base64String) return null
    if (base64String.startsWith('data:')) return base64String
    return `data:image/jpeg;base64,${base64String}`
  }

  return (
    <div className="search-card-container" onClick={handleViewMore}>
      <div className="card-fotos">
        <img src={getImageSrc(fotos)} alt={nombre} />
      </div>
      <div className="card-content">
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <p className="card-precioPorNoche">${precioPorNoche} por noche</p>
      </div>
      <button className="view-more-button" onClick={handleViewMore}>
        {' '}
        Ver más{' '}
      </button>
    </div>
  )
}

export default SearchCard
