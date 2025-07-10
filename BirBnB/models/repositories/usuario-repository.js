import { UsuarioModel } from '../schemas/usuario-schema.js'

export default class UsuarioRepository {
  constructor() {
    this.model = UsuarioModel
  }

  async signup(email, password, nombre, profileImage, tipo, biografia) {
    const usuarioExistente = await this.model.findOne({ email })
    if (usuarioExistente) {
      return null
    }

    const usuario = new this.model({
      nombre,
      email,
      password,
      notificaciones: [],
      tipo: tipo,
      profileImage: profileImage,
      biografia: biografia || null,
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

  async addReserva(usuarioId, reservaId) {
    await this.model.findByIdAndUpdate(
      usuarioId,
      { $push: { reservas: reservaId } },
      { new: true },
    )
  }

  async getReservas(usuarioId) {
    const usuario = await this.model.findById(usuarioId).populate({
      path: 'reservas',
      populate: { path: 'alojamiento' },
    })
    if (!usuario) {
      return []
    }
    const hoy = new Date()
    // Filtra reservas cuya fecha de inicio es mayor a hoy
    return (usuario.reservas || []).filter(
      (reserva) =>
        reserva.rangoFechas &&
        reserva.rangoFechas.fechaInicio &&
        new Date(reserva.rangoFechas.fechaInicio) > hoy,
    )
  }

  async removeReserva(reservaId) {
    const reservaEliminada = await this.model.findOneAndUpdate(
      { reservas: reservaId },
      { $pull: { reservas: reservaId } },
      { new: true },
    )
    return reservaEliminada
  }
}
