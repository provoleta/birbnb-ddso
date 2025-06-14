import 'search-page.css'

export function SearchPage({ searchValue }) {
  //TODO: Agregar filtros
  const [destino, setDestino] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [cantidadHuespedes, setCantidadHuespedes] = useState('')

  return (
    <div className="search-result">
      <h1>`Resultados de busqueda para: ${searchValue}`</h1>
      {/* TODO: aplicar filtros */}
    </div>
  )
}
