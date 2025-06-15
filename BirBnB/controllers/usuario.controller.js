import { validarObjectId } from './utils.js'

export default class UsuarioController {
  constructor(notificacionService, reservaService, usuarioService) {
    this.notificacionService = notificacionService
    this.reservaService = reservaService
    this.usuarioService = usuarioService
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
    // const userId = req.params.userId
    // validarObjectId(userId)
    const reserva = await this.reservaService.findByUserId(req.user.id)
    res.status(200).json(reserva)
  }

  async signup(req, res) {
    const { email, password, nombre } = req.body
    if (!email || !password || !nombre) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    const usuario = await this.usuarioService.signup(email, password, nombre)
    return res.status(201).json(usuario)
  }

  async login(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' })
    }

    const token = await this.usuarioService.login(email, password)
    return res.status(200).json({ token })
  }
}
