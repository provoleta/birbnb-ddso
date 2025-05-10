import mongoose from 'mongoose'
import Notificacion from '../entities/notificacion.js'
import { Usuario } from '../entities/usuario.js'
import { Dayjs } from 'dayjs'

const notificacionScheme = new mongoose.Schema({
  mensaje: {
    type: String,
    required: true,
    trim: true,
  },
  usuario: {
    type: Usuario,
    requiered: true,
  },
  fechaAlta: {
    type: Dayjs,
    requiered: true,
  },
})

notificacionScheme.loadClass(Notificacion)

export const NotificacionModel = mongoose.model('Notificacion', notificacionScheme)
