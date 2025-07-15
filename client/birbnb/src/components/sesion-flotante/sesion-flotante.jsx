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
  const [biografia, setBiografia] = useState('')
  const { handleNewToken } = useAuthContext()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false) // Estado para manejar el loader

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
    setLoading(true) // Activa el loader
    try {
      let token
      if (mode === 'login') {
        token = await api.login(email, password)
      } else if (mode === 'register') {
        token = await api.register(name, email, password, imageBase64)
      } else if (mode === 'register-anfitrion') {
        token = await api.registerAnfitrion(name, email, password, biografia, imageBase64)
      }

      if (token) {
        await handleNewToken(token)
        onClose()
      }
    } catch (error) {
      switch (error.response.status) {
        case 401:
          setError('Contraseña incorrecta')
          break
        case 404:
          setError('Email incorrecto')
          break
      }
    } finally {
      setLoading(false) // Desactiva el loader
    }
  }

  const handleClose = () => {
    setError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="auth-modal">
        <div className="modal-header">
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
          <h2>{mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
        </div>

        <div className="modal-body">
          <form className="auth-form" onSubmit={handleSubmit}>
            {(mode === 'register' || mode === 'register-anfitrion') && (
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

            {(mode === 'register' || mode === 'register-anfitrion') && (
              <div className="input-container">
                <label htmlFor="profileImage">Foto de perfil:</label>
                <div className="file-input-wrapper">
                  <input
                    className="auth-input file-input-hidden"
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <div
                    className="file-input-button"
                    role="button"
                    tabIndex="0"
                    onClick={() => document.getElementById('profileImage').click()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        document.getElementById('profileImage').click()
                      }
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 16L7 11L8.4 9.6L11 12.2V4H13V12.2L15.6 9.6L17 11L12 16Z"
                        fill="currentColor"
                      />
                      <path d="M20 18H4V20H20V18Z" fill="currentColor" />
                    </svg>
                    {profileImage ? profileImage.name : 'Seleccionar imagen'}
                  </div>
                </div>
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

            {mode === 'register-anfitrion' && (
              <div className="input-container">
                <label htmlFor="biografia">Biografia:</label>
                <input
                  className="auth-input"
                  type="biografia"
                  id="biografia"
                  value={biografia}
                  onChange={(e) => setBiografia(e.target.value)}
                  required
                />
              </div>
            )}
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? (
                <div className="loader"></div> // Loader mientras se procesa
              ) : mode === 'login' ? (
                'Iniciar Sesión'
              ) : (
                'Registrarse'
              )}
            </button>
          </form>

          {mode !== 'register-anfitrion' && (
            <div
              className="auth-toggle"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            >
              {mode === 'login'
                ? '¿No tienes cuenta? Regístrate'
                : '¿Ya tienes cuenta? Inicia sesión'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SesionFlotante
