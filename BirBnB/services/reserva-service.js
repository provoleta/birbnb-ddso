import ExcededTimeException from '../exceptions/excededTimeException.js'
import DisponibilidadException from '../exceptions/disponibilidadException.js'
import NotFoundException from '../exceptions/not-found-exception.js'
import { Reserva } from '../models/entities/reserva.js'
import { FactoryNotificacion } from '../models/entities/factory-notificacion.js'
import RangoFechas from '../models/entities/rango-fechas.js'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)

export default class ReservaService {
  /**
   *
   * @param {ReservaRepository} reservaRepository
   * @param {AlojamientoRepository} alojamientoRepository
   * @param {UsuarioRepository} usuarioRepository
   */
  constructor(reservaRepository, alojamientoRepository, usuarioRepository) {
    this.reservaRepository = reservaRepository
    this.alojamientoRepository = alojamientoRepository
    this.usuarioRepository = usuarioRepository
  }

  async update(reserva) {
    const reservaAmodificar = await this.reservaRepository.findById(reserva.id)
    if (!reservaAmodificar) throw new NotFoundException()

    // verificar que la fecha buscada no coincida con una en la que no haya disponibilidad

    const alojamiento = await this.alojamientoRepository.findById(
      reservaAmodificar.alojamiento.id,
    )

    const disponibilidad = alojamiento.estasDisponibleParaCambiar(
      reserva.rangoFechas,
      reserva.id,
    )

    if (!disponibilidad) throw new DisponibilidadException(reserva.alojamiento)

    const nuevoRangoDeFechas = new RangoFechas(
      dayjs(reserva.rangoFechas.fechaInicio, 'DD/MM/YYYY'),
      dayjs(reserva.rangoFechas.fechaFin, 'DD/MM/YYYY'),
    )

    // Verifico que si la quiero actualizar, no este iniciada la misma
    if (dayjs().isAfter(reservaAmodificar.rangoFechas.fechaInicio, 'DD/MM/YYYY')) {
      throw new ExcededTimeException()
    }

    const nuevaReserva = new Reserva(
      reservaAmodificar.fechaAlta,
      reservaAmodificar.huespedReservador,
      alojamiento,
      nuevoRangoDeFechas,
    )

    const reservaModificada = await this.reservaRepository.save(nuevaReserva)

    return this.toDTO(reservaModificada)
  }

  // eliminacion de la reserva pedida, hay que ver lo de reservaId
  async delete(reservaId) {
    const reservaAeliminar = await this.reservaRepository.findById(reservaId)

    if (!reservaAeliminar) throw new NotFoundException()

    if (dayjs().isAfter(reservaAeliminar.rangoFechas.fechaInicio, 'DD/MM/YYYY')) {
      throw new ExcededTimeException()
    }
    const reservaEliminada = await this.reservaRepository.delete(reservaId)

    if (!reservaEliminada) throw new NotFoundException()

    await this.alojamientoRepository.removeReserva(
      reservaAeliminar.alojamiento.id,
      reservaId,
    )

    return reservaEliminada
  }

  async create(reserva) {
    const alojamientoId = reserva.idAlojamiento
    const alojamiento = await this.alojamientoRepository.findById(alojamientoId)

    const rangoDeFechas = new RangoFechas(
      dayjs(reserva.rangoFechas.fechaInicio, 'DD/MM/YYYY'),
      dayjs(reserva.rangoFechas.fechaFin, 'DD/MM/YYYY'),
    )

    if (!alojamiento) throw new NotFoundException()

    const disponibilidad = alojamiento.estasDisponibleEn(rangoDeFechas)
    if (!disponibilidad) throw new DisponibilidadException(alojamiento)

    const huespedReservador = await this.usuarioRepository.findById(
      reserva.huespedReservadorId,
    )

    const reservaACrear = new Reserva(
      reserva.fechaAlta,
      huespedReservador,
      alojamiento,
      rangoDeFechas,
    )

    const reservaCreada = await this.reservaRepository.save(reservaACrear)

    this.alojamientoRepository.addReserva(alojamientoId, reservaCreada.id)

    this.notificarReserva(alojamiento.anfitrion, reservaACrear)

    return this.toDTO(reservaCreada)
  }

  async findByUserId(userId) {
    const reservas = await this.reservaRepository.filterByUserId(userId)

    if (!reservas) throw new NotFoundException()

    const historialReservas = reservas.map((reserva) => this.toDTO(reserva))

    return historialReservas
  }

  async notificarReserva(anfitrion, reserva) {
    const notificacion = FactoryNotificacion.crearSegunReserva(reserva)
    await this.usuarioRepository.findAndUpdate(anfitrion, notificacion)
  }
  toDTO(reserva) {
    return {
      fechaAlta: reserva.fechaAlta,
      huespedReservador: reserva.huespedReservador,
      alojamiento: reserva.alojamiento,
      rangoFechas: reserva.rangoFechas,
      estado: reserva.EstadoReserva,
      precioPorNoche: reserva.precioPorNoche,
      cambiosEstadoReserva: reserva.cambiosEstadoReserva,
    }
  }
}
