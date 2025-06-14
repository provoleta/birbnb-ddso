import logo from './logo.svg'
import './App.css'
import Navbar from './components/navbar/navbar.jsx'
import { createTheme, ThemeProvider } from '@mui/material'

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
      <div className="App">
        <Navbar />
      </div>
    </ThemeProvider>
  )
}

export default App
