export default class NotificacionController {
  constructor(notificacionService) {
    this.notificacionService = notificacionService
  }

  async findAllNotRead(req, res, next) {
    const userId = req.params.userId

    try {
      const notificaciones = await this.notificacionService.findAll(false, userId)
      return res.status(200).json(notificaciones)
    } catch (error) {
      next(error)
    }
  }

  async findAllRead(req, res, next) {
    const userId = req.params.userId
    try {
      const notificaciones = await this.notificacionService.findAll(false, userId)
      return res.status(200).json(notificaciones)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    const { id, userId } = req.query

    try {
      const notificacion = await this.notificacionService.markAsRead(id, userId)
      return res.status(200).json(notificacion)
    } catch (error) {
      next(error)
    }
  }
}
