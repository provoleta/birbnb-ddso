import './search-page.css'
import SearchCard from './components/search-card/search-card.jsx'
import SortButton from './components/sort-button/sort-button.jsx'
import SliderPrecio from './components/filters/slider-precio.jsx'
import FiltrosCaracteristicas from './components/filters/caracteristicas.jsx'
import { useState, useMemo } from 'react'
import { useSearchContext } from '../../store/search-context.jsx'

export default function SearchPage() {
  const { alojamientos, aplicarFiltros, searchParams } = useSearchContext() // Obtener los alojamientos del contexto
  const searchValue = searchParams.get('ciudad') || ''
  const [sortOption, setSortOption] = useState('Menor precio')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [rangoPrecio, setRangoPrecio] = useState([0, 5000])
  const [servicios, setServicios] = useState({
    estacionamiento: false,
    piscina: false,
    mascotas: false,
    wifi: false,
  })

  const sortedAlojamientos = useMemo(() => {
    const alojamientosCopy = Array.isArray(alojamientos?.data)
      ? [...alojamientos.data]
      : []

    return alojamientosCopy.sort((a, b) => {
      if (sortOption === 'Menor precio') {
        return a.precioPorNoche - b.precioPorNoche
      } else {
        return b.precioPorNoche - a.precioPorNoche
      }
    })
  }, [sortOption, alojamientos])

  // Calcular los alojamientos que se deben mostrar en la página actual
  const paginatedAlojamientos = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return sortedAlojamientos.slice(startIndex, endIndex)
  }, [sortedAlojamientos, currentPage])

  const handleSortChange = (option) => {
    setSortOption(option)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const totalPages = Math.ceil(sortedAlojamientos.length / itemsPerPage)

  const transformarServicios = (servicios) => {
    const caracteristicas = []

    for (const [key, value] of Object.entries(servicios)) {
      if (value) {
        caracteristicas.push(key)
      }
    }
    return caracteristicas
  }

  const handlerFiltros = () => {
    const params = new Map()
    params.set('precioGt', rangoPrecio[0])
    params.set('precioLt', rangoPrecio[1])

    params.set('caracteristicas', transformarServicios(servicios))
    aplicarFiltros(params)
  }
  return (
    <div className="search-page-container">
      <div className="search-filters-container">
        <h2></h2>
        <SliderPrecio rangoPrecio={rangoPrecio} setRangoPrecio={setRangoPrecio} />
        <FiltrosCaracteristicas servicios={servicios} setServicios={setServicios} />
        <button className="btn-aplicar-filtros" onClick={handlerFiltros}>
          Aplicar Filtros
        </button>
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
              id={result.idAlojamiento}
              nombre={result.nombre}
              descripcion={result.descripcion}
              precioPorNoche={result.precioPorNoche}
              fotos={result.fotos?.[0]?.path}
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
