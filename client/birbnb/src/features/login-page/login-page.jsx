import './login-page.css'
import { useAuthContext } from '../../store/auth-context'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../api/api'

export default function LoginPage() {
  const { handleNewToken } = useAuthContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (email && password) {
      try {
        let token = await Api().login(email, password)
        await handleNewToken(token)
        navigate('/')
      } catch {
        alert(
          'Error durante el inicio de sesión, credenciales incorrectas o usuario no registrado.',
        )
      }
    }
  }

  const handleSwitch = () => {
    navigate('/register')
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Iniciar Sesion</h2>
        <form className="login-form" onSubmit={handleLogin}>
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

          <button
            type="submit"
            //onClick={nuevoRegistro ? handleRegister : handleLogin}
            className="login-button"
          >
            Login
          </button>

          <div className="login-toggle" onClick={handleSwitch}>
            Crear Cuenta
          </div>
        </form>
      </div>
    </div>
  )
}
