import './search-card.css'
import { useNavigate } from 'react-router-dom'

const SearchCard = ({ id, nombre, descripcion, precioPorNoche, fotos }) => {
  const navigate = useNavigate()

  const handleViewMore = () => {
    navigate(`/alojamientos/${id}`)
  }

  return (
    <div className="search-card-container">
      <div className="card-fotos">
        <img src={fotos} alt={nombre} />
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
