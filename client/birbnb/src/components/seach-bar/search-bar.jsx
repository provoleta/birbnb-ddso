import './search-bar.css'
import { useState, useEffect } from 'react'
import { useSearchContext } from '../../store/search-context'
import CityInput from './city-input/city-input'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
      axios
        .get('/ciudades', {
          baseURL: 'http://localhost:6969',
        })
        .then((response) => {
          setCiudades(response.data)
        })
        .catch((error) => {
          console.error('Error fetching cities:', error)
        })
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

    if (checkIn > checkOut) {
      const [checkInValue, checkOutValue] = [checkOut, checkIn]
      setCheckIn(checkInValue)
      setCheckOut(checkOutValue)
    }

    aplicarFiltros(params)

    navigate('/alojamientos')
  }

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <div className="search-section">
          <label>Destino</label>
          <CityInput
            handleChange={handleChange}
            query={query}
            resultados={resultados}
            ciudades={ciudades}
          />
        </div>
        <div className="divider"></div>
        <div className="search-section">
          <label>Check in</label>
          <input
            type="date"
            placeholder="Agregar fechas"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="divider"></div>
        <div className="search-section">
          <label>Check out</label>
          <input
            type="date"
            placeholder="Agregar fechas"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div className="divider"></div>
        <div className="search-section">
          <label>Huéspedes</label>
          <input
            type="number"
            placeholder="Agregar huespedes"
            value={huespedes}
            onChange={(e) => setHuespedes(e.target.value)}
            min="1"
            readOnly={false}
            // Bloqueo que escriban o modifiquen el numero de huespedes sin usar la flecha
            onKeyDown={(e) => {
              if (e.key !== 'Tab') {
                e.preventDefault()
              }
            }}
            onPaste={(e) => e.preventDefault()}
          />
        </div>
        <button className="search-button" onClick={handleSearch}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.134 15 1 11.866 1 8C1 4.134 4.134 1 8 1C11.866 1 15 4.134 15 8Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SearchBar
