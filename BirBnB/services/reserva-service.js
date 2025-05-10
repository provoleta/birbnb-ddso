import ExcededTimeException from '../exceptions/excededTimeException'
import DisponibilidadException from '../exceptions/disponibilidadException'
import NotFoundException from '../exceptions/not-found-exception.js'
import dayjs from 'dayjs'

export class reservaService {
  constructor(reservaRepository) {
    this.reservaRepository = reservaRepository
  }

  async update(reserva) {
    const reservaAmodificar = await this.reservaRepository.findById(reserva.id)
    if (!reservaAmodificar) return { error: 'not found' }

    // verificar que la fecha buscada no coincida con una en la que no haya disponibilidad

    const alojamiento = reservaAmodificar.alojamiento
    const disponibilidad = alojamiento.estasDisponibleEn(reserva.rangoFechas)

    if (!disponibilidad) throw new DisponibilidadException(reserva.alojamiento) //return { message: 'El alojamiento no esta disponible en el rango de fechas solicitado. ' }

    reservaAmodificar.rangoFechas = reserva.rangoFechas

    const reservaModificada = await this.reservaRepository.save(reservaAmodificar)

    return this.toDTO(reservaModificada)
  }

  // eliminacion de la reserva pedida, hay que ver lo de reservaId
  async delete(reservaId) {
    const reservaAeliminar = await this.reservaRepository.findById(reservaId)

    if (dayjs() > reservaAeliminar.rangofechas.fechaInicio) {
      //return { message: 'No se puede cancelar la reserva ya que la misma se encuentra en curso.'}
      throw new ExcededTimeException(reservaAeliminar)
    }
    const reservaEliminada = await this.reservaRepository.delete(reservaId)

    if (!reservaEliminada) {
      throw new NotFoundException()
    }

    return reservaEliminada
  }

  async create(reserva) {
    // verificar disponibilidad para el rango de fechas elegido
    const alojamiento = reserva.alojamiento
    const disponibilidad = alojamiento.estasDisponibleEn(reserva.rangoFechas)

    if (!disponibilidad) return { message: 'La fecha solicitada se encuentra ocupada' }

    const reservaCreada = await this.reservaRepository.save(reserva)

    return this.toDTO(reservaCreada)
  }

  async findByUserId(userId) {
    const reservas = await this.reservaRepository.filterByUserId(userId)

    if (!reservas) return { message: 'no se encontraron reservas del usuario' }

    const historialReservas = reservas.map((reserva) => this.toDTO(reserva))

    return historialReservas
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
