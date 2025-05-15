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
  },
  {
    timestamps: true,
  },
)

rangoFechasSchema.loadClass(RangoFechas)
reservaSchema.loadClass(Reserva)

export const ReservaModel = mongoose.model('Reserva', reservaSchema)
