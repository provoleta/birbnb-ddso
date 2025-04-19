const CambioEstadoReserva = require('./cambioEstadoReserva')
const Alojamiento = require('./alojamiento')
const Reserva = require('./reserva')
const Notificacion = require('./notificacion')

// Esto dice el enunciado:
// Cada vez que se realice una reserva es necesario enviarle una notificación al Anfitrión, donde se le indique quién realizó la reserva, para cuándo, por cuántos días y sobre qué alojamiento.

class Usuario {
    constructor(nombre, email, tipo) {
        this.nombre = nombre;     // String
        this.email = email;       // String
        this.tipo = tipo;         // ENUM: TipoUsuario
        this.notificaciones = []  // Notificacion[]
    }
    
    reservar(alojamiento, rangoFechas) {
        //let reserva = new Reserva(new Date(), this, alojamiento, rangoFechas, EstadoReserva.PENDIENTE, alojamiento.precioPorNoche)
        let reserva = alojamiento.crearReserva(this, rangoFechas)
        let notificacion = FactoryNotificacion.crearSegunReserva(reserva) //? Será así?

        this.agregarNotificacion(notificacion) 
        // TODO : Chequear que no haya mas logica para implementar en siguientes entregas
    }

    agregarNotificacion(unaNotificacion) {
        this.notificaciones.push(unaNotificacion)
    }
}

const TipoUsuario = {
    HUESPED: "HUESPED",
    ANFITRION: "ANFITRION"
};

module.exports = {
    Usuario,
    TipoUsuario
}