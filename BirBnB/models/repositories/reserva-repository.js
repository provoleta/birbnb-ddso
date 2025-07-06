import dayjs from 'dayjs'
import { ReservaModel } from '../schemas/reserva-schema.js'

export default class ReservaRepository {
  constructor() {
    this.model = ReservaModel
  }

  async findById(reservaId) {
    return await this.model
      .findById(reservaId)
      .populate(['huespedReservador', 'alojamiento'])
  }

  async save(reserva) {
    const query = reserva.id ? { _id: reserva.id } : { _id: new this.model()._id }

    return await this.model
      .findOneAndUpdate(query, reserva, {
        new: true,
        runValidators: true,
        upsert: true,
      })
      .populate(['huespedReservador', 'alojamiento'])
  }

  async delete(reservaId) {
    const eliminado = await this.model.findByIdAndDelete(reservaId)
    return eliminado !== null
  }

  // filterByUserId

  async filterByUserId(userId, reservasCaducadas = false) {
    // el = false hace que reservasCaducadas sea opcional
    if (!reservasCaducadas) {
      return await this.model
        .find({
          huespedReservador: userId,
          'rangoFechas.fechaInicio': { $gte: dayjs().toISOString() },
        })
        .populate(['huespedReservador', 'alojamiento'])
    }
    return await this.model
      .find({ huespedReservador: userId })
      .populate(['huespedReservador', 'alojamiento'])
  }
}
