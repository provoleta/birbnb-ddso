import { AlojamientoModel } from '../schemas/alojamiento-schema.js'

export default class AlojamientoRepository {
  constructor() {
    this.model = AlojamientoModel
  }

  async filterBy(filters = {}) {
    const query = {}

    if (filters.idUbicacion) {
      query.ubicacion = filters.idUbicacion
    }
    if (
      filters.idRangoPrecio &&
      filters.idRangoPrecio.min != null &&
      filters.idRangoPrecio.max != null
    ) {
      query.precioPorNoche = {
        $gte: filters.RangoPrecio.min,
        $lte: filters.RangoPrecio.max,
      } //  $gte significa mayor o igual que, $lte significa menor o igual que. Se usan en la base de datos MongoDB para filtrar por rango de precios.
    }
    if (filters.CantHuespedesMax) {
      query.cantHuespedesMax = { $gte: filters.CantHuespedesMax }
    }
    if (Array.isArray(filters.Caracteristicas) && filters.Caracteristicas.length > 0) {
      query.caracteristicas = { $in: filters.Caracteristicas } //  $in se usa para filtrar por un array de valores. Se usa en la base de datos MongoDB para filtrar por caracteristicas.
    }

    const alojamientosFiltrados = await this.model.find(query)
    return alojamientosFiltrados
  }

  // TODO PROBAR
  async addReserva(alojamientoId, reservaId) {
    return await this.model.findByIdAndUpdate(
      alojamientoId,
      { $push: { reservas: reservaId } },
      { new: true, runValidators: true },
    )
  }

  async findById(alojamientoId) {
    return await this.model.findById(alojamientoId)
  }

  async countAll() {
    const totalAlojamientos = await this.model.countDocuments()
    return totalAlojamientos
  }
}
