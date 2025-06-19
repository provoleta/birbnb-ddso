import AppError from './app-error.js'

export default class EmailException extends AppError {
  constructor(message = 'El email ya está registrado') {
    super(message, 409)
  }
}
