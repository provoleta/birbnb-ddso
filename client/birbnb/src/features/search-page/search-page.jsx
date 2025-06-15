import './search-page.css'
import { alojamientos } from './alojamientosMockeados.js'
import SearchCard from './components/search-card/search-card.jsx'
import SortButton from './components/sort-button/sort-button.jsx'
import SliderPrecio from './components/filters/slider-precio.jsx'
import FiltrosCaracteristicas from './components/filters/caracteristicas.jsx'

export default function SearchPage({ searchValue }) {
  return (
    <div className="search-page-container">
      <div className="search-filters-container">
        <h2>Filtros de búsqueda</h2>
        <SliderPrecio />
        <FiltrosCaracteristicas />
      </div>

      <div className="search-results-container">
        <div className="search-header">
          <h1>Resultados de busqueda para: {searchValue}</h1>
        </div>
        {/* TODO: aplicar filtros con botones */}
        <div className="button-container">
          <SortButton />
        </div>
        <div className="search-results">
          {alojamientos.map((result) => (
            <SearchCard
              key={result.id} // Esta linea es importante para que React pueda identificar cada elemento de la lista
              nombre={result.nombre}
              descripcion={result.descripcion}
              precioPorNoche={result.precioPorNoche}
              fotos={result.fotos[0].path}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
