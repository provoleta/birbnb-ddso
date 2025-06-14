import { createContext, useState, useContext } from 'react'

const SearchContext = createContext()

export function useSearchContext() {
  return useContext(SearchContext)
}

export function SearchProvider({ children }) {
  const [searchParams, setSearchParams] = useState(new Map())

  const search = () => {
    // hacer el axios.get(...)
    // return data.alojamientos
  }

  const aplicarFiltros = (filtros) => {
    filtros.forEach((nombre, filtro) => {
      setSearchParams((prev) => prev.set(nombre, filtro))
    })
  }

  return (
    <SearchContext.Provider value={{ aplicarFiltros }}>{children}</SearchContext.Provider>
  )
}
