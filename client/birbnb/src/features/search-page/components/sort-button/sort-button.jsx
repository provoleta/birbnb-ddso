import './sort-button.css'
import { useState, useRef } from 'react'
import { Button, ClickAwayListener, Paper } from '@mui/material'

const SortButton = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [sortOption, setSortOption] = useState('Menor precio')
  const buttonRef = useRef(null)

  const handleSortOptionClick = (option) => {
    setSortOption(option)
    setDropdownOpen(false)
    // Aquí implementarías la lógica de ordenamiento
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
          Ordenar por: {sortOption}
        </Button>

        {dropdownOpen && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              mt: 1,
              zIndex: 1000,
              minWidth: '160px',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <div className="sort-options-dropdown">
              <div
                className={`sort-option ${
                  sortOption === 'Menor precio' ? 'selected' : ''
                }`}
                onClick={() => handleSortOptionClick('Menor precio')}
              >
                Menor precio
              </div>
              <div
                className={`sort-option ${
                  sortOption === 'Mayor precio' ? 'selected' : ''
                }`}
                onClick={() => handleSortOptionClick('Mayor precio')}
              >
                Mayor precio
              </div>
            </div>
          </Paper>
        )}
      </div>
    </ClickAwayListener>
  )
}

export default SortButton
