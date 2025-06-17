import './search-bar.css'
import { useState } from 'react'
import { useSearchContext } from '../../store/search-context'
import CityInput from './city-input/city-input'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const { aplicarFiltros } = useSearchContext()
  const [ciudad, setCiudad] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [huespedes, setHuespedes] = useState(0)
  const [resultados, setResultados] = useState([])
  const navigate = useNavigate()

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    if (value.length > 0) {
      setResultados(
        datosPrueba.filter((item) => item.toLowerCase().includes(value.toLowerCase())),
      )
    } else {
      setResultados([])
    }
  }

  const [query, setQuery] = useState('')
  const datosPrueba = ['Buenos Aires', 'Córdoba'] // TODO resolver en el backend

  const handleSearch = async () => {
    const params = new Map()
    params.set('ciudad', ciudad)
    params.set('checkIn', checkIn)
    params.set('checkOut', checkOut)
    params.set('huespedesMax', huespedes)
    aplicarFiltros(params)
    if (window.location.pathname !== '/alojamientos') {
      navigate('/alojamientos')
    }
  }

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <div className="search-section">
          <label>Destino</label>
          {/* <CityInput handleChange={handleChange} query={query} resultados={resultados} /> */}
          <input
            type="text"
            placeholder="Add city"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          />
        </div>
        <div className="divider"></div>
        <div className="search-section">
          <label>Check in</label>
          <input
            type="date"
            placeholder="Add dates"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="divider"></div>
        <div className="search-section">
          <label>Check out</label>
          <input
            type="date"
            placeholder="Add dates"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div className="divider"></div>
        <div className="search-section">
          <label>Huéspedes</label>
          <input
            type="number"
            placeholder="Add guests"
            value={huespedes}
            onChange={(e) => setHuespedes(e.target.value)}
            min="1"
          />
        </div>
        <button className="search-button" onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="24px"
            height="24px"
          >
            <path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.48-5.34C15.11 5.59 12.52 3 9.5 3S3.89 5.59 3.89 8.39c0 2.93 2.59 5.52 5.61 5.52 1.61 0 3.06-.63 4.11-1.68l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SearchBar
