import { UsuarioModel } from '../schemas/usuario-schema.js'

export default class UsuarioRepository {
  constructor() {
    this.model = UsuarioModel
  }

  async signup(email, password, nombre, profileImage) {
    const usuarioExistente = await this.model.findOne({ email })
    if (usuarioExistente) {
      return null
    }

    const usuario = new this.model({
      nombre,
      email,
      password,
      notificaciones: [],
      tipo: 'HUESPED', // Por defecto, el tipo es HUESPED
      profileImage: profileImage,
    })
    return await usuario.save()
  }

  async findByEmail(email) {
    return await this.model.findOne({ email })
  }

  async findById(usuarioId) {
    return await this.model.findById(usuarioId)
  }

  async findAndUpdate(usuario, notificacion) {
    await this.model.findOneAndUpdate(
      { nombre: usuario.nombre },
      { $push: { notificaciones: notificacion } },
      { new: true },
    )
  }
}
