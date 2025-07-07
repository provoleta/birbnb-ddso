import './App.css'
import Layout from './features/layout/layout.jsx'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import HomePage from './features/home-page/home-page.jsx'
import SearchPage from './features/search-page/search-page.jsx'
import DetailAlojamiento from './features/detail-page/detail-page.jsx'
import { SearchProvider } from './store/search-context.jsx'
import Perfil from './features/perfil/perfil.jsx'

import LoginPage from './features/login-page/login-page.jsx'
import RegisterPage from './features/register-page/register-page.jsx'
import RegisterAnfitrionPage from './features/register-page/anfitrion/register-anfitrion.jsx'
import UploadPage from './features/upload-page/upload-page.jsx'

const theme = createTheme({
  palette: {
    primary: {
      main: '#A62DFD',
    },
    secondary: {
      main: '#FF4081',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SearchProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/alojamientos" element={<SearchPage />} />
              <Route path="/alojamientos/:id" element={<DetailAlojamiento />} />
              <Route path="upload" element={<UploadPage />} />
              <Route path="/usuarios/perfil/">
                <Route
                  path="reservas"
                  element={<Perfil mostrarEnPantalla={'reservas'} />}
                />
                <Route
                  path="notificaciones"
                  element={<Perfil mostrarEnPantalla={'notificaciones'} />}
                />
                <Route
                  path="alojamientos"
                  element={<Perfil mostrarEnPantalla={'alojamientos'} />}
                />
              </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register">
              <Route index element={<RegisterPage />} />
              <Route path="anfitrion" element={<RegisterAnfitrionPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </ThemeProvider>
  )
}

export default App
