import { Reserva, EstadoReserva } from './reserva.js'
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
    this.anfitrion = anfitrion
    this.nombre = nombre
    this.descripcion = descripcion
    this.precioPorNoche = precioPorNoche
    this.moneda = moneda
    this.horarioCheckIn = horarioCheckIn
    this.horarioCheckOut = horarioCheckOut
    this.direccion = direccion
    this.cantHuespedesMax = cantHuespedesMax
    this.caracteristicas = caracteristicas
    this.reservas = reservas
    this.fotos = fotos
  }

  estasDisponibleEn(rangoDeFechas) {
    // Los datos de tipo Date se pueden comparar directamente con operadores <, >, =....
    return this.reservas.every(
      unaReserva => !unaReserva.seSuperponeCon(rangoDeFechas)

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
      const reserva = new Reserva(new Date(), huesped, this, rangoFechas, this.precioPorNoche)
      return reserva
    } else throw new Error('El alojamiento no esta disponible en las fechas solicitadas')
  }
}

class Foto {
  /**
     *
     * @param {String} descripcion
     * @param {String} path
     */

  constructor(descripcion, path) {
    this.descripcion = descripcion
    this.path = path
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
    this.calle = calle
    this.numero = numero
    this.ciudad = ciudad
    this.lat = lat
    this.long = long
  }
}

class Ciudad {
  /**
     *
     * @param {String} nombre
     * @param {Pais} pais
     */
  constructor(nombre, pais) {
    this.nombre = nombre
    this.pais = pais
  }
}

class Pais {
  /**
     *
     * @param {String} nombre
     */
  constructor(nombre) {
    this.nombre = nombre
  }
}

const Moneda = {
  DOLAR_USA: 'DOLAR_USA',
  PESO_ARG: 'PESO_ARG',
  REALES: 'REALES'
}

const Caracteristica = {
  WIFI: 'WIFI',
  PISCINA: 'PISCINA',
  MASCOTAS_PERMITIDAS: 'MASCOTAS_PERMITIDAS',
  ESTACIONAMIENTO: 'ESTACIONAMIENTO'
}

export { Alojamiento, Foto, Direccion, Ciudad, Pais, Moneda, Caracteristica }
