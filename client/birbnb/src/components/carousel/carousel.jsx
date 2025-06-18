import './carousel.css'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ArrowNext from '@mui/icons-material/ArrowForward'
import Button from '@mui/material/Button'
import Alojamiento from '../alojamiento/alojamiento'
import { useState, useRef, useEffect } from 'react'

export default function Carousel({ alojamientos }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const itemsPerPage = 3
  const carouselRef = useRef(null)

  const handlePrev = () => {
    if (isSliding) return

    setIsSliding(true)
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return Math.max(0, alojamientos.length - itemsPerPage)
      }
      return Math.max(0, prevIndex - 1)
    })
  }

  const handleNext = () => {
    if (isSliding) return

    setIsSliding(true)
    setCurrentIndex((prevIndex) => {
      if (prevIndex + itemsPerPage >= alojamientos.length) {
        return 0
      }
      return Math.min(alojamientos.length - itemsPerPage, prevIndex + 1)
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSliding(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [currentIndex])

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
