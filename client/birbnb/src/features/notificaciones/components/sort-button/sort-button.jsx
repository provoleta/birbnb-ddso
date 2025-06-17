import './sort-button.css'
import { useState, useRef } from 'react'
import { Button, ClickAwayListener } from '@mui/material'

const SortButton = ({ currentSortOption, onSortChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const buttonRef = useRef(null)

  const handleSortOptionClick = (option) => {
    onSortChange(option) // Llamar a la función del padre para actualizar la opción
    setDropdownOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
      <div style={{ position: 'relative' }}>
        <Button
          ref={buttonRef}
          variant="outlined"
          startIcon={<>&#8593;&#8595;</>}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          sx={{
            borderRadius: '25px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #d0d0d0',
            color: 'black',
            textTransform: 'none',
            padding: '6px 15px',
            '&:hover': {
              backgroundColor: '#eaeaea',
              borderColor: '#c0c0c0',
            },
          }}
        >
          Ordenar por: {currentSortOption}
        </Button>

        {dropdownOpen && (
          <div className="sort-options-dropdown">
            <div
              className={`sort-option ${
                currentSortOption === 'Leidas primero' ? 'selected' : ''
              }`}
              onClick={() => handleSortOptionClick('Leidas primero')}
            >
              Leidas primero
            </div>
            <div
              className={`sort-option ${
                currentSortOption === 'No leidas primero' ? 'selected' : ''
              }`}
              onClick={() => handleSortOptionClick('No leidas primero')}
            >
              No leidas primero
            </div>
          </div>
        )}
      </div>
    </ClickAwayListener>
  )
}

export default SortButton
