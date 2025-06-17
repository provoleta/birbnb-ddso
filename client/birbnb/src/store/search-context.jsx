import axios from 'axios'
import { createContext, useState, useContext } from 'react'

const SearchContext = createContext()

export function useSearchContext() {
  return useContext(SearchContext)
}

export function SearchProvider({ children }) {
  const [searchParams, setSearchParams] = useState(new Map())
  const [alojamientos, setAlojamientos] = useState([])

  const search = () => {
    let filtrosJson = Object.fromEntries(searchParams)
    if (filtrosJson.checkIn) {
      filtrosJson.checkIn = convertirFecha(filtrosJson.checkIn)
    }
    if (filtrosJson.checkOut) {
      filtrosJson.checkOut = convertirFecha(filtrosJson.checkOut)
    }

    axios
      .get('/alojamientos', {
        baseURL: 'http://localhost:6969',
        params: filtrosJson,
      })
      .then((response) => {
        // Aquí puedes manejar la respuesta de la búsqueda
        setAlojamientos(response.data)
      })
      .catch((error) => {
        // Manejo de errores
        console.error('Error al buscar alojamientos:', error)
        setAlojamientos([])
      })
  }

  const aplicarFiltros = (filtros) => {
    filtros.forEach((filtro, nombre) => {
      const valor = filtro instanceof Date ? convertirFecha(filtro) : filtro // Convertir fechas al formato DD-MM-YYYY
      setSearchParams((prev) => prev.set(nombre, valor))
    })
    search()
  }

  return (
    <SearchContext.Provider value={{ aplicarFiltros, alojamientos }}>
      {children}
    </SearchContext.Provider>
  )
}

const convertirFecha = (fecha) => {
  if (!(fecha instanceof Date)) {
    fecha = new Date(fecha)
  }
  const dia = String(fecha.getDate()).padStart(2, '0')
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const anio = fecha.getFullYear()
  return `${dia}-${mes}-${anio}`
}
