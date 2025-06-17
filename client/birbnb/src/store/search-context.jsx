import axios from 'axios'
import { createContext, useState, useContext } from 'react'

const SearchContext = createContext()

export function useSearchContext() {
  return useContext(SearchContext)
}

export function SearchProvider({ children }) {
  const [searchParams, setSearchParams] = useState(new Map())

  const search = () => {
    let filtrosJson = Object.fromEntries(searchParams)
    if (filtrosJson.checkIn) {
      filtrosJson.checkIn = convertirFecha(filtrosJson.checkIn)
    }
    if (filtrosJson.checkOut) {
      filtrosJson.checkOut = convertirFecha(filtrosJson.checkOut)
    }

    console.log(filtrosJson)
    axios
      .get('/alojamientos', {
        baseURL: 'http://localhost:6969',
        params: filtrosJson,
      })
      .then((response) => {
        // Aquí puedes manejar la respuesta de la búsqueda
        console.log('Resultados de búsqueda:', response.data)
      })
      .catch((error) => {
        // Manejo de errores
        console.error('Error al buscar alojamientos:', error)
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
    <SearchContext.Provider value={{ aplicarFiltros }}>{children}</SearchContext.Provider>
  )
}

const convertirFecha = (fecha) => {
  if (!(fecha instanceof Date)) {
    fecha = new Date(fecha) // Asegúrate de que sea un objeto Date
  }
  const dia = String(fecha.getDate()).padStart(2, '0') // Agregar ceros si es necesario
  const mes = String(fecha.getMonth() + 1).padStart(2, '0') // Los meses empiezan en 0
  const anio = fecha.getFullYear()
  return `${dia}-${mes}-${anio}`
}
