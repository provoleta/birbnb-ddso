import './search-page.css'
import SearchCard from './components/search-card/search-card.jsx'
import SortButton from './components/sort-button/sort-button.jsx'
import SliderPrecio from './components/filters/slider-precio.jsx'
import FiltrosCaracteristicas from './components/filters/caracteristicas.jsx'
import Loader from '../../components/loader/loader.jsx'
import { useState, useMemo, useEffect } from 'react'
import { useSearchContext } from '../../store/search-context.jsx'

export default function SearchPage() {
  const { switchLimpiar, alojamientos, aplicarFiltros, searchParams, loading } =
    useSearchContext() // Agregar loading del contexto
  const searchValue = searchParams.get('ciudad') || ''
  const [sortOption, setSortOption] = useState('Menor precio')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [rangoPrecio, setRangoPrecio] = useState([0, 250])
  const [servicios, setServicios] = useState({
    estacionamiento: false,
    piscina: false,
    mascotas: false,
    wifi: false,
  })

  const sortedAlojamientos = useMemo(() => {
    const alojamientosCopy = Array.isArray(alojamientos?.data)
      ? alojamientos.data.filter(
          (a) => a.precioPorNoche >= rangoPrecio[0] && a.precioPorNoche <= rangoPrecio[1],
        )
      : []

    return alojamientosCopy.sort((a, b) => {
      if (sortOption === 'Menor precio') {
        return a.precioPorNoche - b.precioPorNoche
      } else {
        return b.precioPorNoche - a.precioPorNoche
      }
    })
  }, [sortOption, alojamientos, rangoPrecio])

  const handleSortChange = (option) => {
    setSortOption(option)
    if (currentPage !== 1) {
      handlePageChange(1)
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const totalPages = alojamientos?.total_pages

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
    params.set('page', currentPage)
    params.set('caracteristicas', transformarServicios(servicios))
    params.set('sortBy', sortOption === 'Menor precio' ? 'ascendente' : 'descendente')
    console.log(params)
    aplicarFiltros(params)
  }

  useEffect(() => {
    handlerFiltros()
  }, [servicios, rangoPrecio, currentPage, sortOption])

  useEffect(() => {
    setServicios({
      estacionamiento: false,
      piscina: false,
      mascotas: false,
      wifi: false,
    })
    setRangoPrecio([0, 250])
  }, [switchLimpiar])

  return (
    <div className="search-page-container">
      <div className="search-filters-container">
        <h2></h2>
        <SliderPrecio rangoPrecio={rangoPrecio} setRangoPrecio={setRangoPrecio} />
        <FiltrosCaracteristicas servicios={servicios} setServicios={setServicios} />
      </div>

      <div className="search-results-container">
        <div className="search-header">
          <h1>Resultados de búsqueda para: {searchValue}</h1>
        </div>
        <div className="button-container">
          <SortButton currentSortOption={sortOption} onSortChange={handleSortChange} />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="search-results">
            {sortedAlojamientos.map((result) => (
              <SearchCard
                key={result.idAlojamiento} // Esta línea es importante para que React no llore
                idAlojamiento={result.idAlojamiento}
                nombre={result.nombre}
                descripcion={result.descripcion}
                precioPorNoche={result.precioPorNoche}
                fotos={result.fotos?.[0]?.path}
              />
            ))}
          </div>
        )}
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
