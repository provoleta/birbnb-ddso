const RangoFechas = require('./rangoFechas')
const Alojamiento = require('./alojamiento')
const CambioEstadoReserva = require('./cambioEstadoReserva')

class Reserva {
    constructor(fechaAlta, huespedReservador, alojamiento, rangoFechas, estado, precioPorNoche) {
        this.fechaAlta = fechaAlta;           // Date
        this.huespedReservador = huespedReservador;               // Usuario
        this.alojamiento = alojamiento;       // Alojamiento
        this.rangoFechas = rangoFechas;       // RangoFechas
        this.estado = estado;                 // EstadoReserva
        this.precioPorNoche = precioPorNoche; // Double
    }

    actualizarEstado(EstadoReserva) {
        // Imagino que actualizar estado es el setter del atributo estado (CONSULTAR)
        this.estado = EstadoReserva
    }

    estaLibreEn(fechaSolicitada) {
        // Verdadero en caso que la fecha solicitada sea antes de una reserva existente
        let fechaLibreAntes = fechaSolicitada.fechaFin < this.fechaAlta.fechaInicio

        // Verdadero en caso de que la fecha solicitada sea despues de una reserva existente
        let fechaLibreDespues = fechaSolicitada.fechaInicio > this.fechaAlta.fechaFin


        return fechaLibreAntes || fechaLibreDespues
    }

    get anfitrion() {
        return this.alojamiento.anfitrion
    }

}

const EstadoReserva = {
    PENDIENTE: "PENDIENTE",
    CONFIRMADA: "CONFIRMADA",
    CANCELADA: "CANCELADA"
};



module.exports = {
    Reserva,
    EstadoReserva
}
