import mongoose, { Mongoose } from 'mongoose'
import { Usuario } from '../entities/usuario.js'
import { notificacionSchema } from './notificacion-schema.js'
import { reservaSchema } from './reserva-schema.js'

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  tipo: {
    type: String,
    enum: ['HUESPED', 'ANFITRION'],
    required: true,
  },
  notificaciones: {
    type: [notificacionSchema],
    default: [],
  },
  profileImage: {
    type: String,
    default: null,
  },
  biografia: {
    type: String,
    default: null,
    trim: true,
  },
  reservas: {
    type: [mongoose.Schema.ObjectId],
    default: [],
    ref: 'Reserva',
  },
})

usuarioSchema.loadClass(Usuario)

export const UsuarioModel = mongoose.model('Usuario', usuarioSchema)
