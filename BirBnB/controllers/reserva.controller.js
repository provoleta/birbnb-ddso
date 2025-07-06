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
    const motivo = req.body.motivo

    validarObjectId(reservaId)
    await this.reservaService.delete(reservaId, huespedReservadorId, motivo)
    res.status(204).json({
      message: 'Reserva eliminada correctamente',
    })
  }

  async update(req, res) {
    const { estado, rangoFechas } = req.body
    const huespedReservadorId = req.user.id
    const reservaId = req.params.id

    validarObjectId(reservaId)
    validarObjectId(huespedReservadorId)
    let nuevo
    if (!estado && !rangoFechas)
      return res.status(400).json({ error: 'Campos faltantes para actualizar reserva' })

    if (rangoFechas != null) {
      nuevo = await this.reservaService.updateDate(
        reservaId,
        huespedReservadorId,
        rangoFechas,
      )
    } else {
      nuevo = await this.reservaService.updateState(
        reservaId,
        huespedReservadorId,
        estado,
      )
    }

    res.status(204).json(nuevo)
  }
}
