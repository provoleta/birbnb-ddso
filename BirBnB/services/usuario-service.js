import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import NotFoundException from '../exceptions/not-found-exception.js'
import PasswordException from '../exceptions/password-exception.js'
export default class UsuarioService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository
  }

  async signup(email, password, nombre) {
    return await this.usuarioRepository.singup(email, bcrypt.hashSync(password), nombre)
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
