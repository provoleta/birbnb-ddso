import './city-input.css'
import { useEffect, useState } from 'react'

function CityInput({ handleChange, query, resultados, ciudades }) {
  const [isFocused, setIsFocused] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
    //console.log('Ciudades cargadas:', ciudades)
  }, [ciudades, resultados])

  if (loading) {
    return <p>Cargando...</p>
  }

  return (
    <div style={{ position: 'relative' }}>
      <input
        className="search-section"
        type="text"
        placeholder="Buscar"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.target.blur()
          }
        }}
      />
      {resultados.length > 0 && isFocused && (
        <div className="autocomplete-results">
          {resultados.map((item) => (
            <li
              key={item}
              style={{
                color: 'black',
                padding: 8,
                cursor: 'pointer',
              }}
              onMouseDown={() => {
                handleChange({ target: { value: item } })
              }}
            >
              {item}
            </li>
          ))}
        </div>
      )}
    </div>
  )
}

export default CityInput
