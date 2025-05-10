import dayjs from 'dayjs'

export default class NotificacionService {

  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository
  }

  async findAll(read, userId) {
    const notificaciones = await this.notificacionRepository.findAll(read, userId)

    return notificaciones.map((notificacion) => this.toDTO(notificacion))
  }

  async markAsRead(id, userId) {
    const notificacion = await this.notificacionRepository.findById(id, userId)
    if (!notificacion) return { error: 'not found' }

    notificacion.leida = true
    notificacion.fechaLeida = dayjs().format('DD/MM/YYYY HH:mm:ss')

    await this.notificacionRepository.update(notificacion, userId)

    return this.toDTO(notificacion)
  }

  toDTO(notificacion) {
    return {
      id: notificacion.id,
      mensaje: notificacion.mensaje,
      usuario: notificacion.usuario,
      fechaAlta: notificacion.fechaAlta,
      leida: notificacion.leida,
      fechaLeida: notificacion.fechaLeida,
    }
  }
}

