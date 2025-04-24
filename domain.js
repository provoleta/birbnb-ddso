class Alojamiento {
    constructor(
        anfitrion,
        nombre,
        descripcion,
        precioPorNoche,
        moneda,
        horarioCheckIn,
        horarioCheckOut,
        direccion,
        cantHuespedesMax,
        caracteristicas = [],
        reservas = [],
        fotos = []
    ) {
        this.anfitrion = anfitrion;               // Usuario
        this.nombre = nombre;                     // String
        this.descripcion = descripcion;           // String
        this.precioPorNoche = precioPorNoche;     // Double
        this.moneda = moneda;                     // ENUM:  Moneda
        this.horarioCheckIn = horarioCheckIn;     // String
        this.horarioCheckOut = horarioCheckOut;   // String
        this.direccion = direccion;               // Direccion
        this.cantHuespedesMax = cantHuespedesMax; // number
        this.caracteristicas = caracteristicas;   // Caracteristica[]
        this.reservas = reservas;                 // Reserva[]
        this.fotos = fotos;                       // Foto[]
    }

    estasDisponibleEn(rangoDeFechas) {
        // Los datos de tipo Date se pueden comparar directamente con operadores <, >, =....
        return this.reservas.every(
            unaReserva => ! unaReserva.seSuperponeCon(rangoDeFechas)

        )
    }

    tuPrecioEstaDentroDe(valorMinimo, valorMaximo) {
        return this.precioPorNoche >= valorMinimo && this.precioPorNoche <= valorMaximo
    }

    tenesCaracteristica(caracteristica) {
        return this.caracteristicas.includes(caracteristica)
    }

    puedenAlojarse(cantHuespedes) {
        return cantHuespedes <= this.cantHuespedesMax
    }

    crearReserva(huesped, rangoFechas) {
        if (this.estasDisponibleEn(rangoFechas)) {
            let reserva = new Reserva(new Date(), huesped, this, rangoFechas, EstadoReserva.PENDIENTE, this.precioPorNoche)
            return reserva
        } else throw new Error("El alojamiento no esta disponible en las fechas solicitadas")
    }
}

class Foto {
    constructor(descripcion, path) {
        this.descripcion = descripcion; // String
        this.path = path;               // String
    }
}

class Direccion {
    constructor(calle, numero, ciudad, lat, long) {
        this.calle = calle;   // String
        this.numero = numero; // String
        this.ciudad = ciudad; // Ciudad
        this.lat = lat;       // Double
        this.long = long;     // String
    }
}

class Ciudad {
    constructor(nombre, pais) {
        this.nombre = nombre; // String
        this.pais = pais;     // Pais
    }
}

class Pais {
    constructor(nombre) {
        this.nombre = nombre; // String
    }
}

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

class RangoFechas {
    constructor(fechaInicio, fechaFin) {
        this.fechaInicio = fechaInicio; // Date
        this.fechaFin = fechaFin;       // Date
    }
}

class CambioEstadoReserva {
    constructor(fecha, estado, reserva, motivo, usuario) {
        this.fecha = fecha;     // Date
        this.estado = estado;   // EstadoReserva
        this.reserva = reserva; // Reserva
        this.motivo = motivo;   // String
        this.usuario = usuario; // Usuario
    }
}

class FactoryNotificacion {

    mensajeSegunEstado(reserva) {
        switch (reserva.estado) {

            case EstadoReserva.PENDIENTE:
                const cantidadDias = reserva.calcularCantidadDias()
                const inicioReserva = reserva.fechaInicio()
                const mensaje = new MensajeSobreUsuario(`{nombre} quiere reservar el alojamiento ${reserva.alojamiento}, 
                    en la fecha: ${inicioReserva}, 
                    por la cantidad de dias de: ${cantidadDias}`,
                    reserva.huespedReservador)

                return {
                    contenido: mensaje,
                    destinatario: reserva.anfitrion
                };

            case EstadoReserva.CONFIRMADA:
                return {
                    contenido: new MensajePlano(`Su reserva para ${reserva.alojamiento} ha sido confirmada.`),
                    destinatario: reserva.huespedReservador
                };

            case EstadoReserva.CANCELADA:
                return {
                    contenido: new MensajePlano(`La reserva para ${reserva.alojamiento} fue cancelada`),
                    destinatario: reserva.anfitrion
                }

            default:
                console.error("Estado de reserva no valido ", error);
                throw new Error("Estado de reserva no valido");
        }
    }

    static crearSegunReserva(reserva) {
        const mensaje = this.mensajeSegunEstado(reserva)
        return new Notificacion(mensaje.contenido, mensaje.destinatario, new Date())
    }


}

// Idea: Que el mensaje maneje el contenido de su string. La notificacion, si necesita ese contenido, se la pide al mensaje. Si no tiene parametros, devuelve el string plano, sino, contruye ese string con la informacion dada.
class MensajeSobreUsuario {

    constructor(texto, usuario) {
        this.texto = texto;
        this.usuario = usuario;   // Usuario
    }

    get contenido() {
        return this.texto.replace("{nombre}", this.usuario.nombre)  
    }
}

class MensajePlano {
    constructor(texto) {
        this.texto = texto;       // String
    }

    get contenido() {
        return this.texto
    }
}

class Notificacion {

    #fechaLeida

    constructor(mensaje, usuario, fechaAlta) {
        this.mensaje = mensaje;       // Mensaje (MensajeCpnUsuario || MensajePlano)
        this.usuario = usuario;       // Usuario
        this.fechaAlta = fechaAlta;   // Date
        this.leida = false;           // Boolean

            
    }

    // Setter de atributo "leida" 
    marcarComoLeida() {
        this.leida = true
        this.fechaLeida = new Date()
    }

    get fechaLeida() {
        return this.#fechaLeida
    }
}

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

const Moneda = {
    DOLAR_USA: "DOLAR_USA",
    PESO_ARG: "PESO_ARG",
    REALES: "REALES"
};

const Caracteristica = {
    WIFI: "WIFI",
    PISCINA: "PISCINA",
    MASCOTAS_PERMITIDAS: "MASCOTAS_PERMITIDAS",
    ESTACIONAMIENTO: "ESTACIONAMIENTO"
};

const EstadoReserva = {
    PENDIENTE: "PENDIENTE",
    CONFIRMADA: "CONFIRMADA",
    CANCELADA: "CANCELADA"
};

module.exports = {
    Alojamiento,
    Foto,
    Direccion,
    Ciudad,
    Pais,
    Reserva,
    RangoFechas,
    CambioEstadoReserva,
    FactoryNotificacion,
    Notificacion,
    Usuario,
    TipoUsuario,
    Moneda,
    Caracteristica,
    EstadoReserva
};