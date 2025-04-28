import dayjs from 'dayjs'

class RangoFechas {
  /**
   * @param {dayjs.Dayjs | string | Date} fechaInicio
   * @param {dayjs.Dayjs | string | Date} fechaFin
   */

  constructor(fechaInicio, fechaFin) {
    this.fechaInicio = fechaInicio
    this.fechaFin = fechaFin
  }
}

export default RangoFechas
