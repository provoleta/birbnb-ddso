import { buildTestServer } from './utils/server.js'
import ReservaService from '../../BirBnB/services/reserva-service.js'
import ReservaController from '../../BirBnB/controllers/reserva.controller.js'
import { expect, jest, test } from '@jest/globals'
import request from 'supertest'
import { Reserva } from '../../BirBnB/models/entities/reserva.js'
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

const reservaRepository = {
  findAll: jest.fn(),
  filterByUserId: jest.fn().mockResolvedValue([
    {
      id: '000000000000000000000001',
      fechaAlta: '16-05-2025',
      huespedReservador: {
        id: '000000000000000000000001',
        nombre: 'Juan Perez',
        email: 'juanperez@example.com',
        tipo: 'HUESPED',
        notificaciones: [],
      },
      alojamiento: {
        id: '000000000000000000000001',
        anfitrion: {
          id: '000000000000000000000002',
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
        fechaInicio: '2025-06-20T03:00:00Z',
        fechaFin: '2025-06-27T03:00:00Z',
      },
      estado: 'PENDIENTE',
      precioPorNoche: 150,
      cambiosEstadoReserva: [],
    },
    {
      id: '000000000000000000000002',
      fechaAlta: '10-05-2021',
      huespedReservador: {
        id: '000000000000000000000001',
        nombre: 'Juan Perez',
        email: 'juanperez@example.com',
        tipo: 'HUESPED',
        notificaciones: [],
      },
      alojamiento: {
        id: '000000000000000000000002',
        anfitrion: {
          id: '000000000000000000000002',
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
        fechaInicio: '2025-06-20T03:00:00Z',
        fechaFin: '2025-06-27T03:00:00Z',
      },
      estado: 'PENDIENTE',
      precioPorNoche: 120,
      cambiosEstadoReserva: [],
    },
  ]),
  findById: jest.fn().mockResolvedValue({
    id: '000000000000000000000001',
    fechaAlta: '16-05-2025',
    huespedReservador: {
      id: '000000000000000000000001',
      nombre: 'Juan Perez',
      email: 'juanperez@example.com',
      tipo: 'HUESPED',
      notificaciones: [],
    },
    alojamiento: {
      id: '000000000000000000000001',
      anfitrion: {
        id: '000000000000000000000002',
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
      fechaInicio: '2025-06-20T03:00:00Z',
      fechaFin: '2025-06-27T03:00:00Z',
    },
    estado: 'PENDIENTE',
    precioPorNoche: 150,
    cambiosEstadoReserva: [],
  }),

  save: jest.fn().mockResolvedValue({
    id: '000000000000000000000001',
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
    id: '000000000000000000000001',
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
    id: '000000000000000000000001',
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
    id: '000000000000000000000001',
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

describe('POST /reservas', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe retornar status 201 y la reserva creada', async () => {
    const reserva = {
      fechaAlta: '08-05-2025',
      idAlojamiento: '000000000000000000000001',
      rangoFechas: {
        fechaInicio: '18-09-2025',
        fechaFin: '01-10-2025',
      },
    }

    alojamientoRepository.findById = jest.fn().mockResolvedValue({
      id: '000000000000000000000001',
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

    const response = await request(server.app)
      .post('/reservas')
      .set('Authorization', `Bearer ${testToken}`)
      .send(reserva)

    expect(response.status).toBe(201)
    expect(reservaRepository.save).toHaveBeenCalled()
    expect(reservaRepository.save).toHaveBeenCalledWith(expect.any(Reserva))
  })

  test('Debe retornar status 401 si no se proporciona token', async () => {
    const reserva = {
      fechaAlta: '08-05-2025',
      idAlojamiento: '000000000000000000000001',
      rangoFechas: {
        fechaInicio: '18-05-2025',
        fechaFin: '01-06-2025',
      },
    }

    const response = await request(server.app).post('/reservas').send(reserva)

    expect(response.status).toBe(401)
    expect(reservaRepository.save).not.toHaveBeenCalled()
  })

  test('Debe retornar status 400 si faltan campos obligatorios', async () => {
    const reserva = {
      // fechaAlta faltante
      idAlojamiento: '000000000000000000000001',
      rangoFechas: {
        fechaInicio: '18-05-2025',
        fechaFin: '01-06-2025',
      },
    }

    const response = await request(server.app)
      .post('/reservas')
      .set('Authorization', `Bearer ${testToken}`)
      .send(reserva)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Reserva mal formada')
  })

  test('Debe retornar status 406 si no se puede crear la reserva por disponibilidad', async () => {
    const reserva = {
      fechaAlta: '08-05-2025',
      idAlojamiento: '000000000000000000000001',
      rangoFechas: {
        fechaInicio: '18-05-2025',
        fechaFin: '01-06-2025',
      },
    }

    alojamientoRepository.findById = jest.fn().mockResolvedValue({
      id: '000000000000000000000001',
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

    const response = await request(server.app)
      .post('/reservas')
      .set('Authorization', `Bearer ${testToken}`)
      .send(reserva)

    expect(response.status).toBe(406)
    expect(reservaRepository.save).not.toHaveBeenCalled()
  })
})

describe('DELETE /reservas/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe retornar status 204 y eliminar la reserva correctamente', async () => {
    const response = await request(server.app)
      .delete('/reservas/000000000000000000000001')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ motivo: 'Cancelación por emergencia' })

    expect(response.status).toBe(204)
    expect(reservaRepository.delete).toHaveBeenCalledWith('000000000000000000000001')
    expect(alojamientoRepository.removeReserva).toHaveBeenCalled()
    expect(alojamientoRepository.removeReserva).toHaveBeenCalledWith(
      '000000000000000000000001',
      '000000000000000000000001',
    )
  })

  test('Debe retornar status 401 si no se proporciona token', async () => {
    const response = await request(server.app)
      .delete('/reservas/000000000000000000000001')
      .send({ motivo: 'Cancelación por emergencia' })

    expect(response.status).toBe(401)
    expect(reservaRepository.delete).not.toHaveBeenCalled()
  })

  test('Debe retornar status 404 si no encuentra la reserva', async () => {
    reservaRepository.findById = jest.fn().mockResolvedValue(null)
    const response = await request(server.app)
      .delete('/reservas/000000000000000000000009')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ motivo: 'Cancelación por emergencia' })

    expect(response.status).toBe(404)
    expect(reservaRepository.delete).not.toHaveBeenCalled()
    expect(alojamientoRepository.removeReserva).not.toHaveBeenCalled()
  })

  test('Debe retornar status 410 si la reserva ya ha comenzado', async () => {
    reservaRepository.findById = jest.fn().mockResolvedValue({
      id: '000000000000000000000003',
      fechaAlta: '10-05-2025',
      huespedReservador: {
        id: '000000000000000000000001',
        nombre: 'Juan Perez',
        email: 'juanperez@example.com',
        tipo: 'HUESPED',
        notificaciones: [],
      },
      alojamiento: {
        id: '000000000000000000000003',
        anfitrion: {
          id: '000000000000000000000002',
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
        fechaInicio: '2025-07-01T03:00:00Z',
        fechaFin: '2025-08-27T03:00:00Z',
      },
      estado: 'PENDIENTE',
      precioPorNoche: 150,
      cambiosEstadoReserva: [],
    })

    const response = await request(server.app)
      .delete('/reservas/000000000000000000000003')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ motivo: 'Cancelación tardía' })

    expect(response.status).toBe(410)
    expect(reservaRepository.delete).not.toHaveBeenCalled()
    expect(alojamientoRepository.removeReserva).not.toHaveBeenCalled()
  })
})

describe('PATCH /reservas/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe retornar status 204 al actualizar el estado de la reserva', async () => {
    const response = await request(server.app)
      .patch('/reservas/000000000000000000000001')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ estado: 'CONFIRMADA' })

    expect(response.status).toBe(204)
  })

  test('Debe retornar status 204 al actualizar las fechas de la reserva', async () => {
    const response = await request(server.app)
      .patch('/reservas/000000000000000000000001')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        rangoFechas: {
          fechaInicio: '20-05-2025',
          fechaFin: '25-05-2025',
        },
      })

    expect(response.status).toBe(204)
  })

  test('Debe retornar status 400 si no se proporcionan campos para actualizar', async () => {
    const response = await request(server.app)
      .patch('/reservas/000000000000000000000001')
      .set('Authorization', `Bearer ${testToken}`)
      .send({})

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Campos faltantes para actualizar reserva')
  })

  test('Debe retornar status 401 si no se proporciona token', async () => {
    const response = await request(server.app)
      .patch('/reservas/000000000000000000000001')
      .send({ estado: 'CONFIRMADA' })

    expect(response.status).toBe(401)
  })
})
