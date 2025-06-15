import axios from 'axios'
import { createContext, useState, useContext } from 'react'

const SearchContext = createContext()

export function useSearchContext() {
  return useContext(SearchContext)
}

export function SearchProvider({ children }) {
  const [searchParams, setSearchParams] = useState(new Map())

  const search = () => {
    axios
      .get('/alojamientos', {
        baseURL: 'http://localhost:6969',
        params: Object.fromEntries(searchParams),
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
      setSearchParams((prev) => prev.set(nombre, filtro))
    })
    search()
  }

  return (
    <SearchContext.Provider value={{ aplicarFiltros }}>{children}</SearchContext.Provider>
  )
}
