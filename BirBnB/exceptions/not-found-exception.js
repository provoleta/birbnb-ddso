import AppError from './appError.js'

export default class NotFoundException extends AppError {
  constructor(message = 'Recurso no encontrado') {
    super(message, 404)
  }
}
