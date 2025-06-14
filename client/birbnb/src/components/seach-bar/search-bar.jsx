import './search-bar.css'
import { useState } from 'react'
import { useSearchContext } from '../../store/search-context'

function SearchBar() {
  const { searchParams, aplicarFiltros } = useSearchContext()
  const [lugar, setLugar] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [huespedes, setHuespedes] = useState(0)

  const handleSearch = () => {
    const params = {
      lugar: lugar,
      checkIn: checkIn,
      checkOut: checkOut,
      huespedes: huespedes,
    }
    aplicarFiltros(params)
  }

  return (
    <div className="app-nav-search">
      <input
        className="main-input left"
        type="text"
        placeholder="Buscar"
        value={lugar}
        onChange={(e) => setLugar(e.target.value)}
      />
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
