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
        // ? Propongo algo tipo esto y comparar los dias de la reserva con ese rango (si uno es true, q de false (no se la sintaxis xd))

        return this.reservas.some(
            unaReserva => unaReserva.estaLibreEn(rangoDeFechas)
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

    crearReserva(huesped, rangoFechas){
        let reserva = new Reserva(new Date(), huesped, this, rangoFechas, EstadoReserva.PENDIENTE, this.precioPorNoche)
        return reserva
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

class RangoFechas {
    constructor(fechaInicio, fechaFin) {
        this.fechaInicio = fechaInicio; // Date
        this.fechaFin = fechaFin;       // Date
    }
}

class CambioEstadoReserva {
    constructor(fecha, estado, reserva, motivo, usuario) {
        this.fecha = fecha; // Date
        this.estado = estado; // EstadoReserva
        this.reserva = reserva; // Reserva
        this.motivo = motivo; // String
        this.usuario = usuario; // Usuario
    }
}

class FactoryNotificacion {
    
    mensajeSegunEstado(reserva) {
        switch (reserva.estado) {
            
            case EstadoReserva.PENDIENTE:
                const mensaje = new MensajeSobreUsuario(`{nombre} quiere reservar el alojamiento ${reserva.alojamiento}!`, reserva.huespedReservador)
                return { contenido: mensaje, destinatario: reserva.anfitrion };
            
            case EstadoReserva.CONFIRMADA:
                return { contenido: new MensajePlano(`Su reserva para ${reserva.alojamiento} ha sido confirmada.`), destinatario: reserva.huespedReservador };
            
            case EstadoReserva.CANCELADA:
                return { contenido: new MensajePlano("Su reserva ha sido cancelada."), destinatario: reserva.anfitrion }
            
            default:
                console.error("Estado de reserva no valido ", error);
                throw new Error("Estado de reserva no valido");
        }
    }



    crearSegunReserva(reserva) {
        const mensaje = this.mensajeSegunEstado(reserva)
        return new Notificacion(mensaje.contenido, mensaje.destinatario, new Date())  
    }


}

// Idea de asociar a un Usuario y una Notificacion a traves de un mensaje, para que 

// Idea: Que el mensaje maneje el contenido de su string. La notificacion, si necesita ese contenido, se la pide al mensaje. Si no tiene parametros, devuelve el string plano, sino, contruye ese string con la informacion dada.
class MensajeSobreUsuario {

    constructor(texto, usuario) {
        this.texto = texto;
        this.usuario = usuario;   // Usuario
    }

    get contenido() {
        return this.texto.replace("La reserva a nombre de : {nombre}", this.usuario.nombre)  // Que hace esta linea: reemplaza el {nombre} por el nombre del usuario
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
        // this.fechaLeida = fechaLeida; // Date
    }

    mostrar() {
        console.log(this.mensaje.contenido())
    }

    marcarComoLeida() {
        // Setter de atributo "leida" 
        this.leida = true
        this.fechaLeida = new Date()
    }

    get fechaLeida() {
        return this.#fechaLeida
    }
}

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

// ENUMS. Son similares a los constructores en haskell para crear un "nuevo tipo de dato"
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