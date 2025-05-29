import { AlojamientoModel } from '../schemas/alojamiento-schema.js'

export default class AlojamientoRepository {
  constructor() {
    this.model = AlojamientoModel
  }

  async filterBy(filters = {}, pageNum, limitNum) {
    const query = {}

    if (filters.ciudad) {
      query['direccion.ciudad'] = { $regex: filters.ciudad, $options: 'i' }
    }
    if (filters.pais) {
      query['direccion.pais'] = { $regex: filters.pais, $options: 'i' }
    }
    if (filters.calle) {
      query['direccion.calle'] = { $regex: filters.calle, $options: 'i' }
    }
    if (filters.numero) {
      query['direccion.numero'] = Number(filters.numero)
    }
    if (filters.lat) {
      query['direccion.lat'] = Number(filters.lat)
    }
    if (filters.long) {
      query['direccion.long'] = Number(filters.long)
    }

    if (filters.precioGt) {
      query.precioPorNoche = { $gte: Number(filters.precioGt) }
    }

    if (filters.precioLt) {
      query.precioPorNoche = { $lte: Number(filters.precioLt) }
    }

    if (filters.huespedesMax) {
      query.cantHuespedesMax = { $lte: filters.huespedesMax }
    }
    if (filters.caracteristicas) {
      const caracteristicasArray = Array.isArray(filters.caracteristicas)
        ? filters.caracteristicas
        : [filters.caracteristicas]

      if (caracteristicasArray.length > 0) {
        const caracteristicasEnMayuscula = caracteristicasArray.map((caracteristica) =>
          caracteristica.toUpperCase(),
        )

        query.caracteristicas = { $all: caracteristicasEnMayuscula }
      } //  $in se usa para filtrar por un array de valores. Se usa en la base de datos MongoDB para filtrar por caracteristicas.
    }

    if (filters.moneda) {
      query.moneda = { $regex: filters.moneda, $options: 'i' }
    }

    const alojamientosFiltrados = await this.model
      .find(query)
      .populate(['anfitrion', 'reservas'])
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)

    return alojamientosFiltrados
  }

  async addReserva(alojamientoId, reservaId) {
    return await this.model.findByIdAndUpdate(
      alojamientoId,
      { $push: { reservas: reservaId } },
      { new: true, runValidators: true },
    )
  }

  async removeReserva(alojamientoId, reservaId) {
    return await this.model.findByIdAndUpdate(
      alojamientoId,
      { $pull: { reservas: reservaId } },
      { new: true, runValidators: true },
    )
  }

  async findById(alojamientoId) {
    return await this.model.findById(alojamientoId).populate(['anfitrion', 'reservas'])
  }

  async countAll() {
    const totalAlojamientos = await this.model.countDocuments()
    return totalAlojamientos
  }
}
