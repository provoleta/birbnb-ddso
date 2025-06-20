import AppError from './app-error.js'

export default class UnauthorizedException extends AppError {
  constructor(message = 'No tenes permiso para acceder a este recurso') {
    super(message, 406)
  }
}
