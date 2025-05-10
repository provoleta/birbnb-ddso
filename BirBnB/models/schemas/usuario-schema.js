import mongoose from 'mongoose'
import { Usuario } from '../entities/usuario.js'
import { notificacionSchema } from './notificacion-schema.js'

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
  tipo: {
    type: String,
    enum: ['HUESPED', 'ANFITRION'],
    required: true,
  },
  notificaciones: {
    type: [notificacionSchema],
    default: [],
  },
})

usuarioSchema.loadClass(Usuario)

export const UsuarioModel = mongoose.model('Usuario', usuarioSchema)
