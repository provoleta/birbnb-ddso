export class reservaService {
  constructor (reservaRepository) {
    this.reservaRepository = reservaRepository
  }

  async update(reserva, reservaId) {
    const reservaAmodificar = await this.reservaRepository.findById(reservaId)
    if (!reservaAmodificar) return { error: 'not found' }
    
    // verificar que la fecha buscada no coincida con una en la que no haya disponibilidad

    alojamiento = reservaAmodificar.alojamiento
    disponibilidad = alojamiento.estasDisponibleEn(reserva.rangoFechas)

    if (!dispobibilidad) return { message: 'El alojamiento no esta disponible en el rango de fechas solicitado. ' }
    
    reservaAmodificar.rangoFechas = reserva.rangoFechas

    this.reservaRepository.update(reservaAmodificar)
  }

 

// eliminacion de la reserva pedida, hay que ver lo de reservaId 
  async delete (reservaId) {
    return await this.reservaRepository.delete(reservaId)
  }

}
