import './search-bar.css'
import { useState, useEffect } from 'react'
import { useSearchContext } from '../../store/search-context'
import CityInput from './city-input/city-input'
import { useNavigate } from 'react-router-dom'
import api from '../../api/api'

function SearchBar() {
  const { limpiarFiltros, aplicarFiltros } = useSearchContext()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [huespedes, setHuespedes] = useState(1)
  const [resultados, setResultados] = useState([])
  const [ciudades, setCiudades] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getCiudades = async () => {
      try {
        const ciudadesNew = await api.obtenerCiudades()
        setCiudades(ciudadesNew)
      } catch (error) {
        console.error('Error fetching cities:', error)
      }
    }

    getCiudades()
  }, [])

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    if (value.length > 0) {
      setResultados(
        ciudades.filter((item) => item.toLowerCase().includes(value.toLowerCase())),
      )
    } else {
      setResultados([])
    }
  }

  const [query, setQuery] = useState('')

  const handleSearch = async () => {
    limpiarFiltros()
    const params = new Map()
    params.set('ciudad', query)
    params.set('checkIn', checkIn)
    params.set('checkOut', checkOut)
    params.set('huespedesMax', huespedes)

    if (checkIn && checkOut && checkIn > checkOut) {
      const [checkInValue, checkOutValue] = [checkOut, checkIn]
      setCheckIn(checkInValue)
      setCheckOut(checkOutValue)
    }

    aplicarFiltros(params)

    navigate('/alojamientos')
  }

  return (
    <div className="search-bar-container" role="search" aria-label="Buscar alojamientos">
      <form
        id="search-form"
        className="search-bar"
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch()
        }}
      >
        <div className="search-section">
          <label htmlFor="destino-input">Destino</label>
          <CityInput
            id="destino-input"
            handleChange={handleChange}
            query={query}
            resultados={resultados}
            ciudades={ciudades}
            aria-label="Ingrese la ciudad de destino"
          />
        </div>
        <div className="divider" role="separator"></div>
        <div className="search-section">
          <label htmlFor="checkin-input">Check in</label>
          <input
            id="checkin-input"
            type="date"
            placeholder="Agregar fechas"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            aria-label="Fecha de entrada"
          />
        </div>
        <div className="divider" role="separator"></div>
        <div className="search-section">
          <label htmlFor="checkout-input">Check out</label>
          <input
            id="checkout-input"
            type="date"
            placeholder="Agregar fechas"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            aria-label="Fecha de salida"
          />
        </div>
        <div className="divider" role="separator"></div>
        <div className="search-section">
          <label htmlFor="huespedes-input">Huéspedes</label>
          <input
            id="huespedes-input"
            type="number"
            placeholder="Agregar huespedes"
            value={huespedes}
            onChange={(e) => setHuespedes(e.target.value)}
            min="1"
            max="20"
            readOnly={false}
            aria-label="Número de huéspedes"
            // Bloqueo que escriban o modifiquen el numero de huespedes sin usar la flecha
            onKeyDown={(e) => {
              if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Tab') {
                e.preventDefault()
              }
            }}
            onPaste={(e) => e.preventDefault()}
          />
        </div>
        <button
          type="submit"
          className="search-button"
          onClick={handleSearch}
          aria-label="Buscar alojamientos disponibles"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.134 15 1 11.866 1 8C1 4.134 4.134 1 8 1C11.866 1 15 4.134 15 8Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default SearchBar
