class Alojamiento {
    /**
     * 
     * @param {Usuario} anfitrion 
     * @param {String} nombre 
     * @param {String} descripcion 
     * @param {Double} precioPorNoche 
     * @param {Moneda} moneda 
     * @param {String} horarioCheckIn 
     * @param {String} horarioCheckOut 
     * @param {Direccion} direccion 
     * @param {Number} cantHuespedesMax 
     * @param {Caracteristica[]} caracteristicas 
     * @param {Reserva[]} reservas 
     * @param {Foto[]} fotos 
     */
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
    /**
     * 
     * @param {String} descripcion 
     * @param {String} path 
     */

    constructor(descripcion, path) {
        this.descripcion = descripcion; // String
        this.path = path;               // String
    }
}

class Direccion {
    /**
     * 
     * @param {String} calle 
     * @param {String} numero 
     * @param {Ciudad} ciudad 
     * @param {Double} lat 
     * @param {String} long 
     */
    constructor(calle, numero, ciudad, lat, long) {
        this.calle = calle;   // String
        this.numero = numero; // String
        this.ciudad = ciudad; // Ciudad
        this.lat = lat;       // Double
        this.long = long;     // String
    }
}

class Ciudad {
    /**
     * 
     * @param {String} nombre 
     * @param {Pais} pais 
     */
    constructor(nombre, pais) {
        this.nombre = nombre; // String
        this.pais = pais;     // Pais
    }
}

class Pais {
    /**
     * 
     * @param {String} nombre 
     */
    constructor(nombre) {
        this.nombre = nombre; // String
    }
}

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

module.exports = {
    Alojamiento,
    Foto,
    Direccion,
    Ciudad,
    Pais,
    Moneda,
    Caracteristica
};