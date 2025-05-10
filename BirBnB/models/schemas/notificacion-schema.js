import mongoose from 'mongoose'
import Notificacion from '../entities/notificacion.js'

const notificacionSchema = new mongoose.Schema({
  mensaje: {
    type: String,
    required: true,
    trim: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  fechaAlta: {
    type: String,
    validate: {
      validator: function (v) {
        // Valida el formato de fecha como DD-MM-YYYY
        return /^\d{2}-\d{2}-\d{4}$/.test(v)
      },
      message: (props) =>
        `${props.value} no es un formato de fecha válido. Usa DD-MM-YYYY.`,
    },
    required: true,
  },
})

notificacionSchema.loadClass(Notificacion)

const NotificacionModel = mongoose.model('Notificacion', notificacionSchema)

export { NotificacionModel, notificacionSchema }
