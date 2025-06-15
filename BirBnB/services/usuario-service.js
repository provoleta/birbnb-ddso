import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import NotFoundException from '../exceptions/not-found-exception.js'
import PasswordException from '../exceptions/password-exception.js'
import EmailException from '../exceptions/email-exception.js'
export default class UsuarioService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository
  }

  async signup(email, password, nombre) {
    const usuario = await this.usuarioRepository.signup(
      email,
      bcrypt.hashSync(password),
      nombre,
    )
    if (!usuario) throw new EmailException()

    return usuario
  }

  async login(email, password) {
    const user = await this.usuarioRepository.findByEmail(email)
    if (!user) throw new NotFoundException()

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) throw new PasswordException()

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'tu_secreto_seguro',
      { expiresIn: '1h' },
    )

    return token
  }
}
