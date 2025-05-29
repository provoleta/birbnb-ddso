import { validarObjectId } from './utils.js'

export default class ReservaController {
  constructor(reservaService) {
    this.reservaService = reservaService
  }

  async create(req, res) {
    const reserva = req.body
    const { fechaAlta, huespedReservadorId, idAlojamiento, rangoFechas } = reserva

    if (!fechaAlta || !huespedReservadorId || !idAlojamiento || !rangoFechas) {
      return res.status(400).json({ error: 'Reserva mal formada' })
    }

    validarObjectId(huespedReservadorId)
    validarObjectId(idAlojamiento)
    const nuevo = await this.reservaService.create(reserva)
    res.status(201).json(nuevo)
  }

  async delete(req, res) {
    const reservaId = req.params.id
    validarObjectId(reservaId)
    await this.reservaService.delete(reservaId)
    res.status(204).json({
      message: 'Reserva eliminada correctamente',
    })
  }

  async findByUserId(req, res) {
    const userId = req.params.userId
    validarObjectId(userId)
    const reserva = await this.reservaService.findByUserId(userId)
    res.status(200).json(reserva)
  }

  async update(req, res) {
    const reserva = req.body
    const { id, rangoFechas } = reserva

    if (!id || !rangoFechas) {
      return res.status(400).json({ error: 'Reserva mal formada' })
    }
    validarObjectId(id)
    const nuevo = await this.reservaService.update(reserva)
    res.status(204).json(nuevo)
  }
}
