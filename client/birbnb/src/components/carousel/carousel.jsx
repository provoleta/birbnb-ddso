import './carousel.css'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ArrowNext from '@mui/icons-material/ArrowForward'
import Button from '@mui/material/Button'
import Alojamiento from '../alojamiento/alojamiento'
import { alojamientos } from '../../features/search-page/alojamientosMockeados'
import { useState, useRef, useEffect } from 'react'

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const itemsPerPage = 3
  const carouselRef = useRef(null)

  // Calcular el número total de páginas
  const totalPages = Math.ceil(alojamientos.length / itemsPerPage)

  const handlePrev = () => {
    if (isSliding) return

    setIsSliding(true)
    setCurrentIndex((prevIndex) => {
      // Si estamos en el primer elemento, volvemos al último grupo
      if (prevIndex === 0) {
        return Math.max(0, alojamientos.length - itemsPerPage)
      }
      // De lo contrario, retrocedemos un elemento
      return Math.max(0, prevIndex - 1)
    })
  }

  const handleNext = () => {
    if (isSliding) return

    setIsSliding(true)
    setCurrentIndex((prevIndex) => {
      // Si estamos en el último grupo, volvemos al principio
      if (prevIndex + itemsPerPage >= alojamientos.length) {
        return 0
      }
      // De lo contrario, avanzamos un elemento
      return Math.min(alojamientos.length - itemsPerPage, prevIndex + 1)
    })
  }

  useEffect(() => {
    // Restablecer el estado de deslizamiento después de que la transición haya terminado
    const timer = setTimeout(() => {
      setIsSliding(false)
    }, 500) // Coincide con la duración de la transición

    return () => clearTimeout(timer)
  }, [currentIndex])

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
        disabled={isSliding}
        aria-label="Anterior"
      >
        <ArrowBack />
      </Button>

      <div className="carousel-items-wrapper">
        <div
          ref={carouselRef}
          className={`carousel-items ${isSliding ? 'sliding' : ''}`}
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {alojamientos.map((home) => (
            <div key={home.id} className="carousel-item">
              <Alojamiento alojamiento={home} />
            </div>
          ))}
        </div>
      </div>

      <Button
        className="nav-button next-button"
        onClick={handleNext}
        disabled={isSliding}
        aria-label="Siguiente"
      >
        <ArrowNext />
      </Button>
    </div>
  )
}
