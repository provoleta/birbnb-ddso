import { createContext, useState, useContext } from 'react'

const SearchContext = createContext()

export function useSearchContext() {
  return useContext(SearchContext)
}

export function SearchProvider({ children }) {
  const [searchParams, setSearchParams] = useState([])

  const search = (params) => {
    // hacer el axios.get(...)
    // return data.alojamientos
  }

  const estaAplicado = (filtro) => {
    return searchParams.some((param) => param.nombre === filtro.nombre)
  }

  const aplicarFiltros = (filtros) => {
    filtros.forEach((filtro) => {
      if (estaAplicado(filtro)) {
        setSearchParams((prev) =>
          prev.map((param) => (param.nombre === filtro.nombre ? filtro : param)),
        )
      } else {
        setSearchParams((prev) => [...prev, filtro])
      }
    })
  }

  return (
    <SearchContext.Provider value={{ searchParams, aplicarFiltros }}>
      {children}
    </SearchContext.Provider>
  )
}
