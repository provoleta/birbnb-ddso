export default class AlojamientoController {
  constructor(alojamientoService) {
    this.alojamientoService = alojamientoService
  }

  async findAll(req, res) {
    const {
      ubicacion,
      precioGt,
      precioLt,
      huespedesMax,
      caracteristicas,
      page = 1,
      limit = 10,
    } = req.query

    const filters = {
      ubicacion,
      precioGt,
      precioLt,
      huespedesMax,
      caracteristicas,
    }
    const alojamientosPaginados = await this.alojamientoService.findAll(
      filters,
      page,
      limit,
    )
    res.json(alojamientosPaginados)
  }
}
