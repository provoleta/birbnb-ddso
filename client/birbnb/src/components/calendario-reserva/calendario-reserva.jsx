import DatePicker from 'react-datepicker'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'

function ReservationCalendar() {
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  // Fechas ocupadas ==> Hay que setearlas segun las reservas del alojamiento
  const occupiedDates = [{ start: new Date('2025-06-20'), end: new Date('2025-06-25') }]

  const isDateBlocked = (date) => {
    return occupiedDates.some((range) => date >= range.start && date <= range.end)
  }

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => setDateRange(update)}
      filterDate={(data) => !isDateBlocked(data)}
      minDate={new Date()}
      inline
    />
  )
}

export default ReservationCalendar
