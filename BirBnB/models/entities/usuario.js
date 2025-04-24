class Usuario {
    constructor(nombre, email, tipo) {
        this.nombre = nombre;     // String
        this.email = email;       // String
        this.tipo = tipo;         // ENUM: TipoUsuario
        this.notificaciones = []  // Notificacion[]
    }

    reservar(alojamiento, rangoFechas) {
        let reserva = alojamiento.crearReserva(this, rangoFechas)
        let notificacion = FactoryNotificacion.crearSegunReserva(reserva)

        this.agregarNotificacion(notificacion)
    }

    cancelarReserva(reserva, motivo) {
        if (new Date() < reserva.rangoDeFechas.fechaInicio()) { 
            reserva.actualizarEstado(EstadoReserva.CANCELADA, motivo) 
        } 
    }

    agregarNotificacion(unaNotificacion) {
        this.notificaciones.push(unaNotificacion)
    }
}

// ENUMS. Son similares a los constructores en haskell para crear un "nuevo tipo de dato\
// cada static es un valor que puede tomar el tipo de dato.
const TipoUsuario = {
    HUESPED: "HUESPED",
    ANFITRION: "ANFITRION" 
};

module.exports = {
    Usuario,
    TipoUsuario
}