import './carousel.css'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ArrowNext from '@mui/icons-material/ArrowForward'
import Button from '@mui/material/Button'
import Alojamiento from '../alojamiento/alojamiento'
import { alojamientos } from '../../features/search-page/alojamientosMockeados'
import { useState, useEffect } from 'react'

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  // Calcular el número total de páginas
  const totalPages = Math.ceil(alojamientos.length / itemsPerPage)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : alojamientos.length - itemsPerPage,
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage < alojamientos.length ? prevIndex + 1 : 0,
    )
  }

  // Obtener los elementos actuales para mostrar
  const visibleAlojamientos = alojamientos.slice(
    currentIndex,
    Math.min(currentIndex + itemsPerPage, alojamientos.length),
  )

  return (
    <div className="carousel-container">
      <Button
        className="nav-button prev-button"
        onClick={handlePrev}
        aria-label="Previous"
      >
        <ArrowBack />
      </Button>

      <div className="carousel-items-wrapper">
        <div className="carousel-items">
          {visibleAlojamientos.map((home) => (
            <div className="carousel-item" key={home.id}>
              <Alojamiento alojamiento={home} />
            </div>
          ))}
        </div>
      </div>

      <Button className="nav-button next-button" onClick={handleNext} aria-label="Next">
        <ArrowNext />
      </Button>
    </div>
  )
}
