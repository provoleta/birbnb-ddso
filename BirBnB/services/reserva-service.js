export class reservaService {

    constructor(reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    update(reserva) {
        // El service va a buscar la reserva ya existente (quizas con id?) y verifica que el alojamiento tenga la nueva fecha disponible. Si es asi, la actualiza (eliminando la anterior), sino devuelve null?
    }
}