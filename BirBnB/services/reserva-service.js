import ExcededTimeException from "../exceptions/excededTimeException"
import DispoibilidadException from "../exceptions/disponibilidadException"

export class reservaService {
  constructor (reservaRepository) {
    this.reservaRepository = reservaRepository

  }

  async update(reserva) {
    const reservaAmodificar = await this.reservaRepository.findById(reserva.id)
    if (!reservaAmodificar) return { error: 'not found' }
    
    // verificar que la fecha buscada no coincida con una en la que no haya disponibilidad

    alojamiento = reservaAmodificar.alojamiento
    disponibilidad = alojamiento.estasDisponibleEn(reserva.rangoFechas)

    if (!dispobibilidad) throw new DispoibilidadException(reserva.alojamiento)//return { message: 'El alojamiento no esta disponible en el rango de fechas solicitado. ' }
    
    reservaAmodificar.rangoFechas = reserva.rangoFechas

    const reservaModificada = await this.reservaRepository.update(reservaAmodificar)

    return this.toDTO(reservaModificada)
  }

// eliminacion de la reserva pedida, hay que ver lo de reservaId 
  async delete(reservaId) {
    reservaAeliminar = await this.reservaRepository.findById(reservaId)
    
    if (dayjs() > reservaAeliminar.rangofechas.fechaInicio) {
      //return { message: 'No se puede cancelar la reserva ya que la misma se encuentra en curso.'}
      throw new ExcededTimeException(reserva)
    }
    else { return await this.reservaRepository.delete(reserva.id) }
  }

  async create(reserva) {
    // verificar disponibilidad para el rango de fechas elegido
    alojamiento = reserva.alojamiento
    disponibilidad = alojamiento.estasDisponibleEn(reserva.rangoFechas)

    if(!disponibilidad) return {message: 'La fecha solicitada se encuentra ocupada'}
    
    reservaCreada = await this.reservaRepository.create(reserva)

    return this.toDTO(reservaCreada)
  }

  async findByUserId(userId) {
    reservas = await this.reservaRepository.filterById(userId)

    if (!reservas) return { message: 'no se encontraron reservas del usuario' }
    
    historialReservas = reservas.map(reserva => this.toDTO(reserva))

    return historialReservas
  }

  toDTO (reserva) {
    return {
      fechaAlta: reserva.fechaAlta,
      huespedReservador:  reserva.huespedReservador,
      alojamiento: reserva.alojamiento,
      rangoFechas: reserva.rangoFechas,
      estado: reserva.EstadoReserva,
      precioPorNoche: reserva.precioPorNoche,
      cambiosEstadoReserva: reserva.cambiosEstadoReserva
    }
  }
}
