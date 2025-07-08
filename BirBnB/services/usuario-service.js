import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import NotFoundException from '../exceptions/not-found-exception.js'
import PasswordException from '../exceptions/password-exception.js'
import EmailException from '../exceptions/email-exception.js'
import { Alojamiento } from '../models/entities/alojamiento.js'

export default class UsuarioService {
  constructor(usuarioRepository, alojamientoRepository) {
    this.usuarioRepository = usuarioRepository
    this.alojamientoRepository = alojamientoRepository
  }

  async signup(email, password, nombre, profileImage = null) {
    const existeEmail = await this.usuarioRepository.findByEmail(email)
    if (existeEmail) throw new EmailException()

    const usuario = await this.usuarioRepository.signup(
      email,
      bcrypt.hashSync(password),
      nombre,
      profileImage,
      'HUESPED',
    )

    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET || 'tu_secreto_seguro',
      { expiresIn: '1h' },
    )

    return token
  }

  async signupAnfitrion(email, password, nombre, biografia, profileImage = null) {
    const existeEmail = await this.usuarioRepository.findByEmail(email)
    if (existeEmail) throw new EmailException()

    const usuario = await this.usuarioRepository.signup(
      email,
      bcrypt.hashSync(password),
      nombre,
      profileImage,
      'ANFITRION',
      biografia,
    )

    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET || 'tu_secreto_seguro',
      { expiresIn: '1h' },
    )

    return token
  }

  async login(email, password) {
    const user = await this.usuarioRepository.findByEmail(email)
    if (!user) throw new NotFoundException()

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) throw new PasswordException()

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'tu_secreto_seguro',
      { expiresIn: '1h' },
    )

    return token
  }

  async getProfile(id) {
    const usuario = await this.usuarioRepository.findById(id)

    if (!usuario) throw new NotFoundException()

    return usuario
  }

  async getReservas(idUsuario) {
    const usuario = await this.usuarioRepository.findById(idUsuario)

    if (!usuario) throw new NotFoundException()

    const reservas = await this.usuarioRepository.getReservas(idUsuario)

    if (!reservas) throw new NotFoundException()

    return reservas
  }

  alojamientoFromDTO(alojamientoDTO, anfitrion) {
    return new Alojamiento(
      anfitrion,
      alojamientoDTO.nombre,
      alojamientoDTO.descripcion,
      alojamientoDTO.precioPorNoche,
      alojamientoDTO.moneda,
      alojamientoDTO.horarioCheckIn,
      alojamientoDTO.horarioCheckOut,
      alojamientoDTO.direccion,
      alojamientoDTO.cantHuespedesMax,
      alojamientoDTO.caracteristicas || [],
      [],
      [],
    )
  }
}
