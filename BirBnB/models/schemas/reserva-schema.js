import mongoose from 'mongoose'
import { Reserva } from '../entities/reserva.js'

const rangoFechasSchema = new mongoose.Schema({
  fechaDesde: {
    type: String,
    required: true,
  },
  fechaHasta: {
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

    usuario: {
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

reservaSchema.loadClass(Reserva)

export const ReservaModel = mongoose.model('Reserva', reservaSchema)
