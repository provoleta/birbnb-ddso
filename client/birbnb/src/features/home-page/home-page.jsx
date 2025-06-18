import './home-page.css'
import Carousel from '../../components/carousel/carousel.jsx'
import { useEffect, useState } from 'react'
import Api from '../../api/api'

function HomePage() {
  const [alojamientosCarousel, setAlojamientosCarousel] = useState([])

  useEffect(() => {
    Api()
      .obtenerAlojamientosCarousel() // Debes implementar este método en tu API si no existe
      .then((data) => {
        setAlojamientosCarousel(data.data) // Ajusta según la estructura de respuesta de tu backend
      })
      .catch((error) => {
        console.error('Error al obtener alojamientos:', error)
      })
  }, [])

  return (
    <>
      <div className="home-sugerencias">
        <h1>Alojamientos que podrian interesarte...</h1>
      </div>
      <Carousel alojamientos={alojamientosCarousel}></Carousel>
    </>
  )
}

export default HomePage
