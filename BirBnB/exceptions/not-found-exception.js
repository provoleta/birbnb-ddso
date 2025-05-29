import AppError from './app-error.js'

export default class NotFoundException extends AppError {
  constructor(message = 'Recurso no encontrado') {
    super(message, 404)
  }
}
