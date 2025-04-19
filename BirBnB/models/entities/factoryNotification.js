const { Reserva, EstadoReserva } = require('./reserva');

class FactoryNotificacion {
    mensajeSegunEstado(reserva) {
        switch (reserva.estado) {
            case EstadoReserva.PENDIENTE:
                return { contenido: "Su reserva está pendiente de confirmación.", destinatario: reserva.anfitrion };
            case EstadoReserva.CONFIRMADA:
                return { contenido: "Su reserva ha sido confirmada.", destinatario: reserva.huespedReservador };
            case EstadoReserva.CANCELADA:
                return { contenido: "Su reserva ha sido cancelada.", destinatario: reserva.anfitrion }
            default:
                console.error("Estado de reserva no valido ", error);
                throw new Error("Estado de reserva no valido");
        }
    }

    crearSegunReserva(reserva) {
        const mensaje = this.mensajeSegunEstado(reserva)
        return new Notificacion(mensaje.contenido, mensaje.destinatario, new Date())  //? FechaAlta es la fecha en la que se crea la notificación?
    }
}

module.exports = FactoryNotificacion