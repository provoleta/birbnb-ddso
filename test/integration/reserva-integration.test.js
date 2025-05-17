import { buildTestServer } from './utils/server.js'
import ReservaService from '../../BirBnB/services/reserva-service.js'
import ReservaController from '../../BirBnB/controllers/reserva.controller.js'
import { expect, jest } from '@jest/globals'
import request from 'supertest'

const server = buildTestServer()
server.configureRoutes()

const reservaRepository = {
  findAll: jest.fn(),
  filterByUserId: jest.fn().mockResolvedValue([
    {
      id: '123',
      huespedReservador: {
        id: '91218',
        nombre: 'Juan Perez',
      },
      alojamiento: {
        id: '456',
        nombre: 'Casa de playa',
        ubicacion: 'Playa del Carmen',
      },
      rangoFechas: {
        fechaInicio: '2023-10-01',
        fechaFin: '2023-10-07',
      },
    },
  ]),
}

const alojamientoRepository = {}

const usuarioRepository = {}

const reservaService = new ReservaService(
  reservaRepository,
  alojamientoRepository,
  usuarioRepository,
)
const reservaController = new ReservaController(reservaService)

server.setController(ReservaController, reservaController)

describe('GET /reserva/:userId', () => {
  test('Debe retornar status 200 y las reservas del usuario', async () => {
    const response = await request(server.app).get('/reserva/91218')

    expect(response.status).toBe(200)
    expect(reservaRepository.filterByUserId).toHaveBeenCalledWith(91218)
  })
})
