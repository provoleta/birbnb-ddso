import './search-bar.css'
import { useState } from 'react'
import { useSearchContext } from '../../store/search-context'
import CityInput from './city-input/city-input'

function SearchBar() {
  const { aplicarFiltros } = useSearchContext()
  const [ciudad, setCiudad] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [huespedes, setHuespedes] = useState(0)
  const [resultados, setResultados] = useState([])

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

  const handleSearch = () => {
    const params = new Map()
    params.set('ciudad', ciudad)
    params.set('checkIn', checkIn)
    params.set('checkOut', checkOut)
    params.set('huespedes', huespedes)
    aplicarFiltros(params)
  }

  return (
    <div className="app-nav-search">
      <CityInput handleChange={handleChange} query={query} resultados={resultados} />
      <input
        className="main-input"
        type="date"
        placeholder="Check-in"
        value={checkIn}
        min={new Date().toISOString().split('T')[0]} // hoy?
        onChange={(e) => setCheckIn(e.target.value)}
      />
      <input
        className="main-input"
        type="date"
        placeholder="Check-out"
        value={checkOut}
        min={checkIn}
        onChange={(e) => setCheckOut(e.target.value)}
      />
      <input
        className="main-input right"
        type="number"
        placeholder="Huespedes"
        value={huespedes}
        onChange={(e) => setHuespedes(e.target.value)}
      />
      <button className="button-busqueda" onClick={handleSearch}>
        Buscar
      </button>
    </div>
  )
}

export default SearchBar
