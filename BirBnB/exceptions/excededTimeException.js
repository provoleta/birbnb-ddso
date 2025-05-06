export class ExcededTimeException extends Error {
  constructor(reserva) {
    super()
    this.message = `No se puede cancelar la reserva ${reserva.alojamiento.nombre} ya que la misma se encuentra en curso.`
  }
}
