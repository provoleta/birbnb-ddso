import { validarObjectId } from './utils.js'

export default class NotificacionController {
  constructor(notificacionService) {
    this.notificacionService = notificacionService
  }

  async findAll(req, res) {
    const { userId, leida } = req.query
    const leidaBool = leida === 'true'
    validarObjectId(userId)
    const notificaciones = await this.notificacionService.findAll(leidaBool, userId)
    return res.status(200).json(notificaciones)
  }

  async update(req, res) {
    const { id, userId } = req.query
    validarObjectId(id)
    validarObjectId(userId)
    const notificacion = await this.notificacionService.markAsRead(id, userId)
    return res.status(200).json(notificacion)
  }
}
