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

class Foto {
    constructor(descripcion, path) {
        this.descripcion = descripcion; // String
        this.path = path;               // String
    }
}

const Caracteristica = {
    WIFI: "WIFI",
    PISCINA: "PISCINA",
    MASCOTAS_PERMITIDAS: "MASCOTAS_PERMITIDAS",
    ESTACIONAMIENTO: "ESTACIONAMIENTO"
};

const Moneda = {
    DOLAR_USA: "DOLAR_USA",
    PESO_ARG: "PESO_ARG",
    REALES: "REALES"
};

module.exports = {
    Alojamiento,
    Direccion,
    Ciudad,
    Pais,
    Foto,
    Caracteristica,
    Moneda
}