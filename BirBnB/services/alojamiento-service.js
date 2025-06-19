import NotFoundException from '../exceptions/not-found-exception.js'

export default class AlojamientoService {
  constructor(alojamientoRepository) {
    this.alojamientoRepository = alojamientoRepository
  }

  async findAll(filters = {}, page = 1, limit = 10) {
    // Se le pasan los parametros de busqueda y paginacion a la funcion. Si no se pasan, se le asignan los valores por defecto indicados.
    const pageNum = Math.max(Number(page), 1)
    const limitNum = Math.min(Math.max(Number(limit), 1), 100)

    // TODO : Cambiar implementacion cuando se utilice la base de datos
    const alojamientosFiltrados = await this.alojamientoRepository.filterBy(
      filters,
      pageNum,
      limitNum,
    )
    if (!alojamientosFiltrados) throw new NotFoundException()
    const total = await this.alojamientoRepository.countAll()
    const total_pages = Math.ceil(total / limitNum)

    const data = alojamientosFiltrados.map((alojamiento) => this.toDTO(alojamiento)) // Se mapean los alojamientos filtrados a un formato DTO para ser devueltos al cliente.

    //console.log('Alojamientos :', data)

    return {
      page: pageNum,
      per_page: limitNum,
      total: total,
      total_pages: total_pages,
      data: data,
    }
  }

  async findById(id) {
    const alojamiento = await this.alojamientoRepository.findById(id)
    if (!alojamiento) throw new NotFoundException()
    return this.toDTO(alojamiento)
  }

  async getCities() {
    const ciudades = await this.alojamientoRepository.getCities()
    return ciudades
  }

  toDTO(alojamiento) {
    return {
      idAlojamiento: alojamiento.id,
      anfitrion: alojamiento.anfitrion,
      nombre: alojamiento.nombre,
      descripcion: alojamiento.descripcion,
      precioPorNoche: alojamiento.precioPorNoche,
      moneda: alojamiento.moneda,
      horarioCheckIn: alojamiento.horarioCheckIn,
      horarioCheckOut: alojamiento.horarioCheckOut,
      direccion: alojamiento.direccion,
      cantHuespedesMax: alojamiento.cantHuespedesMax,
      caracteristicas: alojamiento.caracteristicas,
      reservas: alojamiento.reservas,
      fotos: alojamiento.fotos,
    }
  }
}
