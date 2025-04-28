import { Alojamiento, Direccion, Ciudad, Pais, Moneda, Caracteristica } from '../BirBnB/models/entities/alojamiento.js'
import { Reserva, EstadoReserva } from '../BirBnB/models/entities/reserva.js'
import dayjs from 'dayjs'
import RangoFechas from '../BirBnB/models/entities/rango-fechas.js'
import { FactoryNotificacion } from '../BirBnB/models/entities/factory-notificacion.js'
import { Usuario, TipoUsuario } from '../BirBnB/models/entities/usuario.js'

describe('Alojamiento', () => {
  let alojamiento
  let direccion
  let ciudad
  let pais
  let anfitrion

  beforeEach(() => {
    pais = new Pais('Argentina')
    ciudad = new Ciudad('Buenos Aires', pais)
    direccion = new Direccion('Calle Falsa', '123', ciudad, -34.6037, -58.3816)
    anfitrion = new Usuario('Anfitrion1', 'email', TipoUsuario.ANFITRION)
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
      []
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
    const huesped = new Usuario({ nombre: 'Huesped1', email: 'a', tipo: TipoUsuario.HUESPED })


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
    const huesped = new Usuario('Huesped1', 'a', TipoUsuario.HUESPED)
    const fechaReserva = new RangoFechas(dayjs('2023-12-05'), dayjs('2023-12-15'))
    const reservaExistente = new Reserva(
      dayjs(),
      huesped,
      alojamiento,
      fechaReserva,
      EstadoReserva.PENDIENTE,
      alojamiento.precioPorNoche
    )
    alojamiento.reservas.push(reservaExistente)

    const rangoFechasReserva = new RangoFechas(dayjs('2023-12-02'), dayjs('2023-12-20'))

    const notificacion = FactoryNotificacion.crearSegunReserva(reservaExistente) // arma la notificacion con el estado nuevo

    console.log('notificacion', notificacion)
    expect(alojamiento.estasDisponibleEn(rangoFechasReserva)).toBe(false)
    expect(() => alojamiento.crearReserva(huesped, rangoFechasReserva)).toThrow(
      'El alojamiento no esta disponible en las fechas solicitadas'
    )
  })

  // Este test no tiene mucho sentido xq seSuperponeCon no es la funcion original, esta siempre devuelve true. No podes ver si seSuperponeCon funciona bien
  // test('debería lanzar un error si se intenta crear una reserva en fechas no disponibles', () => {
  //   const huesped = 'Huesped1'
  //   const rangoFechas = { inicio: dayjs('2023-12-01'), fin: dayjs('2023-12-10') }
  //   alojamiento.reservas.push({
  //     seSuperponeCon: () => true
  //   })

  //   expect(() => alojamiento.crearReserva(huesped, rangoFechas)).toThrow(
  //     'El alojamiento no esta disponible en las fechas solicitadas'
  //   )
  // })
})
