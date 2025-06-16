import DatePicker from 'react-datepicker'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import './calendario-reserva.css'

function ReservationCalendar({ reservas }) {
  const [rangoFecha, setRangoFecha] = useState([null, null])
  const [fechaInicio, fechaFin] = rangoFecha

  // Fechas ocupadas ==> Hay que setearlas segun las reservas del alojamiento
  const occupiedDates = reservas.map((reserva) => ({
    start: new Date(reserva.rangoFechas.fechaInicio),
    end: new Date(reserva.rangoFechas.fechaFin),
  }))

  const estaOcupada = (fecha) => {
    return occupiedDates.some((rango) => fecha >= rango.start && fecha <= rango.end)
  }

  const handlerFechas = (fechas) => {
    setRangoFecha(fechas)
    if (fechas[0] && fechas[1]) {
      const inicio = fechas[0].toISOString().split('T')[0]
      const fin = fechas[1].toISOString().split('T')[0]
      console.log(`Fecha de inicio: ${inicio}, Fecha de fin: ${fin}`)
    }
  }

  return (
    <DatePicker
      selectsRange={true}
      startDate={fechaInicio}
      endDate={fechaFin}
      onChange={handlerFechas}
      filterDate={(fecha) => !estaOcupada(fecha)}
      minDate={new Date()}
      inline
      dayClassName={(date) => {
        if (fechaInicio && fechaFin && date >= fechaInicio && date <= fechaFin) {
          return 'selected-day'
        }
        return undefined
      }}
    />
  )
}

export default ReservationCalendar
