import mongoose from 'mongoose'
import { Reserva, RangoFechas } from '../entities/reserva.js'
import { Dayjs } from 'dayjs'

const reservaSchema = new mongoose.Schema(
  {
    fechaAlta: {
      type: Dayjs,
      required: true,
    },

    usuario: {
      type: mongoose.Schema.Types.Objectid,
      ref: 'Usuario',
    },

    alojamiento: {
      type: mongoose.Schema.Types.Objectid,
      ref: 'Alojamiento',
    },

    rangoFechas: {
      type: RangoFechas,
      required: true,
    },

    precioPorNoche: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

reservaSchema.loadClass(Reserva)

export const ReservaModel = mongoose.model('Reserva', reservaSchema)
