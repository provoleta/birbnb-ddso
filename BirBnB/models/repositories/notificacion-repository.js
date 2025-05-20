import NotFoundException from '../../exceptions/not-found-exception.js'
import { UsuarioModel } from '../schemas/usuario-schema.js'

export default class NotificacionRepository {
  constructor() {
    this.model = UsuarioModel
  }

  async findAll(read, userId) {
    const notificaciones = await this.obtenerNotificaciones(userId) // devuelve un usuario que solo tiene el campo notificaciones
    return notificaciones.filter((notif) => notif.leida === read)
  }

  async findById(notificacionId, userId) {
    const notificaciones = await this.obtenerNotificaciones(userId)
    return notificaciones.find((notif) => notif.id === notificacionId)
  }

  async update(notificacion, userId) {
    await this.model.findOneAndUpdate(
      {
        _id: userId,
        'notificaciones._id': notificacion.id,
      },
      {
        $set: { 'notificaciones.$': notificacion },
      },
      { new: true },
    )
  }

  async obtenerNotificaciones(userId) {
    const usuario = await this.model.findById(userId).select('notificaciones')
    if (!usuario) {
      throw new NotFoundException('No se encuentra al usuario') //TODO MANEJAR EXCEPCION SI EL USUARIO NO EXISTE
    }
    return usuario.notificaciones
  }
}
