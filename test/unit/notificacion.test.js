import Notificacion from '../../BirBnB/models/entities/notificacion.js'
import dayjs from 'dayjs'

describe('Notificacion', () => {
  test('Deberia verificar que la notificacion es marcada como leida', () => {
    const notificacion = new Notificacion(
      'Mensaje de prueba',
      'Usuario de prueba',
      dayjs(),
    )
    notificacion.marcarComoLeida()
    expect(notificacion.leida).toBe(true)
  })
})

describe('Notificacion', () => {
  test('Deberia verificar que se establece algo del tipo dayjs en fechaLeida', () => {
    const notificacion = new Notificacion(
      'Mensaje de prueba',
      'Usuario de prueba',
      dayjs(),
    )
    notificacion.marcarComoLeida()
    expect(dayjs.isDayjs(notificacion.fechaLeida)).toBe(true)
  })
})
