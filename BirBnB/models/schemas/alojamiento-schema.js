import mongoose from 'mongoose'
import {
  Alojamiento,
  Caracteristica,
  Moneda,
  Foto,
  Direccion,
} from '../entities/alojamiento.js'

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
    type: Moneda,
    required: true,
  },
  horarioCheckin: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v) // Formato HH:MM
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
    type: [mongoose.Schema.ObjectId],
    ref: 'Reserva',
  },
  fotos: {
    type: Foto,
    required: true,
  },
})

alojamientoSchema.loadClass(Alojamiento)

export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema)
