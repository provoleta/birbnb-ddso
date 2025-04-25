// import RangoFechas from './rango-fechas.js'
// import Alojamiento from './alojamiento.js'
import CambioEstadoReserva from './cambio-estado-reserva.js'
// import Usuario from './usuario.js'
import { FactoryNotificacion } from './factory-notificacion.js'

class Reserva {
  /**
     *
     * @param {Date} fechaAlta
     * @param {Usuario} huespedReservador
     * @param {Alojamiento} alojamiento
     * @param {RangoFechas} rangoFechas
     * @param {EstadoReserva} estado
     * @param {Double} precioPorNoche
     *
     */

  constructor (fechaAlta, huespedReservador, alojamiento, rangoFechas, estado, precioPorNoche) {
    this.fechaAlta = fechaAlta
    this.huespedReservador = huespedReservador
    this.alojamiento = alojamiento
    this.rangoFechas = rangoFechas
    this.estado = estado
    this.precioPorNoche = precioPorNoche
    this.cambiosEstadoReserva = []
  }

  // 1) Actualizar el estado | 2) Crear una notificacion | 3) Enviar la notificacion al destinatario | 4) Crear una instancia de cambiosEstadoReserva | 5) Agregar la instancia a la Reserva
  actualizarEstado (EstadoReserva, MotivoCambio) {
    this.estado = EstadoReserva
    const notificacion = FactoryNotificacion.crearSegunReserva(this) // arma la notificacion con el estado nuevo
    notificacion.usuario.agregarNotificacion(notificacion)
    this.crearCambioEstado(notificacion.usuario, EstadoReserva, MotivoCambio) // crea el cambio de estado y lo agrega a la reserva
  }

  // Tengo que verificar si fecha solicitada se superpone el rango de fechas de la reserva
  seSuperponeCon (fechaSolicitada) {
    const superponeFin = fechaSolicitada.fechaFin > this.rangoFechas.fechaInicio

    const superponeInicio = fechaSolicitada.fechaInicio < this.rangoFechas.fechaFin

    return superponeFin && superponeInicio
  }

  get anfitrion () {
    return this.alojamiento.anfitrion
  }

  // TODO: Usar una biblioteca
  calcularCantidadDias () {
    const diferenciaFechas = this.rangoFechas.fechaFin - this.rangoFechas.fechaInicio

    // Convierto la diferencia a días
    const cantidadDias = diferenciaFechas / (1000 * 60 * 60 * 24)

    return cantidadDias
  }

  get fechaInicio () {
    return this.rangoFechas.fechaInicio
  }

  get fechaFin () {
    return this.rangoFechas.fechaFin
  }

  crearCambioEstado (usuario, estado, motivo) {
    const cambiosEstadoReserva = new CambioEstadoReserva(new Date(), estado, this, motivo, usuario)
    this.cambiosEstadoReserva.push(cambiosEstadoReserva)
  }
}

const EstadoReserva = {
  PENDIENTE: 'PENDIENTE',
  CONFIRMADA: 'CONFIRMADA',
  CANCELADA: 'CANCELADA'
}

export { Reserva, EstadoReserva };
