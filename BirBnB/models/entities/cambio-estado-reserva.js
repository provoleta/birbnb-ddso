const { Reserva, EstadoReserva} = require('./reserva') //? Hace falta?


class CambioEstadoReserva {
    constructor(fecha, estado, reserva, motivo, usuario) {
        this.fecha = fecha;     // Date
        this.estado = estado;   // EstadoReserva
        this.reserva = reserva; // Reserva
        this.motivo = motivo;   // String
        this.usuario = usuario; // Usuario
    }
}

module.exports = CambioEstadoReserva