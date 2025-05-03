import { Reserva, EstadoReserva } from '../../BirBnB/models/entities/reserva.js'
import dayjs from 'dayjs'
import RangoFechas from '../../BirBnB/models/entities/rango-fechas.js'
import { Usuario, TipoUsuario } from '../../BirBnB/models/entities/usuario.js'
import { Alojamiento, Direccion, Ciudad, Pais, Moneda, Caracteristica } from '../../BirBnB/models/entities/alojamiento.js'
describe('Reserva', () => {
    let pais
    let ciudad
    let direccion
    let reserva
    let huesped
    let anfitrion
    let rangoFechas
    let alojamiento

    beforeEach(() => {
        pais = new Pais('Argentina')
        ciudad = new Ciudad('Buenos Aires', pais)
        direccion = new Direccion('Calle Falsa', '123', ciudad, -34.6037, -58.3816)
        huesped = new Usuario('Huesped1', 'huesped@gmail.com', TipoUsuario.HUESPED)
        anfitrion = new Usuario('Anfitrion1', 'anfitrion@gmail.com', TipoUsuario.ANFITRION)
        rangoFechas = new RangoFechas(dayjs('2023-12-01'), dayjs('2023-12-10'))
        alojamiento = new Alojamiento(
            anfitrion,
            'Alojamiento Test',
            'Descripcion Test',
            100,
            Moneda.DOLAR_USA,
            '14:00',
            '10:00',
            direccion,
            4,
            [Caracteristica.WIFI, Caracteristica.PISCINA],
            [],
            []
        )
        reserva = new Reserva(dayjs(), huesped, alojamiento, rangoFechas)

    })

    test('Deberia verificar si la reserva se superpone con otra fecha', () => {
        const fechaSolicitada = new RangoFechas(dayjs('2023-12-05'), dayjs('2023-12-15'))
        const resultado = reserva.seSuperponeCon(fechaSolicitada)
        expect(resultado).toBe(true)
    })

    test('Deberia verificar si la reserva no se superpone con otra fecha', () => {
        const fechaSolicitada = new RangoFechas(dayjs('2023-12-15'), dayjs('2023-12-20'))
        const resultado = reserva.seSuperponeCon(fechaSolicitada)
        expect(resultado).toBe(false)
    })

    test('Deberia calcular la cantidad de dias de la reserva', () => {
        const cantidadDias = reserva.calcularCantidadDias()
        expect(cantidadDias).toBe(9)
    })

    test('Deberia actualizar el estado de la reserva', () => {
        const nuevoEstado = EstadoReserva.CONFIRMADA
        const motivoCambio = 'Reserva aceptada por el anfitrion'
        reserva.actualizarEstado(nuevoEstado, motivoCambio)
        expect(reserva.estado).toBe(nuevoEstado)
        expect(reserva.cambiosEstadoReserva.length).toBe(1)
        expect(reserva.cambiosEstadoReserva[0].estado).toBe(nuevoEstado)
    })

})


