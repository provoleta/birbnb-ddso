import './App.css'
import Layout from './features/layout/layout.jsx'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import HomePage from './features/home-page/home-page.jsx'
import SearchPage from './features/search-page/search-page.jsx'
import DetailAlojamiento from './features/detail-page/detail-page.jsx'
import { SearchProvider } from './store/search-context.jsx'

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
          </Route>
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> */}
        </Routes>
      </BrowserRouter>
      </SearchProvider>
    </ThemeProvider>
  )
}

export default App
