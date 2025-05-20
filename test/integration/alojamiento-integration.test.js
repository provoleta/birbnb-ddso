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
      id: '000000000000000000000001',
      anfitrion: {
        id: '000000000000000000000001',
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
    {
      id: '000000000000000000000002',
      anfitrion: {
        id: '000000000000000000000002',
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

  countAll: jest.fn().mockResolvedValue(2),
}

const alojamientoService = new AlojamientoService(alojamientoRepository)
const alojamientoController = new AlojamientoController(alojamientoService)

server.setController(AlojamientoController, alojamientoController)

describe('get/alojamiento', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    alojamientoRepository.filterBy.mockResolvedValue([
      {
        id: '000000000000000000000001',
        anfitrion: {
          id: '000000000000000000000001',
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
      {
        id: '000000000000000000000002',
        anfitrion: {
          id: '000000000000000000000002',
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
    ])
  })

  test('Debe retornar status 200 y los alojamientos que son de Argentina', async () => {
    const response = await request(server.app).get('/alojamiento?pais=Argentina')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.data)).toBe(true)
    expect(response.body.data[0]).toHaveProperty('anfitrion')
    expect(response.body.data[0]).toHaveProperty('nombre')
    expect(response.body.data[0]).toHaveProperty('descripcion')
    expect(response.body.data[0]).toHaveProperty('precioPorNoche')
    expect(response.body.data[0]).toHaveProperty('moneda')
    expect(response.body.data[0]).toHaveProperty('horarioCheckIn')
    expect(response.body.data[0]).toHaveProperty('horarioCheckOut')
    expect(response.body.data[0]).toHaveProperty('direccion')
    expect(response.body.data[0]).toHaveProperty('cantHuespedesMax')
    expect(response.body.data[0]).toHaveProperty('caracteristicas')
    expect(response.body.data[0]).toHaveProperty('reservas')
    expect(response.body.data[0]).toHaveProperty('fotos')
    expect(response.body.data[0].direccion.pais).toBe('Argentina')
    expect(alojamientoRepository.filterBy).toHaveBeenCalled()
    expect(alojamientoRepository.countAll).toHaveBeenCalled()
  })

  test('Debe retornar status 404 si no encuentra alojamientos', async () => {
    alojamientoRepository.filterBy = jest.fn().mockResolvedValue(null)
    const response = await request(server.app).get('/alojamiento?pais=PaisInexistente')
    expect(response.status).toBe(404)
  })

  test('Debe retornar status 200 y los alojamientos que son de la ciudad de Cordoba', async () => {
    const response = await request(server.app).get('/alojamiento?ciudad=Cordoba')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.data)).toBe(true)
    expect(response.body.data[0]).toHaveProperty('anfitrion')
    expect(response.body.data[0]).toHaveProperty('nombre')
    expect(response.body.data[0]).toHaveProperty('descripcion')
    expect(response.body.data[0]).toHaveProperty('precioPorNoche')
    expect(response.body.data[0]).toHaveProperty('moneda')
    expect(response.body.data[0]).toHaveProperty('horarioCheckIn')
    expect(response.body.data[0]).toHaveProperty('horarioCheckOut')
    expect(response.body.data[0]).toHaveProperty('direccion')
    expect(response.body.data[0]).toHaveProperty('cantHuespedesMax')
    expect(response.body.data[0]).toHaveProperty('caracteristicas')
    expect(response.body.data[0]).toHaveProperty('reservas')
    expect(response.body.data[0]).toHaveProperty('fotos')
    expect(response.body.data[0].direccion.ciudad).toBe('Cordoba')
    expect(alojamientoRepository.filterBy).toHaveBeenCalled()
    expect(alojamientoRepository.countAll).toHaveBeenCalled()
  })

  test('Debe retornar status 404 si no encuentra alojamientos de ciudad Cordoba', async () => {
    alojamientoRepository.filterBy = jest.fn().mockResolvedValue(null)
    const response = await request(server.app).get(
      '/alojamiento?ciudad=CiudadInexistente',
    )
    expect(response.status).toBe(404)
  })

  test('Debe retornar status 200 y los alojamientos que son de la calle av libertador', async () => {
    const response = await request(server.app).get('/alojamiento?calle=av libertador')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.data)).toBe(true)
    expect(response.body.data[0]).toHaveProperty('anfitrion')
    expect(response.body.data[0]).toHaveProperty('nombre')
    expect(response.body.data[0]).toHaveProperty('descripcion')
    expect(response.body.data[0]).toHaveProperty('precioPorNoche')
    expect(response.body.data[0]).toHaveProperty('moneda')
    expect(response.body.data[0]).toHaveProperty('horarioCheckIn')
    expect(response.body.data[0]).toHaveProperty('horarioCheckOut')
    expect(response.body.data[0]).toHaveProperty('direccion')
    expect(response.body.data[0]).toHaveProperty('cantHuespedesMax')
    expect(response.body.data[0]).toHaveProperty('caracteristicas')
    expect(response.body.data[0]).toHaveProperty('reservas')
    expect(response.body.data[0]).toHaveProperty('fotos')
    expect(response.body.data[0].direccion.calle).toMatch('Av. Libertador')
    expect(alojamientoRepository.filterBy).toHaveBeenCalled()
    expect(alojamientoRepository.countAll).toHaveBeenCalled()
  })

  test('Debe retornar status 404 si no encuentra calle', async () => {
    alojamientoRepository.filterBy = jest.fn().mockResolvedValue(null)
    const response = await request(server.app).get('/alojamiento?calle=CalleInexistente')
    expect(response.status).toBe(404)
  })

  test('Debe retornar status 200 y los alojamientos que son altura 100', async () => {
    const response = await request(server.app).get('/alojamiento?numero=100')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.data)).toBe(true)
    expect(response.body.data[0]).toHaveProperty('anfitrion')
    expect(response.body.data[0]).toHaveProperty('nombre')
    expect(response.body.data[0]).toHaveProperty('descripcion')
    expect(response.body.data[0]).toHaveProperty('precioPorNoche')
    expect(response.body.data[0]).toHaveProperty('moneda')
    expect(response.body.data[0]).toHaveProperty('horarioCheckIn')
    expect(response.body.data[0]).toHaveProperty('horarioCheckOut')
    expect(response.body.data[0]).toHaveProperty('direccion')
    expect(response.body.data[0]).toHaveProperty('cantHuespedesMax')
    expect(response.body.data[0]).toHaveProperty('caracteristicas')
    expect(response.body.data[0]).toHaveProperty('reservas')
    expect(response.body.data[0]).toHaveProperty('fotos')
    expect(response.body.data[0].direccion.numero).toBe(100)
    expect(alojamientoRepository.filterBy).toHaveBeenCalled()
    expect(alojamientoRepository.countAll).toHaveBeenCalled()
  })

  test('Debe retornar status 404 si no encuentra alojamientos de altura 100', async () => {
    alojamientoRepository.filterBy = jest.fn().mockResolvedValue(null)
    const response = await request(server.app).get('/alojamiento?numero=99999')
    expect(response.status).toBe(404)
  })

  test('Debe retornar status 200 y los alojamientos que son de latitud -38 y long -57', async () => {
    const response = await request(server.app).get('/alojamiento?lat=-38&long=-57')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.data)).toBe(true)
    expect(response.body.data[0]).toHaveProperty('anfitrion')
    expect(response.body.data[0]).toHaveProperty('nombre')
    expect(response.body.data[0]).toHaveProperty('descripcion')
    expect(response.body.data[0]).toHaveProperty('precioPorNoche')
    expect(response.body.data[0]).toHaveProperty('moneda')
    expect(response.body.data[0]).toHaveProperty('horarioCheckIn')
    expect(response.body.data[0]).toHaveProperty('horarioCheckOut')
    expect(response.body.data[0]).toHaveProperty('direccion')
    expect(response.body.data[0]).toHaveProperty('cantHuespedesMax')
    expect(response.body.data[0]).toHaveProperty('caracteristicas')
    expect(response.body.data[0]).toHaveProperty('reservas')
    expect(response.body.data[0]).toHaveProperty('fotos')
    expect(response.body.data[0].direccion.lat).toBe(-38)
    expect(response.body.data[0].direccion.long).toBe(-57)
    expect(alojamientoRepository.filterBy).toHaveBeenCalled()
    expect(alojamientoRepository.countAll).toHaveBeenCalled()
  })

  test('Debe retornar status 404 si no encuentra alojamientos de la latitud indicada', async () => {
    alojamientoRepository.filterBy = jest.fn().mockResolvedValue(null)
    const response = await request(server.app).get('/alojamiento?lat=-99999&long=-99999')
    expect(response.status).toBe(404)
  })

  test('Debe retornar status 200 y los alojamientos con precio menor o igual a 200', async () => {
    const response = await request(server.app).get('/alojamiento?precioLt=150')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.data)).toBe(true)
    expect(response.body.data[0]).toHaveProperty('precioPorNoche')
    expect(response.body.data[0].precioPorNoche).toBeLessThanOrEqual(200)
    expect(alojamientoRepository.filterBy).toHaveBeenCalled()
    expect(alojamientoRepository.countAll).toHaveBeenCalled()
  })

  test('Debe retornar status 404 si no encuentra alojamientos con precio menor a 10', async () => {
    alojamientoRepository.filterBy = jest.fn().mockResolvedValue(null)
    const response = await request(server.app).get('/alojamiento?precioLt=10')
    expect(response.status).toBe(404)
  })

  test('Debe retornar status 200 y los alojamientos con precio mayor o igual a 100', async () => {
    const response = await request(server.app).get('/alojamiento?precioGt=100')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.data)).toBe(true)
    expect(response.body.data[0]).toHaveProperty('precioPorNoche')
    expect(response.body.data[0].precioPorNoche).toBeGreaterThanOrEqual(100)
    expect(alojamientoRepository.filterBy).toHaveBeenCalled()
    expect(alojamientoRepository.countAll).toHaveBeenCalled()
  })

  test('Debe retornar status 404 si no encuentra alojamientos con precio mayor o igual a 99999', async () => {
    alojamientoRepository.filterBy = jest.fn().mockResolvedValue(null)
    const response = await request(server.app).get('/alojamiento?precioGt=99999')
    expect(response.status).toBe(404)
  })

  test('Debe retornar status 200 y los alojamientos con capacidad para al menos 4 huéspedes', async () => {
    const response = await request(server.app).get('/alojamiento?huespedesMax=4')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.data)).toBe(true)
    expect(response.body.data[0]).toHaveProperty('cantHuespedesMax')
    expect(response.body.data[0].cantHuespedesMax).toBeGreaterThanOrEqual(4)
    expect(alojamientoRepository.filterBy).toHaveBeenCalled()
    expect(alojamientoRepository.countAll).toHaveBeenCalled()
  })

  test('Debe retornar status 404 si no encuentra alojamientos con capacidad para al menos 999 huéspedes', async () => {
    alojamientoRepository.filterBy = jest.fn().mockResolvedValue(null)
    const response = await request(server.app).get('/alojamiento?huespedesMax=999')
    expect(response.status).toBe(404)
  })
})
