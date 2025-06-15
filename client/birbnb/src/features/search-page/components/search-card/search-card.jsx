import './search-card.css'
const SearchCard = ({ nombre, descripcion, precioPorNoche, fotos }) => {
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
      <button className="view-more-button"> Ver más </button>
    </div>
  )
}

export default SearchCard
