import { UsuarioModel } from '../schemas/usuario-schema.js'

export default class UsuarioRepository {
  constructor() {
    this.model = UsuarioModel
  }

  async findById(usuarioId) {
    return await this.model.findById(usuarioId)
  }
}
