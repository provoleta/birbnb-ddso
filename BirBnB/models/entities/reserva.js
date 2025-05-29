import CambioEstadoReserva from './cambio-estado-reserva.js'
import { FactoryNotificacion } from './factory-notificacion.js'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)
class Reserva {
  /**
   *
   * @param {Int} id
   * @param {dayjs.Dayjs} fechaAlta
   * @param {Usuario} huespedReservador
   * @param {Alojamiento} alojamiento
   * @param {RangoFechas} rangoFechas
   * @param {Double} precioPorNoche
   *
   */
  id
  constructor(fechaAlta, huespedReservador, alojamiento, rangoFechas) {
    this.fechaAlta = fechaAlta
    this.huespedReservador = huespedReservador
    this.alojamiento = alojamiento
    this.rangoFechas = rangoFechas
    this.estado = EstadoReserva.PENDIENTE
    this.precioPorNoche = alojamiento.precioPorNoche
    this.cambiosEstadoReserva = []
  }

  // 1) Actualizar el estado | 2) Crear una notificacion | 3) Enviar la notificacion al destinatario | 4) Crear una instancia de cambiosEstadoReserva | 5) Agregar la instancia a la Reserva
  actualizarEstado(estadoReserva, motivoCambio) {
    this.estado = estadoReserva
    const notificacion = FactoryNotificacion.crearSegunReserva(this) // arma la notificacion con el estado nuevo
    notificacion.usuario.agregarNotificacion(notificacion)
    this.crearCambioEstado(notificacion.usuario, estadoReserva, motivoCambio)
  }

  // Tengo que verificar si fecha solicitada se superpone el rango de fechas de la reserva

  seSuperponeCon(fechaSolicitada) {
    const fechaInicio = dayjs(this.rangoFechas.fechaInicio)
    const fechaFin = dayjs(this.rangoFechas.fechaFin)

    const superponeFin = fechaSolicitada.fechaFin.isAfter(fechaInicio, 'day')
    const superponeInicio = fechaSolicitada.fechaInicio.isBefore(fechaFin, 'day')

    return superponeFin && superponeInicio
  }

  get anfitrion() {
    return this.alojamiento.anfitrion
  }

  calcularCantidadDias() {
    const fechaFin = dayjs(this.rangoFechas.fechaFin)
    const fechaInicio = dayjs(this.rangoFechas.fechaInicio)
    const cantidadDias = fechaFin.diff(fechaInicio, 'day')
    return cantidadDias
  }

  get fechaInicio() {
    return this.rangoFechas.fechaInicio
  }

  get fechaFin() {
    return this.rangoFechas.fechaFin
  }

  get nombreAlojamiento() {
    return this.alojamiento.nombre
  }

  crearCambioEstado(usuario, estado, motivo) {
    const cambiosEstadoReserva = new CambioEstadoReserva(
      dayjs(),
      estado,
      this,
      motivo,
      usuario,
    )
    this.cambiosEstadoReserva.push(cambiosEstadoReserva)
  }
}

const EstadoReserva = {
  PENDIENTE: 'PENDIENTE',
  CONFIRMADA: 'CONFIRMADA',
  CANCELADA: 'CANCELADA',
}

export { Reserva, EstadoReserva }
