import './home-page.css'
import Carousel from '../../components/carousel/carousel.jsx'
import { useEffect, useState } from 'react'
import { getAlojamientos } from '../../api/api.js'

function HomePage() {
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [currentPageHomes, setCurrentPageHomes] = useState([])
  //TODO: Ir planteando comunicacion con el resto de la API para traerme los alojamientos.

  const handlePageNumberChange = (newPageNumber) => {
    setPageNumber(newPageNumber)
  }

  // useEffect(() => {
  //   cargarAlojamientos()
  // }, [pageNumber])

  // const cargarAlojamientos = async () => {
  //   try {
  //     const data = await getAlojamientos(pageNumber)

  //     const alojamientosConCantidad = data.products.map((p) => ({ ...p, cantidad: 0 }))

  //     setCurrentPageHomes(alojamientosConCantidad)
  //     setTotalPages(data.totalPages)
  //     setPageSize(data.pageSize)
  //     console.log(data)
  //   } catch (error) {
  //     console.error('Error loading products:', error)
  //   }
  // }

  return (
    <>
      <div className="home-sugerencias">
        <h1>Alojamientos que podrian interesarte...</h1>
      </div>
      <div className="home-sugerencias">
        <Carousel
          currentPageHomes={currentPageHomes}
          pageNumber={pageNumber}
          handlePageNumberChange={handlePageNumberChange}
          totalPages={totalPages}
          pagesize={pageSize}
        ></Carousel>
      </div>
    </>
  )
}

export default HomePage
