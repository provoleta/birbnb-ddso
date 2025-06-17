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
      page = 1,
      limit = 10,
      checkIn,
      checkOut,
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
}
