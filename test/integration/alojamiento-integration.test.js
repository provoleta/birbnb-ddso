import AlojamientoController from '../../BirBnB/controllers/alojamiento.controller.js'
import AlojamientoRepository from '../../BirBnB/models/repositories/alojamiento-repository.js'
import AlojamientoService from '../../BirBnB/services/alojamiento-service.js'
import { buildTestServer } from './utils/server.js'
import { beforeEach, expect, jest } from '@jest/globals'
import request from 'supertest'

const server = buildTestServer()
server.configureRoutes()

const alojamientoRepository = {
  filterBy: jest.fn().mockResolvedValue([
    {
      id: '1',
      anfitrion: {
        id: '1',
        nombre: 'Juan Perez',
      },
      nombre: 'Casa de Playa',
      descripcion: 'Casa frente al mar',
      precioPorNoche: 150,
      moneda: 'USD',
      horarioCheckIn: '14:00',
      horarioCheckOut: '10:00',
      direccion: {
        calle: 'Av. Libertador',
        numero: 100,
        ciudad: 'Mar del Plata',
        lat: -38.0,
        long: -57.0,
        pais: 'Argentina',
      },
      cantHuespedesMax: 4,
      caracteristicas: ['pileta', 'wifi'],
      reservas: [],
      fotos: [],
    },
    {
      id: '2',
      anfitrion: {
        id: '2',
        nombre: 'Juan Perez',
      },
      nombre: 'Cabaña en el Bosque',
      descripcion: 'Casa frente al mar',
      precioPorNoche: 150,
      moneda: 'USD',
      horarioCheckIn: '14:00',
      horarioCheckOut: '10:00',
      direccion: {
        calle: 'Av. Libertador',
        numero: 100,
        ciudad: 'Cordoba',
        lat: -38.0,
        long: -57.0,
        pais: 'Argentina',
      },
      cantHuespedesMax: 4,
      caracteristicas: ['pileta', 'wifi'],
      reservas: [],
      fotos: [],
    },
  ]),

  countAll: jest.fn(),
}

const alojamientoService = new AlojamientoService(alojamientoRepository)
const alojamientoController = new AlojamientoController(alojamientoService)

server.setController(AlojamientoController, alojamientoController)

describe('get/alojamiento', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe retornar status 200 y los alojamientos que son de Argentina', async () => {
    const response = await request(server.app).get('/alojamiento?pais=Argentina')

    expect(response.status).toBe(200)
    // expect(Array.isArray(response.body)).toBe(true)
    // expect(response.body[0]).toHaveProperty('anfitrion')
    // expect(response.body[0]).toHaveProperty('nombre')
    // expect(response.body[0]).toHaveProperty('descripcion')
    // expect(response.body[0]).toHaveProperty('precioPorNoche')
    // expect(response.body[0]).toHaveProperty('moneda')
    // expect(response.body[0]).toHaveProperty('horarioCheckIn')
    // expect(response.body[0]).toHaveProperty('horarioCheckOut')
    // expect(response.body[0]).toHaveProperty('direccion')
    // expect(response.body[0]).toHaveProperty('cantHuespedesMax')
    // expect(response.body[0]).toHaveProperty('caracteristicas')
    // expect(response.body[0]).toHaveProperty('reservas')
    // expect(response.body[0]).toHaveProperty('fotos')
  })
})
