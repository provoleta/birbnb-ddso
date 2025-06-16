import './carousel.css'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ArrowNext from '@mui/icons-material/ArrowForward'
import Button from '@mui/material/Button'
import Alojamiento from '../alojamiento/alojamiento'
import { alojamientos } from '../../features/search-page/alojamientosMockeados'

export default function Carousel({
  //currentPageAlojamientos,
  pageNumber,
  totalPages,
  handlePageNumberChange,
}) {
  const handlePrev = () => handlePageNumberChange(Math.max(pageNumber - 1, 1))
  const handleNext = () => handlePageNumberChange(Math.min(pageNumber + 1, totalPages))

  return (
    <div>
      <div className='carousel-container'>
        {alojamientos.map((home) => (
          <Alojamiento alojamiento={home} key={home.id} />
        ))}
        <Button className="button-style" onClick={handlePrev} disabled={pageNumber === 1}>
          <ArrowBack />
        </Button>

        <Button
          className="button-style"
          onClick={handleNext}
          disabled={pageNumber === totalPages}
        >
          <ArrowNext />
        </Button>
      </div>
    </div>
  )
}
