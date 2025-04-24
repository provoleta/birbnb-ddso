const RangoFechas = require('./rangoFechas')
const Alojamiento = require('./alojamiento')
const cambiosEstadoReserva = require('./cambiosEstadoReserva')
const { Usuario } = require('./usuario')
const FactoryNotificacion = require('./factory-notificacion')
const { EstadoReserva } = require('./reserva').EstadoReserva

class Reserva {
      
    /**
     * 
     * @param {Date} fechaAlta 
     * @param {Usuario} huespedReservador 
     * @param {Alojamiento} alojamiento 
     * @param {Date} rangoFechas 
     * @param {EstadoReserva} estado 
     * @param {Double} precioPorNoche 
     * 
     */
    
    constructor(fechaAlta, huespedReservador, alojamiento, rangoFechas, estado, precioPorNoche) {
        this.fechaAlta = fechaAlta     
        this.huespedReservador = huespedReservador              
        this.alojamiento = alojamiento       
        this.rangoFechas = rangoFechas       
        this.estado = estado     
        this.precioPorNoche = precioPorNoche 
        this.cambiosEstadoReserva = []

    }

    

    // 1) Actualizar el estado | 2) Crear una notificacion | 3) Enviar la notificacion al destinatario | 4) Crear una instancia de cambiosEstadoReserva | 5) Agregar la instancia a la Reserva
    actualizarEstado(EstadoReserva, MotivoCambio) {
        this.estado = EstadoReserva
        let notificacion = FactoryNotificacion.crearSegunReserva(this) // arma la notificacion con el estado nuevo
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

    // TODO: Usar una biblioteca
    calcularCantidadDias() {
        const diferenciaFechas = this.rangoFechas.fechaFin - this.rangoFechas.fechaInicio

        // Convierto la diferencia a días
        const cantidadDias = diferenciaFechas / (1000 * 60 * 60 * 24)

        return cantidadDias
    }

    get fechaInicio() {
        return this.rangoFechas.fechaInicio
    }

    get fechaFin() {
        return this.rangoFechas.fechaFin
    }

    crearCambioEstado(usuario, estado, motivo) {
        let cambiosEstadoReserva = new cambiosEstadoReserva(new Date(), estado, this, motivo, usuario) 
        this.cambiosEstadoReserva.push(cambiosEstadoReserva)
    }

}

const EstadoReserva = {
    PENDIENTE: "PENDIENTE",
    CONFIRMADA: "CONFIRMADA",
    CANCELADA: "CANCELADA"
}

module.exports = {
    Reserva,
    EstadoReserva
}