import UsuarioController from '../../BirBnB/controllers/usuario.controller.js'
import NotificacionService from '../../BirBnB/services/notificacion-service.js'
import ReservaService from '../../BirBnB/services/reserva-service.js'
import UsuarioService from '../../BirBnB/services/usuario-service.js'
import AlojamientoService from '../../BirBnB/services/alojamiento-service.js'
import { buildTestServer } from './utils/server.js'
import request from 'supertest'
import { beforeEach, describe, expect, jest } from '@jest/globals'
import jwt from 'jsonwebtoken'

const server = buildTestServer()
server.configureRoutes()

// Token de prueba para autenticación
const testUserId = '000000000000000000000001'
const testToken = jwt.sign(
  { id: testUserId, email: 'test@example.com' },
  process.env.JWT_SECRET || 'tu_secreto_seguro',
  { expiresIn: '1h' },
)

const notificacionRepository = {
  findAll: jest.fn().mockResolvedValue([
    {
      id: '000000000000000000000001',
      mensaje:
        'El usuario Matias Martin quiere reservar el alojamiento Casa en la Playa en la fecha 01/06/2025 por la cantidad de 6 dias',
      usuario: {
        id: '000000000000000000000001',
        nombre: 'Matias Martin',
      },
      fechaAlta: '2025-05-20T16:22:28Z',
      leida: false,
    },
  ]),
  findById: jest.fn().mockResolvedValue({
    id: '000000000000000000000001',
    mensaje:
      'El usuario Matias Martin quiere reservar el alojamiento Casa en la Playa en la fecha 01/06/2025 por la cantidad de 6 dias',
    usuario: {
      id: '000000000000000000000001',
      nombre: 'Matias Martin',
    },
    fechaAlta: '2025-05-20T16:22:28Z',
    leida: false,
  }),
  update: jest.fn().mockResolvedValue({
    id: '000000000000000000000001',
    mensaje:
      'El usuario Matias Martin quiere reservar el alojamiento Casa en la Playa en la fecha 01/06/2025 por la cantidad de 6 dias',
    usuario: {
      id: '000000000000000000000001',
      nombre: 'Matias Martin',
    },
    fechaAlta: '2025-05-20T16:22:28Z',
    leida: true,
  }),
}

// Mock repositories vacíos para los otros servicios
const reservaRepository = { findByUserId: jest.fn() }
const usuarioRepository = { findById: jest.fn() }
const alojamientoRepository = { findByUserId: jest.fn() }

const notificacionService = new NotificacionService(notificacionRepository)
const reservaService = new ReservaService(
  reservaRepository,
  alojamientoRepository,
  usuarioRepository,
)
const usuarioService = new UsuarioService(usuarioRepository)
const alojamientoService = new AlojamientoService(alojamientoRepository)

const usuarioController = new UsuarioController(
  notificacionService,
  reservaService,
  usuarioService,
  alojamientoService,
)

server.setController(UsuarioController, usuarioController)

describe('PUT /usuarios/notificaciones/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe retornar 200 OK y marcar la notificacion como leida', async () => {
    const response = await request(server.app)
      .put('/usuarios/notificaciones/000000000000000000000001')
      .set('Authorization', `Bearer ${testToken}`)

    expect(response.status).toBe(200)
    expect(notificacionRepository.update).toHaveBeenCalled()
    expect(response.body.leida).toBe(true)
  })

  test('Debe retornar 401 si no se proporciona token', async () => {
    const response = await request(server.app).put(
      '/usuarios/notificaciones/000000000000000000000001',
    )

    expect(response.status).toBe(401)
    expect(notificacionRepository.update).not.toHaveBeenCalled()
  })

  test('Debe retornar 404 si no encuentra la notificacion', async () => {
    notificacionRepository.findById = jest.fn().mockResolvedValue(null)
    const response = await request(server.app)
      .put('/usuarios/notificaciones/000000000000000000000009')
      .set('Authorization', `Bearer ${testToken}`)

    expect(response.status).toBe(404)
    expect(notificacionRepository.update).not.toHaveBeenCalled()
  })
})
describe('GET /usuarios/notificaciones', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe retornar las notificaciones no leidas por el usuario', async () => {
    notificacionRepository.findAll = jest.fn().mockResolvedValue([
      {
        id: '000000000000000000000001',
        mensaje:
          'El usuario Matias Martin quiere reservar el alojamiento Casa en la Playa en la fecha 01/06/2025 por la cantidad de 6 dias',
        usuario: {
          id: '000000000000000000000001',
          nombre: 'Matias Martin',
        },
        fechaAlta: '2025-05-20T15:22:34Z',
        leida: false,
      },
    ])

    const response = await request(server.app)
      .get('/usuarios/notificaciones?leida=false')
      .set('Authorization', `Bearer ${testToken}`)

    expect(response.status).toBe(200)
    expect(notificacionRepository.findAll).toHaveBeenCalled()
    expect(notificacionRepository.findAll).toHaveBeenCalledWith(false, testUserId)
    expect(response.body[0].leida).toBe(false)
  })

  test('Debe retornar las notificaciones leidas por el usuario', async () => {
    notificacionRepository.findAll = jest.fn().mockResolvedValue([
      {
        id: '000000000000000000000002',
        mensaje: 'Su reserva ha sido confirmada',
        usuario: {
          id: '000000000000000000000001',
          nombre: 'Matias Martin',
        },
        fechaAlta: '2025-05-20T15:22:34Z',
        leida: true,
      },
    ])

    const response = await request(server.app)
      .get('/usuarios/notificaciones?leida=true')
      .set('Authorization', `Bearer ${testToken}`)

    expect(response.status).toBe(200)
    expect(notificacionRepository.findAll).toHaveBeenCalled()
    expect(notificacionRepository.findAll).toHaveBeenCalledWith(true, testUserId)
    expect(response.body[0].leida).toBe(true)
  })

  test('Debe retornar 401 si no se proporciona token', async () => {
    const response = await request(server.app).get('/usuarios/notificaciones?leida=false')

    expect(response.status).toBe(401)
    expect(notificacionRepository.findAll).not.toHaveBeenCalled()
  })

  test('Debe retornar una coleccion vacia en caso de no tener notificaciones leidas', async () => {
    notificacionRepository.findAll = jest.fn().mockResolvedValue([])
    const response = await request(server.app)
      .get('/usuarios/notificaciones?leida=true')
      .set('Authorization', `Bearer ${testToken}`)

    expect(response.status).toBe(200)
    expect(notificacionRepository.findAll).toHaveBeenCalled()
    expect(notificacionRepository.findAll).toHaveBeenCalledWith(true, testUserId)
    expect(response.body.length).toBe(0)
  })

  test('Debe retornar una coleccion vacia en caso de no tener notificaciones sin leer', async () => {
    notificacionRepository.findAll = jest.fn().mockResolvedValue([])
    const response = await request(server.app)
      .get('/usuarios/notificaciones?leida=false')
      .set('Authorization', `Bearer ${testToken}`)

    expect(response.status).toBe(200)
    expect(notificacionRepository.findAll).toHaveBeenCalled()
    expect(notificacionRepository.findAll).toHaveBeenCalledWith(false, testUserId)
    expect(response.body.length).toBe(0)
  })
})
