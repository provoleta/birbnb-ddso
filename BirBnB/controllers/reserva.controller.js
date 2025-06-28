import { validarObjectId } from './utils.js'

export default class ReservaController {
  constructor(reservaService) {
    this.reservaService = reservaService
  }

  async create(req, res) {
    const reserva = req.body
    const huespedReservadorId = req.user.id
    const { fechaAlta, idAlojamiento, rangoFechas } = reserva

    if (!fechaAlta || !huespedReservadorId || !idAlojamiento || !rangoFechas) {
      return res.status(400).json({ error: 'Reserva mal formada' })
    }

    validarObjectId(huespedReservadorId)
    validarObjectId(idAlojamiento)
    reserva.huespedReservadorId = huespedReservadorId
    const nuevo = await this.reservaService.create(reserva)
    res.status(201).json(nuevo)
  }

  async delete(req, res) {
    const reservaId = req.params.id
    const huespedReservadorId = req.user.id
    validarObjectId(reservaId)
    await this.reservaService.delete(reservaId, huespedReservadorId)
    res.status(204).json({
      message: 'Reserva eliminada correctamente',
    })
  }

  async update(req, res) {
    const reserva = req.body
    const huespedReservadorId = req.user.id
    const { id, rangoFechas } = reserva

    if (!id || !rangoFechas) {
      return res.status(400).json({ error: 'Reserva mal formada' })
    }
    validarObjectId(id)
    const nuevo = await this.reservaService.update(reserva, huespedReservadorId)
    res.status(204).json(nuevo)
  }
}
