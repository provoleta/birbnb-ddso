import NotificacionController from '../../BirBnB/controllers/notificacion.controller'
import NotificacionService from '../../BirBnB/services/notificacion-service'
import { buildTestServer } from './utils/server'
import request from 'supertest'
import { beforeEach, describe, expect, jest } from '@jest/globals'

const server = buildTestServer()
server.configureRoutes()

const notificacionRepository = {
  findAll: jest.fn(),
  findById: jest.fn().mockResolvedValue([
    {
      id: '000000000000000000000001',
      mensaje:
        'El usuario Matias Martin quiere reservar el alojamiento Casa en la Playa en la fecha 01/06/2025 por la cantidad de 6 dias',
      usuario: {
        userId: '000000000000000000000001',
        nombre: 'Matias Martin',
      },
      fechaAlta: 'Tue, 20 May 2025 16:22:28 GMT',
      leida: false,
    },
    {
      id: '000000000000000000000002',
      mensaje: 'aaa',
      usuario: {
        userId: '000000000000000000000002',
        nombre: 'Pedro Paramo',
      },
      fechaAlta: 'Tue, 20 May 2025 15:22:34 GMT',
      leida: false,
    },
  ]),
  obtenerNotificaciones: jest.fn().mockResolvedValue([
    {
      id: '000000000000000000000001',
      mensaje:
        'El usuario Matias Martin quiere reservar el alojamiento Casa en la Playa en la fecha 01/06/2025 por la cantidad de 6 dias',
      usuario: {
        userId: '000000000000000000000001',
        nombre: 'Matias Martin',
      },
      fechaAlta: 'Tue, 20 May 2025 16:22:28 GMT',
      leida: false,
    },
    {
      id: '000000000000000000000002',
      mensaje: 'aaa',
      usuario: {
        userId: '000000000000000000000002',
        nombre: 'Pedro Paramo',
      },
      fechaAlta: 'Tue, 20 May 2025 15:22:34 GMT',
      leida: false,
    },
  ]),
  update: jest.fn().mockResolvedValue({
    id: '000000000000000000000002',
    mensaje: 'aaa',
    usuario: {
      userId: '000000000000000000000002',
      nombre: 'Pedro Paramo',
    },
    fechaAlta: 'Tue, 20 May 2025 15:22:34 GMT',
    leida: true,
  }),
}

const notificationService = new NotificacionService(notificacionRepository)
const notificaionController = new NotificacionController(notificationService)

server.setController(NotificacionController, notificaionController)

describe('PUT /notificacion', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe retornar 200 OK y marcar la notificacion como leida', async () => {
    const response = await request(server.app).put(
      '/notificacion?id=000000000000000000000001&userId=000000000000000000000002',
    )

    expect(response.status).toBe(200)
    expect(notificacionRepository.findById).toHaveBeenCalled()
    expect(notificacionRepository.update).toHaveBeenCalled()
    console.log('response', response.body)
    expect(response.body.leida).toBe(true)
  })

  test('Debe retornar 404 si no hay notificaciones para el usuario', async () => {
    notificacionRepository.findById = jest.fn().mockResolvedValue(null)
    const response = await request(server.app).put(
      '/notificacion?id=000000000000000000000001&userId=000000000000000000000001',
    )
    expect(notificacionRepository.findById).toHaveBeenCalled()
    expect(response.status).toBe(404)
  })
})
describe('GET /notificacion', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe retornar las notificaciones no leidas por el usuario', async () => {
    notificacionRepository.findAll = jest.fn().mockResolvedValue([
      {
        id: '2',
        mensaje: 'aaa',
        usuario: {
          userId: '000000000000000000000001',
          nombre: 'Matias Martin',
        },
        fechaAlta: 'Tue, 20 May 2025 15:22:34 GMT',
        leida: false,
      },
    ])
    const response = await request(server.app).get(
      '/notificacion?leida=false&userId=000000000000000000000001',
    )
    expect(response.status).toBe(200)
    expect(notificacionRepository.findAll).toHaveBeenCalled
    expect(notificacionRepository.findAll).toHaveBeenCalledWith(
      false,
      '000000000000000000000001',
    )
    expect(response.body[0].leida).toBe(false)
  })

  test('Debe retornar las notificaciones leidas por el usuario', async () => {
    notificacionRepository.findAll = jest.fn().mockResolvedValue([
      {
        id: '2',
        mensaje: 'aaa',
        usuario: {
          userId: '000000000000000000000001',
          nombre: 'Matias Martin',
        },
        fechaAlta: 'Tue, 20 May 2025 15:22:34 GMT',
        leida: true,
      },
    ])
    const response = await request(server.app).get(
      '/notificacion?leida=true&userId=000000000000000000000001',
    )
    expect(response.status).toBe(200)
    expect(notificacionRepository.findAll).toHaveBeenCalled
    expect(notificacionRepository.findAll).toHaveBeenCalledWith(
      true,
      '000000000000000000000001',
    )
    expect(response.body[0].leida).toBe(true)
  })

  test('Debe retornar una coleccion vacia en caso de no tener notificaciones leidas', async () => {
    notificacionRepository.findAll = jest.fn().mockResolvedValue([])
    const response = await request(server.app).get(
      '/notificacion?leida=true&userId=000000000000000000000001',
    )
    expect(response.status).toBe(200)
    expect(notificacionRepository.findAll).toHaveBeenCalled
    expect(notificacionRepository.findAll).toHaveBeenCalledWith(
      true,
      '000000000000000000000001',
    )
    expect(response.body.length).toBe(0)
  })

  test('Debe retornar una coleccion vacia en caso de no tener notificaciones sin leer', async () => {
    notificacionRepository.findAll = jest.fn().mockResolvedValue([])
    const response = await request(server.app).get(
      '/notificacion?leida=false&userId=000000000000000000000001',
    )
    expect(response.status).toBe(200)
    expect(notificacionRepository.findAll).toHaveBeenCalled
    expect(notificacionRepository.findAll).toHaveBeenCalledWith(
      false,
      '000000000000000000000001',
    )
    expect(response.body.length).toBe(0)
  })
})
