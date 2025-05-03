/*
Se espera:
Un endpoint para listar alojamientos disponibles, con la posibilidad de aplicar filtros como:
Ubicación (ciudad, país, coordenadas, etc.).
Rango de precios.
Cantidad de huéspedes permitidos.
Características especiales (Wi-Fi, piscina, mascotas permitidas, etc.).
Implementación de paginación para mejorar la eficiencia de las consultas.

*/

export class AlojamientoService {
  constructor (alojamientoRepository) {
    this.alojamientoRepository = alojamientoRepository
  }

  async findAll ({
    ubicacion,
    rangoPrecio,
    cantHuespedesMax,
    caracteristicas,
    page = 1,
    limit = 10
  } = {}) { // Se le pasan los parametros de busqueda y paginacion a la funcion. Si no se pasan, se le asignan los valores por defecto indicados.
    const pageNum = Math.max(Number(page), 1)
    const limitNum = Math.min(Math.max(Number(limit), 1), 100)
    const query = {}

    if (ubicacion) {
      query.ubicacion = ubicacion
    }
    if (rangoPrecio && rangoPrecio.min != null && rangoPrecio.max != null) {
      query.precioPorNoche = { $gte: rangoPrecio.min, $lte: rangoPrecio.max } //  $gte significa mayor o igual que, $lte significa menor o igual que. Se usan en la base de datos MongoDB para filtrar por rango de precios.
    }
    if (cantHuespedesMax) {
      query.cantHuespedesMax = { $gte: cantHuespedesMax }
    }
    if (Array.isArray(caracteristicas) && caracteristicas.length > 0) {
      query.caracteristicas = { $in: caracteristicas } //  $in se usa para filtrar por un array de valores. Se usa en la base de datos MongoDB para filtrar por caracteristicas.
    }

    // TODO : Cambiar implementacion cuando se utilice la base de datos
    const alojamientosFiltrados = await this.alojamientoRepository.filterBy(query, pageNum, limitNum)
    const total = await this.alojamientoRepository.countAll()
    const total_pages = Math.ceil(total / limitNum)

    const data = alojamientosFiltrados.map(alojamiento => this.toDTO(alojamiento)) // Se mapean los alojamientos filtrados a un formato DTO para ser devueltos al cliente.

    return {
      page: pageNum,
      per_page: limitNum,
      total,
      total_pages,
      data
    }
  }

  toDTO (alojamiento) {
    return {
      id: alojamiento.id,
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
      fotos: alojamiento.fotos
    }
  }
}
