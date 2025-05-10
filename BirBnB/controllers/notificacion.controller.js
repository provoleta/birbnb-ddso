export class NotificacionController {
  constructor(notificacionService) {
    this.notificacionService = notificacionService
  }

  async findAllNotRead(req, res) {
    const userId = req.params.userId
    const notificaciones = await this.notificacionService.findAll(false, userId)

    if (!notificaciones) {
      return res.status(404).json({ message: 'No se encontro al usuario.' })
    }

    return res.status(200).json(notificaciones)
  }

  async update(req, res) {
    const { id, userId } = req.query
    const notificacion = await this.notificacionService.markAsRead(id, userId)

    if (!notificacion) {
      return res.status(404).json({ message: 'No se encontro la notificacion.' })
    }

    return res.status(200).json(notificacion)
  }
}
