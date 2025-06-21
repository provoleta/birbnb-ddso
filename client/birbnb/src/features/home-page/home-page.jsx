import './home-page.css'
import Carousel from '../../components/carousel/carousel.jsx'
import { useEffect, useState } from 'react'
import api from '../../api/api'

function HomePage() {
  const [alojamientosCarousel, setAlojamientosCarousel] = useState([])

  useEffect(() => {
    api
      .obtenerAlojamientosCarousel()
      .then((data) => {
        setAlojamientosCarousel(data.data)
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
