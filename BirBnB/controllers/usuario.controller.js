import { validarObjectId } from './utils.js'

export default class UsuarioController {
  constructor(notificacionService, reservaService, usuarioService, alojamientoService) {
    this.notificacionService = notificacionService
    this.reservaService = reservaService
    this.usuarioService = usuarioService
    this.alojamientoService = alojamientoService
  }

  async findAll(req, res) {
    const { leida } = req.query
    const leidaBool = leida === 'true'
    validarObjectId(req.user.id)
    const notificaciones = await this.notificacionService.findAll(leidaBool, req.user.id)
    return res.status(200).json(notificaciones)
  }

  async update(req, res) {
    const id = req.params.id
    validarObjectId(id)
    const notificacion = await this.notificacionService.markAsRead(id, req.user.id)
    return res.status(200).json(notificacion)
  }

  async findReservas(req, res) {
    const reserva = await this.reservaService.findByUserId(req.user.id)
    res.status(200).json(reserva)
  }

  async findAlojamientos(req, res) {
    const alojamientos = await this.alojamientoService.findByUserId(req.user.id)
    res.status(200).json(alojamientos)
  }

  async signup(req, res) {
    const { email, password, name } = req.body
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    const token = await this.usuarioService.signup(email, password, name)
    return res.status(201).json({ token })
  }

  async login(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' })
    }

    const token = await this.usuarioService.login(email, password)
    return res.status(200).json({ token })
  }

  async getProfile(req, res) {
    const id = req.user.id
    //console.log('Id', id)
    const usuario = await this.usuarioService.getProfile(id)
    return res.status(200).json(usuario)
  }
}
