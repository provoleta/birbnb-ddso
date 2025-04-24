import { FactoryNotificacion } from './factory-notificacion.js'
import { EstadoReserva } from './reserva.js'
class Usuario {
  /**
     *
     * @param {String} nombre
     * @param {String} email
     * @param {TipoUsuario} tipo
     *
     */
  constructor (nombre, email, tipo) {
    this.nombre = nombre
    this.email = email
    this.tipo = tipo
    this.notificaciones = []
  }

  reservar (alojamiento, rangoFechas) {
    const reserva = alojamiento.crearReserva(this, rangoFechas)
    const notificacion = FactoryNotificacion.crearSegunReserva(reserva)

    this.agregarNotificacion(notificacion)
  }

  cancelarReserva (reserva, motivo) {
    if (new Date() < reserva.rangoDeFechas.fechaInicio()) {
      reserva.actualizarEstado(EstadoReserva.CANCELADA, motivo)
    }
  }

  agregarNotificacion (unaNotificacion) {
    this.notificaciones.push(unaNotificacion)
  }
}

// ENUMS. Son similares a los constructores en haskell para crear un "nuevo tipo de dato\
// cada static es un valor que puede tomar el tipo de dato.
const TipoUsuario = {
  HUESPED: 'HUESPED',
  ANFITRION: 'ANFITRION'
}

export { Usuario, TipoUsuario };
