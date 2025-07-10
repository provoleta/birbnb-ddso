import AppError from './app-error.js'

export default class PasswordException extends AppError {
  constructor(message = 'Contraseña incorrecta') {
    super(message, 401)
  }
}
