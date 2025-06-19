import mongoose from 'mongoose'
import { Alojamiento } from '../entities/alojamiento.js'

const direccionSchema = new mongoose.Schema({
  calle: { type: String, required: true },
  numero: { type: Number, required: true },
  ciudad: { type: String, required: true },
  pais: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
})

const fotoSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  path: { type: String, required: true },
})

const alojamientoSchema = new mongoose.Schema({
  anfitrion: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuario',
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
    type: String,
    required: true,
    enum: ['DOLAR_USA', 'PESO_ARG', 'REALES'],
  },
  horarioCheckIn: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v)
      },
      message: (props) =>
        `${props.value} no es un formato de hora válido! Debe ser HH:MM`,
    },
  },
  horarioCheckOut: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v)
      },
      message: (props) =>
        `${props.value} no es un formato de hora válido! Debe ser HH:MM`,
    },
  },
  direccion: {
    type: direccionSchema,
    required: true,
  },
  cantHuespedesMax: {
    type: Number,
    required: true,
  },
  caracteristicas: {
    type: [String],
    required: true,
  },
  reservas: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Reserva',
  },
  fotos: {
    type: [fotoSchema],
    required: true,
  },
})

alojamientoSchema.loadClass(Alojamiento)

export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema)
