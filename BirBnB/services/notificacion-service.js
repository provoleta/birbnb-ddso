import dayjs from 'dayjs'
import NotFoundException from '../exceptions/not-found-exception.js'

export default class NotificacionService {
  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository
  }

  async findAll(read, userId) {
    const notificaciones = await this.notificacionRepository.findAll(read, userId)
    if (!notificaciones) throw new NotFoundException()

    return notificaciones.map((notificacion) => this.toDTO(notificacion))
  }

  async markAsRead(id, userId) {
    const notificacion = await this.notificacionRepository.findById(id, userId)
    if (!notificacion) throw new NotFoundException()

    notificacion.leida = true
    notificacion.fechaLeida = dayjs().format('DD/MM/YYYY HH:mm:ss')

    const notificacionActualizada = await this.notificacionRepository.update(
      notificacion,
      userId,
    )

    return this.toDTO(notificacionActualizada)
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
