import mongoose from 'mongoose'
import { Reserva } from '../entities/reserva.js'
import RangoFechas from '../entities/rango-fechas.js'

const rangoFechasSchema = new mongoose.Schema({
  fechaInicio: {
    type: String,
    required: true,
  },
  fechaFin: {
    type: String,
    required: true,
  },
})

const reservaSchema = new mongoose.Schema(
  {
    fechaAlta: {
      type: String,
      required: true,
    },

    huespedReservador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    },

    alojamiento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Alojamiento',
    },

    rangoFechas: {
      type: rangoFechasSchema,
      required: true,
    },

    precioPorNoche: {
      type: Number,
      required: true,
    },

    estado: {
      type: String,
      enum: ['PENDIENTE', 'CONFIRMADA', 'CANCELADA'],
    },
  },
  {
    timestamps: true,
  },
)

rangoFechasSchema.loadClass(RangoFechas)
reservaSchema.loadClass(Reserva)

const ReservaModel = mongoose.model('Reserva', reservaSchema)

export { ReservaModel, reservaSchema }
