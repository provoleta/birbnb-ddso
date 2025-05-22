import { validarObjectId } from './utils.js'

export default class NotificacionController {
  constructor(notificacionService) {
    this.notificacionService = notificacionService
  }

  async findAll(req, res, next) {
    const { userId, leida } = req.query
    const leidaBool = leida === 'true'
    try {
      validarObjectId(userId)
      const notificaciones = await this.notificacionService.findAll(leidaBool, userId)
      return res.status(200).json(notificaciones)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    const { id, userId } = req.query

    try {
      validarObjectId(id)
      validarObjectId(userId)
      const notificacion = await this.notificacionService.markAsRead(id, userId)
      return res.status(200).json(notificacion)
    } catch (error) {
      next(error)
    }
  }
}
