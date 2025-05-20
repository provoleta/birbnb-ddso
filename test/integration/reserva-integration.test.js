import { buildTestServer } from './utils/server.js'
import ReservaService from '../../BirBnB/services/reserva-service.js'
import ReservaController from '../../BirBnB/controllers/reserva.controller.js'
import { expect, jest, test } from '@jest/globals'
import request from 'supertest'
import { Reserva } from '../../BirBnB/models/entities/reserva.js'
//import NotFoundException from '../exceptions/not-found-exception.js'

const server = buildTestServer()
server.configureRoutes()

const reservaRepository = {
  findAll: jest.fn(),
  filterByUserId: jest.fn().mockResolvedValue([
    {
      id: '1',
      fechaAlta: '16-05-2025',
      huespedReservador: {
        id: '1',
        nombre: 'Juan Perez',
        email: 'juanperez@example.com',
        tipo: 'HUESPED',
        notificaciones: [],
      },
      alojamiento: {
        id: '1',
        anfitrion: {
          id: '2',
          nombre: 'Maria Lopez',
          email: 'maria@example.com',
          tipo: 'ANFITRION',
          notificaciones: [],
        },
        nombre: 'Casa de Playa',
        descripcion: 'Casa de playa en Mar del Plata',
        precioPorNoche: 150,
        moneda: 'DOLAR_USA',
        horarioCheckin: '14:00',
        horarioCheckOut: '10:00',
        direccion: {
          calle: 'Av. Libertador',
          numero: 123,
          ciudad: 'Mar del Plata',
          provincia: 'Buenos Aires',
          pais: 'Argentina',
          lat: -38.0,
          long: -57.0,
        },
        cantHuespedesMax: 4,
        caracteristicas: [],
        reservas: [],
        fotos: [],
      },
      rangoFechas: {
        fechaInicio: '20-06-2025',
        fechaFin: '27-06-2025',
      },
      estado: 'PENDIENTE',
      precioPorNoche: 150,
      cambiosEstadoReserva: [],
    },
    {
      id: '2',
      fechaAlta: '10-05-2021',
      huespedReservador: {
        id: '1',
        nombre: 'Juan Perez',
        email: 'juanperez@example.com',
        tipo: 'HUESPED',
        notificaciones: [],
      },
      alojamiento: {
        id: '2',
        anfitrion: {
          id: '2',
          nombre: 'Maria Lopez',
          email: 'maria@example.com',
          tipo: 'ANFITRION',
          notificaciones: [],
        },
        nombre: 'Cabaña en el Bosque',
        descripcion: 'Cabaña en el Bosque en Villa General Belgrano',
        precioPorNoche: 200,
        moneda: 'PESO_ARG',
        horarioCheckin: '15:00',
        horarioCheckOut: '09:00',
        direccion: {
          calle: 'Calle Falsa',
          numero: 123,
          ciudad: 'Villa General Belgrano',
          provincia: 'Cordoba',
          pais: 'Argentina',
          lat: -38.0,
          long: -57.0,
        },
        cantHuespedesMax: 6,
        caracteristicas: [],
        reservas: [],
        fotos: [],
      },
      rangoFechas: {
        fechaInicio: 'Fri, 20 Jun 2021 03:00:00 GMT',
        fechaFin: 'Fri, 27 Jun 2021 03:00:00 GMT',
      },
      estado: 'PENDIENTE',
      precioPorNoche: 120,
      cambiosEstadoReserva: [],
    },
  ]),
  findById: jest.fn().mockResolvedValue({
    id: '1',
    fechaAlta: '16-05-2025',
    huespedReservador: {
      id: '1',
      nombre: 'Juan Perez',
      email: 'juanperez@example.com',
      tipo: 'HUESPED',
      notificaciones: [],
    },
    alojamiento: {
      id: '1',
      anfitrion: {
        id: '2',
        nombre: 'Maria Lopez',
        email: 'maria@example.com',
        tipo: 'ANFITRION',
        notificaciones: [],
      },
      nombre: 'Casa de Playa',
      descripcion: 'Casa de playa en Mar del Plata',
      precioPorNoche: 150,
      moneda: 'DOLAR_USA',
      horarioCheckin: '14:00',
      horarioCheckOut: '10:00',
      direccion: {
        calle: 'Av. Libertador',
        numero: 123,
        ciudad: 'Mar del Plata',
        provincia: 'Buenos Aires',
        pais: 'Argentina',
        lat: -38.0,
        long: -57.0,
      },
      cantHuespedesMax: 4,
      caracteristicas: [],
      reservas: [],
      fotos: [],
    },
    rangoFechas: {
      fechaInicio: 'Fri, 20 Jun 2025 03:00:00 GMT',
      fechaFin: 'Fri, 27 Jun 2025 03:00:00 GMT',
    },
    estado: 'PENDIENTE',
    precioPorNoche: 150,
    cambiosEstadoReserva: [],
  }),

  save: jest.fn().mockResolvedValue({
    id: '1',
    nombre: 'Casa de Playa',
    descripcion: 'Casa de playa en Mar del Plata',
    precioPorNoche: 150,
    moneda: 'DOLAR_USA',
    horarioCheckin: '14:00',
    horarioCheckOut: '10:00',
    direccion: {
      calle: 'Av. Libertador',
      numero: 123,
      ciudad: 'Mar del Plata',
      provincia: 'Buenos Aires',
      pais: 'Argentina',
      lat: -38.0,
      long: -57.0,
    },
    cantHuespedesMax: 4,
    caracteristicas: [],
    reservas: [],
    fotos: [],
  }),

  delete: jest.fn().mockResolvedValue({}),
}

const alojamientoRepository = {
  findById: jest.fn().mockResolvedValue({
    id: '1',
    nombre: 'Casa de Playa',
    descripcion: 'Casa de playa en Mar del Plata',
    precioPorNoche: 150,
    moneda: 'DOLAR_USA',
    horarioCheckin: '14:00',
    horarioCheckOut: '10:00',
    direccion: {
      calle: 'Av. Libertador',
      numero: 123,
      ciudad: 'Mar del Plata',
      provincia: 'Buenos Aires',
      pais: 'Argentina',
      lat: -38.0,
      long: -57.0,
    },
    cantHuespedesMax: 4,
    caracteristicas: [],
    reservas: [],
    fotos: [],
  }),
  addReserva: jest.fn(),
  removeReserva: jest.fn().mockResolvedValue({
    id: '1',
    nombre: 'Casa de Playa',
    descripcion: 'Casa de playa en Mar del Plata',
    precioPorNoche: 150,
    moneda: 'DOLAR_USA',
    horarioCheckin: '14:00',
    horarioCheckOut: '10:00',
    direccion: {
      calle: 'Av. Libertador',
      numero: 123,
      ciudad: 'Mar del Plata',
      provincia: 'Buenos Aires',
      pais: 'Argentina',
      lat: -38.0,
      long: -57.0,
    },
    cantHuespedesMax: 4,
    caracteristicas: [],
    reservas: [],
    fotos: [],
  }),
}

const usuarioRepository = {
  findById: jest.fn().mockResolvedValue({
    id: '1',
    nombre: 'Juan Perez',
    email: 'juanperez@example.com',
    tipo: 'HUESPED',
    notificaciones: [],
  }),
  findAndUpdate: jest.fn(),
}

const reservaService = new ReservaService(
  reservaRepository,
  alojamientoRepository,
  usuarioRepository,
)
const reservaController = new ReservaController(reservaService)

server.setController(ReservaController, reservaController)

describe('GET /reserva/:userId', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe retornar status 200 y las reservas del usuario', async () => {
    const response = await request(server.app).get('/reserva/1')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBe(2)
    expect(reservaRepository.filterByUserId).toHaveBeenCalledWith('1')
    expect(response.body[0]).toHaveProperty('huespedReservador')
    expect(response.body[0]).toHaveProperty('alojamiento')
    expect(response.body[0]).toHaveProperty('rangoFechas')
    expect(response.body[0]).toHaveProperty('precioPorNoche')
  })

  test('Debe retornar status 404 si no encuentra al usuario', async () => {
    reservaRepository.filterByUserId = jest.fn().mockResolvedValue(null)
    const response = await request(server.app).get('/reserva/999')
    expect(reservaRepository.filterByUserId).toHaveBeenCalled()
    expect(response.status).toBe(404)
  })
})

describe('POST /reserva', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe retornar status 201 y la reserva creada', async () => {
    const reserva = {
      fechaAlta: '08-05-2025',
      huespedReservadorId: '1',
      idAlojamiento: '1',
      rangoFechas: {
        fechaInicio: 'Sun, 18 May 2025 03:00:00 GMT',
        fechaFin: 'Sun, 1 June 2025 03:00:00 GMT',
      },
    }

    alojamientoRepository.findById = jest.fn().mockResolvedValue({
      id: '1',
      nombre: 'Casa de Playa',
      descripcion: 'Casa de playa en Mar del Plata',
      precioPorNoche: 150,
      moneda: 'DOLAR_USA',
      horarioCheckin: '14:00',
      horarioCheckOut: '10:00',
      direccion: {
        calle: 'Av. Libertador',
        numero: 123,
        ciudad: 'Mar del Plata',
        provincia: 'Buenos Aires',
        pais: 'Argentina',
        lat: -38.0,
        long: -57.0,
      },
      cantHuespedesMax: 4,
      caracteristicas: [],
      reservas: [],
      fotos: [],
      estasDisponibleEn: jest.fn().mockReturnValue(true),
    })

    const response = await request(server.app).post('/reserva').send(reserva)
    expect(response.status).toBe(201)
    expect(reservaRepository.save).toHaveBeenCalled()
    expect(reservaRepository.save).toHaveBeenCalledWith(expect.any(Reserva))
  })

  test('Debe retornar status 406 si no se puede crear la reserva', async () => {
    const reserva = {
      fechaAlta: '08-05-2025',
      huespedReservadorId: '1',
      idAlojamiento: '1',
      rangoFechas: {
        fechaInicio: 'Sun, 18 May 2025 03:00:00 GMT',
        fechaFin: 'Sun, 1 June 2025 03:00:00 GMT',
      },
    }

    alojamientoRepository.findById = jest.fn().mockResolvedValue({
      id: '1',
      nombre: 'Casa de Playa',
      descripcion: 'Casa de playa en Mar del Plata',
      precioPorNoche: 150,
      moneda: 'DOLAR_USA',
      horarioCheckin: '14:00',
      horarioCheckOut: '10:00',
      direccion: {
        calle: 'Av. Libertador',
        numero: 123,
        ciudad: 'Mar del Plata',
        provincia: 'Buenos Aires',
        pais: 'Argentina',
        lat: -38.0,
        long: -57.0,
      },
      cantHuespedesMax: 4,
      caracteristicas: [],
      reservas: [],
      fotos: [],
      estasDisponibleEn: jest.fn().mockReturnValue(false),
    })

    const response = await request(server.app).post('/reserva').send(reserva)
    expect(response.status).toBe(406)
    expect(reservaRepository.save).not.toHaveBeenCalled()
  })
})

describe('DELETE /reserva/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe retornar status 200 y la reserva eliminada', async () => {
    reservaRepository.delete = jest.fn().mockResolvedValue(true)
    const response = await request(server.app).delete('/reserva/1')
    expect(response.status).toBe(204)
    expect(reservaRepository.delete).toHaveBeenCalledWith('1')
    expect(alojamientoRepository.removeReserva).toHaveBeenCalled()
    expect(alojamientoRepository.removeReserva).toHaveBeenCalledWith('1', '1')
  })

  test('Debe retornar status 404 si no encuentra la reserva', async () => {
    reservaRepository.delete = jest.fn().mockResolvedValue(null)
    const response = await request(server.app).delete('/reserva/999')
    expect(response.status).toBe(404)
    expect(reservaRepository.delete).toHaveBeenCalledWith('999')
    expect(alojamientoRepository.removeReserva).not.toHaveBeenCalled()
  })

  test('Debe retornar status 410 si la reserva ya ha comenzado', async () => {
    reservaRepository.findById = jest.fn().mockResolvedValue({
      id: '3',
      fechaAlta: '10-05-2025',
      huespedReservador: {
        id: '1',
        nombre: 'Juan Perez',
        email: 'juanperez@example.com',
        tipo: 'HUESPED',
        notificaciones: [],
      },
      alojamiento: {
        id: '3',
        anfitrion: {
          id: '2',
          nombre: 'Maria Lopez',
          email: 'maria@example.com',
          tipo: 'ANFITRION',
          notificaciones: [],
        },
        nombre: 'Departamento en el Centro',
        descripcion: 'Departamento en el Centro de Buenos Aires',
        precioPorNoche: 300,
        moneda: 'DOLAR_USA',
        horarioCheckin: '12:00',
        horarioCheckOut: '11:00',
        direccion: {
          calle: 'Av. Corrientes',
          numero: 456,
          ciudad: 'Buenos Aires',
          provincia: 'Buenos Aires',
          pais: 'Argentina',
          lat: -34.0,
          long: -58.0,
        },
        cantHuespedesMax: 2,
        caracteristicas: [],
        reservas: [],
        fotos: [],
      },
      rangoFechas: {
        fechaInicio: 'Sun, 18 May 2025 03:00:00 GMT',
        fechaFin: 'Sun, 1 June 2025 03:00:00 GMT',
      },
      estado: 'PENDIENTE',
      precioPorNoche: 150,
      cambiosEstadoReserva: [],
    })

    const response = await request(server.app).delete('/reserva/3')
    expect(response.status).toBe(410)
    expect(reservaRepository.delete).not.toHaveBeenCalled()
    expect(alojamientoRepository.removeReserva).not.toHaveBeenCalled()
  })
})
