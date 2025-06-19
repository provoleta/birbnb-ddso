import AppError from '../exceptions/app-error.js'
import jwt from 'jsonwebtoken'

export function validarObjectId(ObjectId) {
  if (!/^[0-9a-fA-F]{24}$/.test(ObjectId)) {
    throw new AppError('El ID proporcionado no es un ObjectId válido', 400)
  }
}

export function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_seguro')
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: 'Token inválido' })
  }
}
