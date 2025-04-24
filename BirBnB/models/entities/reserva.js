const RangoFechas = require('./rangoFechas')
const Alojamiento = require('./alojamiento')
const CambioEstadoReserva = require('./cambioEstadoReserva')

class Reserva {
    #cambiosEstadoReserva = []  // CambiosEstadoReserva[]
    
    constructor(fechaAlta, huespedReservador, alojamiento, rangoFechas, estado, precioPorNoche) {
        this.fechaAlta = fechaAlta;           // Date
        this.huespedReservador = huespedReservador;               // Usuario
        this.alojamiento = alojamiento;       // Alojamiento
        this.rangoFechas = rangoFechas;       // RangoFechas
        this.estado = estado;                 // EstadoReserva
        this.precioPorNoche = precioPorNoche; // Double

    }

    // 1) Actualizar el estado | 2) Crear una notificacion | 3) Enviar la notificacion al destinatario | 4) Crear una instancia de CambioEstadoReserva | 5) Agregar la instancia a la Reserva
    actualizarEstado(EstadoReserva, MotivoCambio) {
        this.estado = EstadoReserva
        let notificacion = FactoryNotificacion.crearSegunReserva(this); // arma la notificacion con el estado nuevo
        notificacion.usuario.agregarNotificacion(notificacion)
        crearCambioEstado(notificacion.usuario, EstadoReserva, MotivoCambio) // crea el cambio de estado y lo agrega a la reserva

    }

    // Tengo que verificar si fecha solicitada se superpone el rango de fechas de la reserva
    seSuperponeCon(fechaSolicitada) {
        let superponeFin = fechaSolicitada.fechaFin > this.rangoFechas.fechaInicio
        
        let superponeInicio = fechaSolicitada.fechaInicio < this.rangoFechas.fechaFin
        
        return superponeFin && superponeInicio 
    }

    get anfitrion() {
        return this.alojamiento.anfitrion
    }

    calcularCantidadDias() {
        const diferenciaFechas = this.rangoFechas.fechaFin - this.rangoFechas.fechaInicio

        // Convierto la diferencia a días
        const cantidadDias = diferenciaFechas / (1000 * 60 * 60 * 24)

        return cantidadDias
    }

    fechaInicio() {
        return this.rangoFechas.fechaInicio
    }

    fechaFin() {
        return this.rangoFechas.fechaFin
    }

    crearCambioEstado(usuario, estado, motivo) {
        let cambioEstadoReserva = new CambioEstadoReserva(new Date(), estado, this, motivo, usuario) 
        this.#cambiosEstadoReserva.push(cambioEstadoReserva)
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