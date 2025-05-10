import mongoose from 'mongoose'
import { Usuario } from '../entities/usuario.js'

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
    type: Array,
    default: [],
  },
})

usuarioSchema.loadClass(Usuario)
