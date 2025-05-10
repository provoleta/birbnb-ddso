import mongoose from 'mongoose'
import {
  Alojamiento,
  Caracteristica,
  Moneda,
  Foto,
  Direccion,
} from '../entities/alojamiento.js'
import Reserva from '../entities/reserva.js'

const alojamientoSchema = new mongoose.Schema({
  anfitrion: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  precioPorNoche: {
    type: Number,
    required: true,
  },
  moneda: {
    type: Moneda,
    required: true,
  },
  horarioCheckin: {
    type: String,
    required: true,
    trim: true,
  },
  horarioCheckOut: {
    type: String,
    required: true,
    trim: true,
  },
  direcion: {
    type: Direccion,
    required: true,
  },
  cantHuespedesMax: {
    type: Number,
    required: true,
  },
  caracteristicas: {
    type: Caracteristica,
    required: true,
  },
  reservas: {
    type: [Reserva],
    required: true,
  },
  fotos: {
    type: Foto,
    required: true,
  },
})

alojamientoSchema.loadClass(Alojamiento)

export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema)
