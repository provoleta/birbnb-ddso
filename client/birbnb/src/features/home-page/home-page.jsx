import './home-page.css'
import Carousel from '../../components/carousel/carousel.jsx'
import { useState } from 'react'
//import { getAlojamientos } from '../../api/api.js'

function HomePage() {
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [currentPageHomes, setCurrentPageHomes] = useState([])
  //TODO: Ir planteando comunicacion con el resto de la API para traerme los alojamientos.

  const handlePageNumberChange = (newPageNumber) => {
    setPageNumber(newPageNumber)
  }

  return (
    <>
      <div className="home-sugerencias">
        <h1>Alojamientos que podrian interesarte...</h1>
      </div>
      <Carousel
        currentPageHomes={currentPageHomes}
        pageNumber={pageNumber}
        handlePageNumberChange={handlePageNumberChange}
        totalPages={totalPages}
        pagesize={pageSize}
      ></Carousel>
    </>
  )
}

export default HomePage
