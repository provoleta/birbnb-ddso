import './register-page.css'
import { useAuthContext } from '../../store/auth-context'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/api'

export default function LoginPage() {
  const { handleNewToken } = useAuthContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (email && password && name) {
      let token = await api.register(name, email, password)
      await handleNewToken(token)
      //console.log('Token post handle:', token)
      navigate('/')
    }
  }

  const handleSwitch = () => {
    navigate('/login')
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Crear Cuenta</h2>
        <form className="login-form" onSubmit={handleRegister}>
          <div className="input-container">
            <label htmlFor="name">Nombre completo:</label>
            <input
              className="login-input"
              type="text"
              id="name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              className="login-input"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input
              className="login-input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Registrar
          </button>

          <div className="login-toggle" onClick={handleSwitch}>
            ¿Ya tenes cuenta? Iniciar sesión
          </div>
        </form>
      </div>
    </div>
  )
}
