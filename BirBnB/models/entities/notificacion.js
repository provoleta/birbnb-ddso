// const { Usuario } = require('./usuario')

import dayjs from 'dayjs'

class Notificacion {
  id
  fechaLeida

  /**
   *
   * @param {Int} id
   * @param {String} mensaje
   * @param {Usuario} usuario
   * @param {dayjs.Dayjs} fechaAlta
   * @param {Boolean} leida
   * @param {dayjs.Dayjs} fechaLeida
   */
  constructor(mensaje, usuario, fechaAlta) {
    this.mensaje = mensaje
    this.usuario = usuario
    this.fechaAlta = fechaAlta
    this.leida = false
  }

  marcarComoLeida() {
    this.leida = true
    this.fechaLeida = dayjs()
  }
}

export default Notificacion
