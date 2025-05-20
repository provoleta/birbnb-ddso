import { validarObjectId } from './utils.js'

export default class ReservaController {
  constructor(reservaService) {
    this.reservaService = reservaService
  }

  async create(req, res, next) {
    const reserva = req.body
    const { fechaAlta, huespedReservadorId, idAlojamiento, rangoFechas } = reserva

    if (!fechaAlta || !huespedReservadorId || !idAlojamiento || !rangoFechas) {
      return res.status(400).json({ error: 'Reserva mal formada' })
    }

    try {
      validarObjectId(huespedReservadorId)
      validarObjectId(idAlojamiento)
      const nuevo = await this.reservaService.create(reserva)
      res.status(201).json(nuevo)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    const reservaId = req.params.id
    try {
      validarObjectId(reservaId)
      await this.reservaService.delete(reservaId)
      res.status(204).json({
        message: 'Reserva eliminada correctamente',
      })
    } catch (error) {
      next(error)
    }
  }

  async findByUserId(req, res, next) {
    const userId = req.params.userId

    try {
      validarObjectId(userId)
      const reserva = await this.reservaService.findByUserId(userId)
      res.status(200).json(reserva)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    const reserva = req.body
    const { id, rangoFechas } = reserva

    if (!id || !rangoFechas) {
      return res.status(400).json({ error: 'Reserva mal formada' })
    }
    try {
      validarObjectId(id)
      const nuevo = await this.reservaService.update(reserva)
      res.status(204).json(nuevo)
    } catch (error) {
      next(error)
    }
  }
}
