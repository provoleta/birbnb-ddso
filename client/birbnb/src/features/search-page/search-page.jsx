import './search-page.css'
import { alojamientos } from './alojamientosMockeados.js'
import SearchCard from './components/search-card/search-card.jsx'
import SortButton from './components/sort-button/sort-button.jsx'
import SliderPrecio from './components/filters/slider-precio.jsx'
import FiltrosCaracteristicas from './components/filters/caracteristicas.jsx'
import { useState, useMemo } from 'react'
import { useSearchContext } from '../../store/search-context.jsx'

export default function SearchPage({ searchValue }) {
  const [sortOption, setSortOption] = useState('Menor precio') // Inicialmente se ordena por menor precio
  const [currentPage, setCurrentPage] = useState(1) // Estado para la página actual
  const itemsPerPage = 10 // Número de alojamientos por página
  const { aplicarFiltros } = useSearchContext()

  // Ordenar alojamientos usando useMemo para evitar cálculos innecesarios
  const sortedAlojamientos = useMemo(() => {
    const alojamientosCopy = [...alojamientos] // Crea una copia para no modificar el original

    return alojamientosCopy.sort((a, b) => {
      if (sortOption === 'Menor precio') {
        return a.precioPorNoche - b.precioPorNoche
      } else {
        return b.precioPorNoche - a.precioPorNoche
      }
    })
  }, [sortOption]) // Se recalcula solo cuando cambia la opción de ordenamiento

  // Calcular los alojamientos que se deben mostrar en la página actual
  const paginatedAlojamientos = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return sortedAlojamientos.slice(startIndex, endIndex)
  }, [sortedAlojamientos, currentPage])

  // Función para actualizar la opción de ordenamiento
  const handleSortChange = (option) => {
    setSortOption(option)
  }

  // Función para cambiar de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  // Calcular el número total de páginas
  const totalPages = Math.ceil(sortedAlojamientos.length / itemsPerPage)

  return (
    <div className="search-page-container">
      <div className="search-filters-container">
        <h2>Filtros de búsqueda</h2>
        <SliderPrecio />
        <FiltrosCaracteristicas />
      </div>

      <div className="search-results-container">
        <div className="search-header">
          <h1>Resultados de búsqueda para: {searchValue}</h1>
        </div>
        <div className="button-container">
          <SortButton currentSortOption={sortOption} onSortChange={handleSortChange} />
        </div>
        <div className="search-results">
          {paginatedAlojamientos.map((result) => (
            <SearchCard
              key={result.id} // Esta línea es importante para que React pueda identificar cada elemento de la lista
              id={result.id}
              nombre={result.nombre}
              descripcion={result.descripcion}
              precioPorNoche={result.precioPorNoche}
              fotos={result.fotos[0].path}
            />
          ))}
        </div>
        <div className="pagination-container">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
