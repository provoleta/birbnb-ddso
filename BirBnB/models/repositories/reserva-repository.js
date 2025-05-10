import { ReservaModel } from '../schemas/reserva-schema.js'

export class ReservaRepository {
  constructor() {
    this.model = ReservaModel
  }

  async findById(reservaId) {
    return await this.model.findById(reservaId).populate(['usuario', 'alojamiento'])
  }

  // UPDATE

  async update(reserva) {
    const query = reserva.id

    return await this.model
      .findOneAndUpdate(query, reserva, {
        new: true,
        runValidators: true,
      })
      .populate(['usuario', 'alojamiento'])
  }

  // DELETE

  async delete(reservaId) {
    const eliminado = await this.model.findByIdAndDelete(reservaId)
    return eliminado !== null
  }

  // CREATE

  // FilterByUserId

  async filterByUserId(userId) {
    const historialReservas = await this.model.find({})
  }
}
