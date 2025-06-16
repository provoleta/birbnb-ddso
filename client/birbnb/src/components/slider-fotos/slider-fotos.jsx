import { useState } from 'react'
import './slider-fotos.css'

const SliderFotos = ({ images }) => {
  const imagesPath = images.map((image) => image.path)

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imagesPath.length - 1 ? 0 : prevIndex + 1,
    )
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagesPath.length - 1 : prevIndex - 1,
    )
  }

  return (
    <div className="slider-container">
      <div className="slider-image-container">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {imagesPath.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Imagen ${index + 1}`}
              className="slider-image"
            />
          ))}
        </div>
      </div>

      {/* Botones de navegación */}
      <button className="slider-button prev-button" onClick={prevImage}>
        &#10094;
      </button>
      <button className="slider-button next-button" onClick={nextImage}>
        &#10095;
      </button>
    </div>
  )
}

export default SliderFotos
