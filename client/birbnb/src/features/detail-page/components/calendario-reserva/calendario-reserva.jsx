import DatePicker from 'react-datepicker'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import './calendario-reserva.css'

function ReservationCalendar({ reservas, onFechas }) {
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

  const rangoContieneOcupadas = (inicio, fin) => {
    if (!inicio || !fin) return false

    // Revisa día por día entre inicio y fin
    const currentDate = new Date(inicio)
    while (currentDate <= fin) {
      if (estaOcupada(new Date(currentDate))) {
        return true
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return false
  }

  const handlerFechas = (fechas) => {
    const [fechaInicio, fechaFin] = fechas

    if (fechaInicio && fechaFin && rangoContieneOcupadas(fechaInicio, fechaFin)) {
      setRangoFecha([null, null])
      if (onFechas) {
        onFechas([null, null])
      }
      return
    }
    setRangoFecha(fechas)
    if (onFechas) {
      onFechas(fechas)
    }

    if (fechas[0] && fechas[1]) {
      const inicio = fechas[0].toISOString().split('T')[0]
      const fin = fechas[1].toISOString().split('T')[0]
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
