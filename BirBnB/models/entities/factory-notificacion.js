// import Usuario from './usuario.js'
import dayjs from 'dayjs'
import Notificacion from './notificacion.js'
import { EstadoReserva } from './reserva.js'
class FactoryNotificacion {
  /**
   *
   * @param {Reserva} reserva
   * @returns
   */

  static formateoMotivo(motivo) {
    if (motivo && motivo.trim() !== '') {
      return ` con motivo: ${motivo.trim()}`
    } else {
      return ''
    }
  }

  static mensajeSegunEstado(reserva, motivo) {
    const cantidadDias = reserva.calcularCantidadDias()
    const inicioReserva = reserva.fechaInicio
    const motivoAcoplar = this.formateoMotivo(motivo)

    switch (reserva.estado) {
      case EstadoReserva.PENDIENTE:
        return {
          contenido: new MensajeSobreUsuario(
            `El usuario {nombre} quiere reservar el alojamiento ${reserva.nombreAlojamiento} en la fecha ${inicioReserva} por la cantidad de ${cantidadDias} noches`,
            reserva.huespedReservador,
          ),
          destinatario: reserva.alojamiento.anfitrion,
        }

      case EstadoReserva.CONFIRMADA:
        return {
          contenido: new MensajePlano(
            `Su reserva para ${reserva.nombreAlojamiento} ha sido confirmada.`,
          ),
          destinatario: reserva.huespedReservador,
        }

      case EstadoReserva.CANCELADA:
        return {
          contenido: new MensajePlano(
            `La reserva para ${reserva.nombreAlojamiento} fue cancelada${motivoAcoplar}`,
          ),
          destinatario: reserva.alojamiento.anfitrion,
        }

      default:
        throw new Error('Estado de reserva no valido')
    }
  }

  /**
   *
   * @param {Reserva} reserva
   * @returns {Notificacion}
   */
  static crearSegunReserva(reserva, motivo) {
    const mensaje = FactoryNotificacion.mensajeSegunEstado(reserva, motivo)
    return new Notificacion(
      mensaje.contenido.cuerpo,
      mensaje.destinatario,
      dayjs().toISOString(),
    )
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
