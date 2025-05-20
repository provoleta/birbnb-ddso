import {
  Alojamiento,
  Direccion,
  Ciudad,
  Pais,
  Moneda,
  Caracteristica,
} from '../../BirBnB/models/entities/alojamiento.js'
import { Reserva, EstadoReserva } from '../../BirBnB/models/entities/reserva.js'
import dayjs from 'dayjs'
import RangoFechas from '../../BirBnB/models/entities/rango-fechas.js'
import { Usuario, TipoUsuario } from '../../BirBnB/models/entities/usuario.js'
import { FactoryNotificacion } from '../../BirBnB/models/entities/factory-notificacion.js'
import Notificacion from '../../BirBnB/models/entities/notificacion.js'

describe('Alojamiento', () => {
  let alojamiento
  let direccion
  let ciudad
  let pais
  const anfitrion = new Usuario(
    'Anfitrion1',
    'anfitrion@gmail.com',
    TipoUsuario.ANFITRION,
  )
  const huesped = new Usuario('Huesped1', 'huesped@gmail.com', TipoUsuario.HUESPED)

  beforeEach(() => {
    pais = new Pais('Argentina')
    ciudad = new Ciudad('Buenos Aires', pais)
    direccion = new Direccion('Calle Falsa', '123', ciudad, -34.6037, -58.3816)
    alojamiento = new Alojamiento(
      anfitrion,
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
      [],
    )
  })

  test('debería verificar si el alojamiento está disponible en un rango de fechas', () => {
    const rangoDeFechas = new RangoFechas(dayjs('2023-12-01'), dayjs('2023-12-10'))
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
    const rangoDeFechas = new RangoFechas(dayjs('2023-12-02'), dayjs('2023-12-05'))
    const reserva = alojamiento.crearReserva(huesped, rangoDeFechas)

    expect(reserva).toBeInstanceOf(Reserva)
    expect(reserva.huespedReservador).toBe(huesped)
    expect(reserva.alojamiento).toBe(alojamiento)
    expect(reserva.rangoFechas).toEqual(rangoDeFechas)
    expect(reserva.estado).toBe(EstadoReserva.PENDIENTE)
    expect(reserva.precioPorNoche).toBe(alojamiento.precioPorNoche)
  })

  test('Deberia lanzar un error si se superpone la fecha de la reserva', () => {
    const fechaReserva = new RangoFechas(dayjs('2023-12-05'), dayjs('2023-12-15'))
    const reservaExistente = new Reserva(
      dayjs(),
      huesped,
      alojamiento,
      fechaReserva,
      EstadoReserva.PENDIENTE,
      alojamiento.precioPorNoche,
    )
    alojamiento.reservas.push(reservaExistente)

    const rangoFechasReserva = new RangoFechas(dayjs('2023-12-02'), dayjs('2023-12-20'))

    expect(alojamiento.estasDisponibleEn(rangoFechasReserva)).toBe(false)
    expect(() => alojamiento.crearReserva(huesped, rangoFechasReserva)).toThrow(
      'El alojamiento no esta disponible en las fechas solicitadas',
    )
  })
  test('Deberia crear una notificacion con todos los parametros correctos', () => {
    const fechaReserva = new RangoFechas(dayjs('2023-12-05'), dayjs('2023-12-15'))
    const reservaExistente = new Reserva(
      dayjs(),
      huesped,
      alojamiento,
      fechaReserva,
      EstadoReserva.PENDIENTE,
      alojamiento.precioPorNoche,
    )

    const notificacion = FactoryNotificacion.crearSegunReserva(reservaExistente)
    expect(notificacion).toBeInstanceOf(Notificacion)
    expect(notificacion.usuario).toBe(anfitrion)
  })
})
