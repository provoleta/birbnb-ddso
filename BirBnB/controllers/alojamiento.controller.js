export default class AlojamientoController {
  constructor(alojamientoService) {
    this.alojamientoService = alojamientoService
  }

  async findAll(req, res) {
    const {
      ubicacion,
      rangoPrecio,
      huespedesPermitidos,
      caracteristicas,
      page = 1,
      limit = 10,
    } = req.query
    const alojamientosPaginados = await this.alojamientoService.findAll({
      ubicacion,
      rangoPrecio,
      huespedesPermitidos,
      caracteristicas,
      page,
      limit,
    })
    res.json(alojamientosPaginados)
  }
}
