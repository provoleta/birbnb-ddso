import { Alojamiento, Direccion, Ciudad, Pais, Moneda, Caracteristica } from '../BirBnB/models/entities/alojamiento.js'
import { Reserva, EstadoReserva } from '../BirBnB/models/entities/reserva.js'

describe('Alojamiento', () => {
  let alojamiento
  let direccion
  let ciudad
  let pais

  beforeEach(() => {
    pais = new Pais('Argentina')
    ciudad = new Ciudad('Buenos Aires', pais)
    direccion = new Direccion('Calle Falsa', '123', ciudad, -34.6037, -58.3816)
    alojamiento = new Alojamiento(
      'Anfitrion1',
      'Alojamiento Test',
      'Descripcion Test',
      100,
      Moneda.DOLAR_USA,
      '14:00',
      '10:00',
      direccion,
      4,
      [Caracteristica.WIFI, Caracteristica.PISCINA],
      [],
      []
    )
  })

  test('debería verificar si el alojamiento está disponible en un rango de fechas', () => {
    const rangoDeFechas = { inicio: new Date('2023-12-01'), fin: new Date('2023-12-10') }
    expect(alojamiento.estasDisponibleEn(rangoDeFechas)).toBe(true)
  })

  test('debería verificar si el precio está dentro de un rango', () => {
    expect(alojamiento.tuPrecioEstaDentroDe(50, 150)).toBe(true)
    expect(alojamiento.tuPrecioEstaDentroDe(150, 200)).toBe(false)
  })

  test('debería verificar si el alojamiento tiene una característica específica', () => {
    expect(alojamiento.tenesCaracteristica(Caracteristica.WIFI)).toBe(true)
    expect(alojamiento.tenesCaracteristica(Caracteristica.ESTACIONAMIENTO)).toBe(false)
  })

  test('debería verificar si una cantidad de huéspedes puede alojarse', () => {
    expect(alojamiento.puedenAlojarse(3)).toBe(true)
    expect(alojamiento.puedenAlojarse(5)).toBe(false)
  })

  test('debería crear una reserva si el alojamiento está disponible', () => {
    const huesped = { nombre: 'Huesped1', email: 'huesped1@example.com' }
    const rangoFechas = { inicio: new Date('2023-12-01'), fin: new Date('2023-12-10') }
    const reserva = alojamiento.crearReserva(huesped, rangoFechas)

    expect(reserva).toBeInstanceOf(Reserva)
    expect(reserva.huespedReservador).toBe(huesped)
    expect(reserva.alojamiento).toBe(alojamiento)
    expect(reserva.rangoFechas).toEqual(rangoFechas)
    expect(reserva.estado).toBe(EstadoReserva.PENDIENTE)
    expect(reserva.precioPorNoche).toBe(alojamiento.precioPorNoche)
  })

  test('debería lanzar un error si se intenta crear una reserva en fechas no disponibles', () => {
    const huesped = 'Huesped1'
    const rangoFechas = { inicio: new Date('2023-12-01'), fin: new Date('2023-12-10') }
    alojamiento.reservas.push({
      seSuperponeCon: () => true
    })

    expect(() => alojamiento.crearReserva(huesped, rangoFechas)).toThrow(
      'El alojamiento no esta disponible en las fechas solicitadas'
    )
  })
})
