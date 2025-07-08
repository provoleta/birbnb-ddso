import mongoose from 'mongoose'
import { Ciudad } from '../entities/alojamiento.js'

const ciudadSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  //pais: { type: String, required: true, trim: true },
})

ciudadSchema.loadClass(Ciudad)

export const CiudadModel = mongoose.model('Ciudad', ciudadSchema)
