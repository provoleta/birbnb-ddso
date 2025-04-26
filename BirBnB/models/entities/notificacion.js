// const { Usuario } = require('./usuario')

import dayjs from "dayjs"

class Notificacion {
  #fechaLeida

  /**
     *
     * @param {String} mensaje
     * @param {Usuario} usuario
     * @param {Date} fechaAlta
     * @param {Boolean} leida
     * @param {Date} fechaLeida
     */
  constructor (mensaje, usuario, fechaAlta) {
    this.mensaje = mensaje
    this.usuario = usuario
    this.fechaAlta = fechaAlta
    this.leida = false
  }

  // Setter de atributo "leida"
  marcarComoLeida () {
    this.leida = true
    this.fechaLeida = dayjs()
  }

  get fechaLeida () {
    return this.#fechaLeida
  }
}

export default Notificacion;
