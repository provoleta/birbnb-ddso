export class DisponibilidadException extends Error {
  constructor(alojamiento) {
    super()
    this.message = `El alojamiento ${alojamiento.nombre} no se encuentra disponible para la fecha solicitada.`
  }
}
