import mongoose from 'mongoose'
import Notificacion from '../entities/notificacion.js'
import { Usuario } from '../entities/usuario.js'
import { Dayjs } from 'dayjs'

const notificacionSchema = new mongoose.Schema({
  mensaje: {
    type: String,
    required: true,
    trim: true,
  },
  usuario: {
    type: Usuario,
    required: true,
  },
  fechaAlta: {
    type: Dayjs,
    required: true,
  },
})

notificacionSchema.loadClass(Notificacion)

const NotificacionModel = mongoose.model('Notificacion', notificacionSchema)

export { NotificacionModel, notificacionSchema }
