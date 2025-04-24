// import { Reserva, EstadoReserva } from './reserva'
// import Usuario from './usuario'

class CambioEstadoReserva {
  /**
     *
     * @param {Date} fecha
     * @param {EstadoReserva} estado
     * @param {Reserva} reserva
     * @param {String} motivo
     * @param {Usuario} usuario
     */

  constructor (fecha, estado, reserva, motivo, usuario) {
    this.fecha = fecha
    this.estado = estado
    this.reserva = reserva
    this.motivo = motivo
    this.usuario = usuario
  }
}

module.exports = CambioEstadoReserva
