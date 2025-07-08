import NotFoundException from '../exceptions/not-found-exception.js'
import { Alojamiento } from '../models/entities/alojamiento.js'

export default class AlojamientoService {
  constructor(alojamientoRepository, usuarioRepository, ciudadRepository) {
    this.alojamientoRepository = alojamientoRepository
    this.usuarioRepository = usuarioRepository
    this.ciudadRepository = ciudadRepository
  }

  setearOrden(filters) {
    if (filters.sortBy === 'descendente') {
      filters.sortBy = -1
    } else {
      filters.sortBy = 1
    }
    return filters
  }
  async findAll(filters = {}, page = 1, limit = 5) {
    // Se le pasan los parametros de busqueda y paginacion a la funcion. Si no se pasan, se le asignan los valores por defecto indicados.
    const pageNum = Math.max(Number(page), 1)
    const limitNum = Math.min(Math.max(Number(limit), 1), 100)

    const filtersSeteados = this.setearOrden(filters)
    // TODO : Cambiar implementacion cuando se utilice la base de datos
    const alojamientosFiltrados = await this.alojamientoRepository.filterBy(
      filtersSeteados,
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

  // TODO Cuando se implemente la agregación de alojamientos, guardar en el repositorio de ciudades la ciudad del alojamiento
  async getCities() {
    const ciudades = await this.ciudadRepository.getCities()
    return ciudades.map((ciudad) => ciudad.nombre)
  }

  async create(alojamiento, anfitrion) {
    await this.ciudadRepository.addCity(alojamiento.direccion.ciudad)
    const nuevoAlojamiento = await this.alojamientoRepository.save(
      this.fromDTO(alojamiento, anfitrion),
    )
    return this.toDTO(nuevoAlojamiento)
  }

  async findByUserId(userId) {
    const usuario = await this.usuarioRepository.findById(userId)

    if (!usuario) throw new NotFoundException()

    const alojamientos = await this.alojamientoRepository.filterByUserId(userId)

    if (!alojamientos) throw new NotFoundException()

    const alojamientosDTO = alojamientos.map((alojamiento) => this.toDTO(alojamiento))

    return alojamientosDTO
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

  fromDTO(alojamientoDTO, anfitrion) {
    return new Alojamiento(
      anfitrion,
      alojamientoDTO.nombre,
      alojamientoDTO.descripcion,
      alojamientoDTO.precioPorNoche,
      alojamientoDTO.moneda,
      alojamientoDTO.horarioCheckIn,
      alojamientoDTO.horarioCheckOut,
      alojamientoDTO.direccion,
      alojamientoDTO.cantHuespedesMax,
      alojamientoDTO.caracteristicas || [],
      [],
      alojamientoDTO.fotos.map((foto) => {
        return {
          descripcion: 'hola',
          path: foto,
        }
      }),
    )
  }
}
