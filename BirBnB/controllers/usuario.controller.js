import { validarObjectId } from './utils.js'

export default class UsuarioController {
  constructor(notificacionService, reservaService) {
    this.notificacionService = notificacionService
    this.reservaService = reservaService
  }

  // TODO: Definir como obtener el userId
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

  async findReservas(req, res) {
    const userId = req.params.userId
    validarObjectId(userId)
    const reserva = await this.reservaService.findByUserId(userId)
    res.status(200).json(reserva)
  }
}
