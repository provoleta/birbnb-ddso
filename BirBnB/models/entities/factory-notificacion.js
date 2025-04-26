// import Usuario from './usuario.js'
import Notificacion from './notificacion.js'
import { EstadoReserva } from './reserva.js'
// Idea: Que el mensaje maneje el contenido de su string. La notificacion, si necesita ese contenido, se la pide al mensaje. Si no tiene parametros, devuelve el string plano, sino, contruye ese string con la informacion dada.
class FactoryNotificacion {
  mensajeSegunEstado(reserva) {
    const cantidadDias = reserva.calcularCantidadDias()
    const inicioReserva = reserva.fechaInicio()

    switch (reserva.estado) {
      case EstadoReserva.PENDIENTE:

        return {
          contenido: new MensajeSobreUsuario(`{nombre} quiere reservar el alojamiento ${reserva.alojamiento}, 
            en la fecha: ${inicioReserva}, 
            por la cantidad de dias de: ${cantidadDias}`,
            reserva.huespedReservador),
          destinatario: reserva.anfitrion
        }

      case EstadoReserva.CONFIRMADA:
        return {
          contenido: new MensajePlano(`Su reserva para ${reserva.alojamiento} ha sido confirmada.`),
          destinatario: reserva.huespedReservador
        }

      case EstadoReserva.CANCELADA:
        return {
          contenido: new MensajePlano(`La reserva para ${reserva.alojamiento} fue cancelada`),
          destinatario: reserva.anfitrion
        }

      default:
        // TODO: Agregar trazabilidad error
        throw new Error('Estado de reserva no valido')
    }
  }

  static crearSegunReserva(reserva) {
    const mensaje = this.mensajeSegunEstado(reserva)
    return new Notificacion(mensaje.contenido, mensaje.destinatario, new Date())
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

  get contenido() {
    return this.texto.replace('{nombre}', this.usuario.nombre)
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

  get contenido() {
    return this.texto
  }
}

export { FactoryNotificacion, MensajeSobreUsuario, MensajePlano };
