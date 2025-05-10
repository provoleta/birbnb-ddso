import { AlojamientoModel } from '../schemas/alojamiento-schema'

export class AlojamientoRepository {
  constructor() {
    this.model = AlojamientoModel
  }

  async filterBy(query) {
    const alojamientosFiltrados = await this.model.findBy(query)
    return alojamientosFiltrados
  }

  async countAll() {
    const totalAlojamientos = await this.model.countDocuments()
    return totalAlojamientos
  }
}
