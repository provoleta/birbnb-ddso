import { AlojamientoModel } from '../schemas/alojamiento-schema'

export class AlojamientoRepository {
  constructor() {
    this.model = AlojamientoModel
  }

  async filterBy(query) {
    const alojamientos = await this.model.findBy({ query })
    return alojamientos
  }

  async countAll() {
    const alojamientos = await this.model.find()
    return alojamientos
  }
}
