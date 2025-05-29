import AppError from './app-error.js'

export default class ExcededTimeException extends AppError {
  constructor(
    message = 'No se puede cancelar la reserva ya que la misma se encuentra en curso.',
  ) {
    super(message, 410)
  }
}
