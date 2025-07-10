import './home-page.css'
import Carousel from '../../components/carousel/carousel.jsx'
import Loader from '../../components/loader/loader.jsx'
import { useEffect, useState } from 'react'
import api from '../../api/api'

function HomePage() {
  const [alojamientosCarousel, setAlojamientosCarousel] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .obtenerAlojamientosCarousel()
      .then((data) => {
        setAlojamientosCarousel(data.data)
      })
      .catch((error) => {
        console.error('Error al obtener alojamientos:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      <div className="home-sugerencias">
        <h1>Alojamientos que podrían interesarte...</h1>
      </div>
      {loading ? <Loader /> : <Carousel alojamientos={alojamientosCarousel}></Carousel>}
    </>
  )
}

export default HomePage
