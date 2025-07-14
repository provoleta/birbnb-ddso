import './city-input.css'
import { useEffect, useState } from 'react'

function CityInput({ id, handleChange, query, resultados, ciudades }) {
  const [isFocused, setIsFocused] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [ciudades, resultados])

  if (loading) {
    return <p>Cargando...</p>
  }

  return (
    <div style={{ position: 'relative' }}>
      <input
        id={id}
        className="search-section"
        type="text"
        placeholder="Buscar ciudad"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        role="combobox"
        aria-expanded={resultados.length > 0 && isFocused}
        aria-autocomplete="list"
        aria-label="Buscar ciudad"
        aria-owns={resultados.length > 0 ? 'city-results' : undefined}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.target.blur()
          }
        }}
      />
      {resultados.length > 0 && isFocused && (
        <ul
          id="city-results"
          className="autocomplete-results"
          role="listbox"
          aria-label="Resultados de ciudades"
        >
          {resultados.map((item, index) => (
            <li
              key={item}
              role="option"
              tabIndex="-1"
              aria-selected={false}
              style={{
                color: 'black',
                padding: 8,
                cursor: 'pointer',
              }}
              onMouseDown={() => {
                handleChange({ target: { value: item } })
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleChange({ target: { value: item } })
                }
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CityInput
