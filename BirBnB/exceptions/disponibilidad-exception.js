import AppError from './app-error.js'

export default class DisponibilidadException extends AppError {
  constructor(
    message = 'El alojamiento no está disponible en el rango de fechas solicitado.',
  ) {
    super(message, 406)
  }
}
