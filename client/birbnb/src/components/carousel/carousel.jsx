import './carousel.css'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ArrowNext from '@mui/icons-material/ArrowForward'
import Button from '@mui/material/Button'
import Alojamiento from '../alojamiento/alojamiento'
import { useState, useEffect } from 'react'

export default function Carousel({ alojamientos }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 576) {
        setItemsPerPage(1)
      } else if (window.innerWidth <= 992) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (currentIndex > alojamientos.length - itemsPerPage) {
      setCurrentIndex(Math.max(0, alojamientos.length - itemsPerPage))
    }
  }, [itemsPerPage, alojamientos.length])

  const handlePrev = () => {
    if (isSliding) return
    setIsSliding(true)
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const handleNext = () => {
    if (isSliding) return
    setIsSliding(true)
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= alojamientos.length ? prevIndex : prevIndex + 1,
    )
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSliding(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [currentIndex])

  return (
    <div className="carousel-container">
      <Button
        className="nav-button prev-button"
        onClick={handlePrev}
        disabled={isSliding || currentIndex === 0}
        aria-label="Anterior"
      >
        <ArrowBack />
      </Button>

      <div className="carousel-items-wrapper">
        <div
          className={`carousel-items${isSliding ? ' sliding' : ''}`}
          style={{
            width: '100%',
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {alojamientos.map((home) => (
            <div
              key={home.id}
              className="carousel-item"
              style={{
                width: `${100 / itemsPerPage}%`,
                minWidth: 0,
              }}
            >
              <Alojamiento alojamiento={home} />
            </div>
          ))}
        </div>
      </div>

      <Button
        className="nav-button next-button"
        onClick={handleNext}
        disabled={isSliding || currentIndex >= alojamientos.length - itemsPerPage}
        aria-label="Siguiente"
      >
        <ArrowNext />
      </Button>
    </div>
  )
}
