import { buildTestServer } from './utils/server.js'
import ReservaService from '../../BirBnB/services/reserva-service.js'
import ReservaController from '../../BirBnB/controllers/reserva.controller.js'
import { expect, jest } from '@jest/globals'
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
      },
      alojamiento: {
        id: '1',
        nombre: 'Casa de Playa',
        ubicacion: 'Mar del Plata',
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
      fechaAlta: '10-05-2025',
      huespedReservador: {
        id: '1',
        nombre: 'Juan Perez',
      },
      alojamiento: {
        id: '2',
        nombre: 'Cabaña en el Bosque',
        ubicacion: 'Villa General Belgrano',
      },
      rangoFechas: {
        fechaInicio: '15-07-2025',
        fechaFin: '20-07-2025',
      },
      estado: 'PENDIENTE',
      precioPorNoche: 120,
      cambiosEstadoReserva: [],
    },
  ]),

  save: jest.fn().mockResolvedValue({
    id: '1',
    fechaAlta: '01-10-2023',
    huespedReservador: {
      id: '1',
      nombre: 'Juan Perez',
    },
    alojamiento: {
      id: '1',
      nombre: 'Casa de Playa',
      ubicacion: 'Mar del Plata',
    },
    rangoFechas: {
      fechaInicio: '05-10-2023',
      fechaFin: '10-10-2023',
    },
    estado: 'PENDIENTE',
    precioPorNoche: 150,
    cambiosEstadoReserva: [],
  }),
}

const alojamientoRepository = {
  findById: jest.fn().mockResolvedValue({
    id: '1',
    nombre: 'Casa de Playa',
    ubicacion: 'Mar del Plata',
    anfitrion: {
      id: '1',
      nombre: 'Juan Perez',
    },
    precioPorNoche: 150,
    reservas: [],
  }),
  addReserva: jest.fn(),
}

const usuarioRepository = {
  findById: jest.fn().mockResolvedValue({
    id: '1',
    nombre: 'Juan Perez',
    email: 'juanperez@example.com',
    tipo: 'ANFITRION',
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
      fechaAlta: '01-10-2023',
      huespedReservadorId: '1',
      idAlojamiento: '1',
      rangoFechas: {
        fechaInicio: '05-10-2023',
        fechaFin: '10-10-2023',
      },
    }

    alojamientoRepository.findById = jest.fn().mockResolvedValue({
      id: '1',
      nombre: 'Casa de Playa',
      ubicacion: 'Mar del Plata',
      anfitrion: {
        id: '1',
        nombre: 'Juan Perez',
      },
      precioPorNoche: 150,
      reservas: [],
      estasDisponibleEn: jest.fn().mockReturnValue(true),
    })

    const response = await request(server.app).post('/reserva').send(reserva)
    expect(response.status).toBe(201)
    expect(reservaRepository.save).toHaveBeenCalled()
    expect(reservaRepository.save).toHaveBeenCalledWith(expect.any(Reserva))
  })

  test('Debe retornar status 406 si no se puede crear la reserva', async () => {
    const reserva = {
      fechaAlta: '01-10-2023',
      huespedReservadorId: '1',
      idAlojamiento: '1',
      rangoFechas: {
        fechaInicio: '05-10-2023',
        fechaFin: '10-10-2023',
      },
    }

    alojamientoRepository.findById = jest.fn().mockResolvedValue({
      id: '1',
      nombre: 'Casa de Playa',
      ubicacion: 'Mar del Plata',
      anfitrion: {
        id: '1',
        nombre: 'Juan Perez',
      },
      precioPorNoche: 150,
      reservas: [],
      estasDisponibleEn: jest.fn().mockReturnValue(false),
    })

    const response = await request(server.app).post('/reserva').send(reserva)
    expect(response.status).toBe(406)
    expect(reservaRepository.save).not.toHaveBeenCalled()
  })
})
