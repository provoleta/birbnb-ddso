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
    const reservas = await this.usuarioService.getReservas(req.user.id)
    res.status(200).json(reservas)
  }

  async singupAnfitrion(req, res) {
    const { email, password, name, biografia, profileImage } = req.body
    if (!email || !password || !name || !biografia) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    const token = await this.usuarioService.signupAnfitrion(
      email,
      password,
      name,
      biografia,
      profileImage,
    )
    return res.status(201).json({ token })
  }

  async findAlojamientos(req, res) {
    const alojamientos = await this.alojamientoService.findByUserId(req.user.id)
    res.status(200).json(alojamientos)
  }

  async signup(req, res) {
    const { email, password, name, profileImage } = req.body
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    const token = await this.usuarioService.signup(email, password, name, profileImage)
    return res.status(201).json({ token })
  }

  async login(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' })
    }
    const token = await this.usuarioService.login(email, password)

    if (!token) {
      console.log('Email o contraseña incorrectos')
      return res.status(401).json({ message: 'Email o contraseña incorrectos' })
    }

    return res.status(200).json({ token })
  }

  async getProfile(req, res) {
    const id = req.user.id
    const usuario = await this.usuarioService.getProfile(id)
    return res.status(200).json(usuario)
  }
}
