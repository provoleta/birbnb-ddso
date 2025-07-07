import 'dotenv/config'
import { MongoDBClient } from './BirBnB/config/database.js'
import ReservaRepository from './BirBnB/models/repositories/reserva-repository.js'
import AlojamientoRepository from './BirBnB/models/repositories/alojamiento-repository.js'
import UsuarioRepository from './BirBnB/models/repositories/usuario-repository.js'
import NotificacionRepository from './BirBnB/models/repositories/notificacion-repository.js'
import NotificacionService from './BirBnB/services/notificacion-service.js'
import ReservaService from './BirBnB/services/reserva-service.js'
import { EstadoReserva } from './BirBnB/models/entities/reserva.js'

async function testUpdateState() {
  try {
    // Conectar a la base de datos
    await MongoDBClient.connect()

    // Crear instancias de repositorios y servicios
    const reservaRepository = new ReservaRepository()
    const alojamientoRepository = new AlojamientoRepository()
    const usuarioRepository = new UsuarioRepository()
    const notificacionRepository = new NotificacionRepository()
    const notificacionService = new NotificacionService(notificacionRepository)

    const reservaService = new ReservaService(
      reservaRepository,
      alojamientoRepository,
      usuarioRepository,
      notificacionService,
    )

    // Obtener todas las reservas para encontrar una ID válida
    const reservas = await reservaRepository.model.find().limit(1)

    if (reservas.length === 0) {
      console.log('No hay reservas en la base de datos para probar')
      return
    }

    const reservaTest = reservas[0]
    console.log('Probando con reserva ID:', reservaTest._id.toString())
    console.log('Estado actual:', reservaTest.estado)
    console.log('Huésped ID:', reservaTest.huespedReservador.toString())

    // Intentar actualizar el estado
    const resultado = await reservaService.updateState(
      reservaTest._id.toString(),
      reservaTest.huespedReservador.toString(),
      EstadoReserva.CONFIRMADA,
    )

    console.log('✅ ¡Éxito! Estado actualizado:')
    console.log('Nuevo estado:', resultado.estado)
  } catch (error) {
    console.error('❌ Error al actualizar estado:', error.message)
    console.error('Stack trace:', error.stack)
  } finally {
    process.exit(0)
  }
}

testUpdateState()
