import './city-input.css'
import { useState } from 'react'

function CityInput({ handleChange, query, resultados }) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <input
        className="main-input left"
        type="text"
        placeholder="Buscar"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
