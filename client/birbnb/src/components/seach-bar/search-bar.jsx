import './search-bar.css'

function SearchBar() {
  return (
    <div className="app-nav-search">
      <input className="main-input left" type="text" placeholder="Buscar" />
      <input className="main-input" type="date" placeholder="Check-in" />
      <input className="main-input" type="date" placeholder="Check-out" />
      <input className="main-input right" type="number" placeholder="Huespedes" />
      <button className="button-busqueda">Buscar</button>
    </div>
  )
}

export default SearchBar
