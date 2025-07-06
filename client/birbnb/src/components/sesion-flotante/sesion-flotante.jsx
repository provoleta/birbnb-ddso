import { useState } from 'react'
import './sesion-flotante.css'
import { useAuthContext } from '../../store/auth-context'
import api from '../../api/api'
import { useEffect } from 'react'

const SesionFlotante = ({ isOpen, onClose, initialMode }) => {
  const [mode, setMode] = useState(initialMode) // 'login' o 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const { handleNewToken } = useAuthContext()

  useEffect(() => {
    if (initialMode) {
      setMode(initialMode)
    }
  }, [initialMode])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setImageBase64(reader.result.split(',')[1])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let token
      if (mode === 'login') {
        token = await api.login(email, password)
      } else {
        token = await api.register(name, email, password, imageBase64)
      }

      if (token) {
        await handleNewToken(token)
        onClose()
        // Llamo a una funcion que se haga directamente despues de que se logueo con exito
        // if (functionAfterLogin != null) {
        //   functionAfterLogin()
        // }
      }
    } catch (error) {
      console.error('Error en autenticación:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="auth-modal">
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <h2>{mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
        </div>

        <div className="modal-body">
          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="input-container">
                <label htmlFor="name">Nombre completo:</label>
                <input
                  className="auth-input"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            {mode === 'register' && (
              <div className="input-container">
                <label htmlFor="profileImage">Foto de perfil:</label>
                <input
                  className="auth-input"
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="input-container">
              <label htmlFor="email">Email:</label>
              <input
                className="auth-input"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <label htmlFor="password">Password:</label>
              <input
                className="auth-input"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button">
              {mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </form>

          <div
            className="auth-toggle"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            {mode === 'login'
              ? '¿No tienes cuenta? Regístrate'
              : '¿Ya tienes cuenta? Inicia sesión'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SesionFlotante
