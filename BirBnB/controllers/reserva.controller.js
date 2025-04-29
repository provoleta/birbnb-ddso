export class ReservaController {

    constructor(reservaService) {
        this.reservaService = reservaService
    }

    async create(req, res) {
        const reserva = req.body
        const { fechaAlta, huespedReservador, alojamiento, rangoFechas } = reserva
        
        if (!fechaAlta || !huespedReservador || !alojamiento || !rangoFechas) {
            return res.status(400).json({ error: "Reserva mal formada" })
        }

        const nuevo = await this.reservaService.create(reserva);
        if (!nuevo) {
            return res.status(409).json({ error: "Reserva ya existente en esa fecha"})
        }

        res.status(201).json(nuevo)
    }
        
    async findByUserId(req, res) {
        const userId = Number(req.params.userId)
        const reserva = await this.reservaService.findByUserId(userId)
        if (!reserva) {
            return res.status(404).json({ error: "Reserva no encontrada" })
        }
        res.json(reserva)
    }

    async update(req, res) {
        const reserva = req.body
        const { fechaAlta, huespedReservador, alojamiento, rangoFechas } = reserva

        if (!fechaAlta || !huespedReservador || !alojamiento || !rangoFechas) {
            return res.status(400).json({ error: "Reserva mal formada" })
        }

        const nuevo = await this.reservaService.update(reserva)
        if (!nuevo) {
            return res.status(409).json({ error: "La reserva no puede modificarse a esa fecha." })
        }
    
        res.status(204).send()
    }
}