export default class AlojamientoController {
  constructor(alojamientoService) {
    this.alojamientoService = alojamientoService
  }

  async findAll(req, res) {
    const {
      ciudad,
      pais,
      calle,
      numero,
      lat,
      long,
      precioGt,
      precioLt,
      huespedesMax,
      caracteristicas,
      moneda,
      checkIn,
      checkOut,
      sortBy = 'descendente',
      page = 1,
      limit = 5,
    } = req.query

    const filters = {
      ciudad,
      pais,
      calle,
      numero,
      lat,
      long,
      precioGt,
      precioLt,
      huespedesMax,
      caracteristicas,
      moneda,
      checkIn,
      checkOut,
      sortBy,
    }

    const alojamientosPaginados = await this.alojamientoService.findAll(
      filters,
      page,
      limit,
    )
    res.json(alojamientosPaginados)
  }

  async findById(req, res) {
    const { id } = req.params
    try {
      const alojamiento = await this.alojamientoService.findById(id)
      if (!alojamiento) {
        return res.status(404).json({ error: 'Alojamiento no encontrado' })
      }
      res.json(alojamiento)
    } catch {
      res.status(500).json({ error: 'Error al obtener el alojamiento' })
    }
  }

  async findCiudades(req, res) {
    try {
      const ciudades = await this.alojamientoService.getCities()
      res.json(ciudades)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las ciudades' })
    }
  }

  async create(req, res) {
    const alojamiento = req.body
    const anfitrion = req.user.id

    if (!alojamiento || !anfitrion) {
      return res.status(400).json({ error: 'Alojamiento mal formado' })
    }

    const nuevo = await this.alojamientoService.create(alojamiento, anfitrion)
    res.status(201).json(nuevo)
  }
}
