// import Usuario from './usuario.js'
import dayjs from 'dayjs'
import Notificacion from './notificacion.js'
import { EstadoReserva } from './reserva.js'
// Idea: Que el mensaje maneje el contenido de su string. La notificacion, si necesita ese contenido, se la pide al mensaje. Si no tiene parametros, devuelve el string plano, sino, contruye ese string con la informacion dada.
class FactoryNotificacion {
  static mensajeSegunEstado(reserva) {
    const cantidadDias = reserva.calcularCantidadDias()
    const inicioReserva = reserva.fechaInicio.format('DD/MM/YYYY')

    switch (reserva.estado) {
      case EstadoReserva.PENDIENTE:
        return {
          contenido: new MensajeSobreUsuario(
            `{nombre} quiere reservar el alojamiento ${reserva.nombreAlojamiento}, 
            en la fecha: ${inicioReserva}, 
            por la cantidad de dias de: ${cantidadDias}`,
            reserva.huespedReservador,
          ),
          destinatario: reserva.huespedReservador,
        }

      case EstadoReserva.CONFIRMADA:
        return {
          contenido: new MensajePlano(
            `Su reserva para ${reserva.alojamiento} ha sido confirmada.`,
          ),
          destinatario: reserva.huespedReservador,
        }

      case EstadoReserva.CANCELADA:
        return {
          contenido: new MensajePlano(
            `La reserva para ${reserva.alojamiento} fue cancelada`,
          ),
          destinatario: reserva.anfitrion,
        }

      default:
        // TODO: Agregar trazabilidad error
        throw new Error('Estado de reserva no valido')
    }
  }

  /**
   *
   * @param {Reserva} reserva
   * @returns {Notificacion}
   */
  static crearSegunReserva(reserva) {
    const mensaje = FactoryNotificacion.mensajeSegunEstado(reserva)
    return new Notificacion(mensaje.contenido.cuerpo, mensaje.destinatario, dayjs())
  }
}

class MensajeSobreUsuario {
  /**
   *
   * @param {String} texto
   * @param {Usuario} usuario
   */
  constructor(texto, usuario) {
    this.texto = texto
    this.usuario = usuario
  }

  get cuerpo() {
    return this.texto.replace(/{nombre}/g, this.usuario.nombre)
  }
}

class MensajePlano {
  /**
   *
   * @param {String} texto
   */
  constructor(texto) {
    this.texto = texto
  }

  get cuerpo() {
    return this.texto
  }
}

export { FactoryNotificacion, MensajeSobreUsuario, MensajePlano }
