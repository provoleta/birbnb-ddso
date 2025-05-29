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
    }

    const alojamientosPaginados = await this.alojamientoService.findAll(
      filters,
      page,
      limit,
    )
    res.json(alojamientosPaginados)
  }
}
