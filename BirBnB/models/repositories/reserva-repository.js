import { ReservaModel } from '../schemas/reservaSchema.js'

export class ReservaRepository {
  constructor() {
    this.model = ReservaModel
  }
}


async findById(id) {
    return await this.model.findById(id).populate(['usuario','alojamiento'])
}


