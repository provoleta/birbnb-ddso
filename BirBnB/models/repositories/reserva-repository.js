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

  // UPDATE

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

  async filterByUserId(userId) {
    return await this.model
      .find({ huespedReservador: userId })
      .populate(['huespedReservador', 'alojamiento'])
  }
}
