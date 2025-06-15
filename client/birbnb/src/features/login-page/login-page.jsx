import './login-page.css'
import { useAuthContext } from '../../store/auth-context'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function LoginPage() {
  const { setToken } = useAuthContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (email && password) {
      await axios
        .post(
          '/usuarios/login',
          {
            email: email,
            password: password,
          },
          { baseURL: 'http://localhost:6969' },
        )
        .then((response) => {
          const { token } = response.data
          setToken(token)
          navigate('/')
        })
        .catch((error) => {
          console.error('Login failed:', error)
          alert('Login failed. Please check your credentials and try again.')
        })
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Iniciar Sesion</h1>
        <form className="login-form">
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

          <button type="submit" onClick={handleLogin} className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
