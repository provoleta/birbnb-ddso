import AppError from '../exceptions/app-error.js'

export function validarObjectId(ObjectId) {
  if (!/^[0-9a-fA-F]{24}$/.test(ObjectId)) {
    throw new AppError('El ID proporcionado no es un ObjectId válido', 400)
  }
}
