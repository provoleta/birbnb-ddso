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

// 🚨🚨🚨 TODO: POR AHORA ESTE TEST NO SE IMPLEMENTA YA QUE NO SABEMOS COMO SACAR LA ID A TRAVES DE LA SESION 🚨🚨
// describe('GET /reservas/:userId', () => {
//   beforeEach(() => {
//     jest.clearAllMocks()
//   })

//   test('Debe retornar status 200 y las reservas del usuario', async () => {
//     const response = await request(server.app).get('/reservas/000000000000000000000001')

//     expect(response.status).toBe(200)
//     expect(Array.isArray(response.body)).toBe(true)
//     expect(response.body.length).toBe(2)
//     expect(reservaRepository.filterByUserId).toHaveBeenCalledWith(
//       '000000000000000000000001',
//     )
//     expect(response.body[0]).toHaveProperty('huespedReservador')
//     expect(response.body[0]).toHaveProperty('alojamiento')
//     expect(response.body[0]).toHaveProperty('rangoFechas')
//     expect(response.body[0]).toHaveProperty('precioPorNoche')
//   })

//   test('Debe retornar status 404 si no encuentra al usuario', async () => {
//     reservaRepository.filterByUserId = jest.fn().mockResolvedValue(null)
//     const response = await request(server.app).get('/reservas/000000000000000000000009')
//     expect(reservaRepository.filterByUserId).toHaveBeenCalled()
//     expect(response.status).toBe(404)
//   })
// })

describe('POST /reservas', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe retornar status 201 y la reserva creada', async () => {
    const reserva = {
      fechaAlta: '08-05-2025',
      huespedReservadorId: '000000000000000000000001',
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
      estasDisponibleEn: jest.fn().mockReturnValue(true),
    })

    const response = await request(server.app).post('/reservas').send(reserva)
    expect(response.status).toBe(201)
    expect(reservaRepository.save).toHaveBeenCalled()
    expect(reservaRepository.save).toHaveBeenCalledWith(expect.any(Reserva))
  })

  test('Debe retornar status 406 si no se puede crear la reserva', async () => {
    const reserva = {
      fechaAlta: '08-05-2025',
      huespedReservadorId: '000000000000000000000001',
      idAlojamiento: '000000000000000000000001',
      rangoFechas: {
        fechaInicio: 'Sun, 18 May 2025 03:00:00 GMT',
        fechaFin: 'Sun, 1 June 2025 03:00:00 GMT',
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

    const response = await request(server.app).post('/reservas').send(reserva)
    expect(response.status).toBe(406)
    expect(reservaRepository.save).not.toHaveBeenCalled()
  })
})

describe('DELETE /reservas/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe retornar status 200 y la reserva eliminada', async () => {
    const response = await request(server.app).delete(
      '/reservas/000000000000000000000001',
    )
    expect(response.status).toBe(204)
    expect(reservaRepository.delete).toHaveBeenCalledWith('000000000000000000000001')
    expect(alojamientoRepository.removeReserva).toHaveBeenCalled()
    expect(alojamientoRepository.removeReserva).toHaveBeenCalledWith(
      '000000000000000000000001',
      '000000000000000000000001',
    )
  })

  test('Debe retornar status 404 si no encuentra la reserva', async () => {
    reservaRepository.findById = jest.fn().mockResolvedValue(null)
    const response = await request(server.app).delete(
      '/reservas/000000000000000000000009',
    )
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
        fechaInicio: 'Sun, 18 May 2025 03:00:00 GMT',
        fechaFin: 'Sun, 1 June 2025 03:00:00 GMT',
      },
      estado: 'PENDIENTE',
      precioPorNoche: 150,
      cambiosEstadoReserva: [],
    })

    const response = await request(server.app).delete(
      '/reservas/000000000000000000000003',
    )
    expect(response.status).toBe(410)
    expect(reservaRepository.delete).not.toHaveBeenCalled()
    expect(alojamientoRepository.removeReserva).not.toHaveBeenCalled()
  })
})
