import { ReservaModel } from '../schemas/reservaSchema.js'

export class ReservaRepository {
  constructor() {
    this.model = ReservaModel
  }

  async findById(reservaId) {
    return await this.model.findById(id).populate(['usuario', 'alojamiento'])
  }

  async update(reserva) {
    const query = reserva.id

    return await this.model
      .findOneAndUpdate(query, reserva, {
        new: true,
        runValidators: true,
      })
      .populate(['usuario', 'alojamiento'])
  }

  async delete(reservaId) {
    const eliminado = await this.model.findByIdAndDelete(reservaId)
    return eliminado !== null
  }
}
