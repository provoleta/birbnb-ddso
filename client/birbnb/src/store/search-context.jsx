import { createContext, useState, useContext } from 'react'
import api from '../api/api'

const SearchContext = createContext()

export function useSearchContext() {
  return useContext(SearchContext)
}

export function SearchProvider({ children }) {
  const [searchParams, setSearchParams] = useState(new Map())
  const [alojamientos, setAlojamientos] = useState([])
  const [switchLimpiar, setSwitchLimpiar] = useState(false)
  const [loading, setLoading] = useState(false)

  const search = () => {
    setLoading(true) // Activa el loader
    let filtrosJson = Object.fromEntries(searchParams)
    if (filtrosJson.checkIn) {
      filtrosJson.checkIn = convertirFecha(filtrosJson.checkIn)
    }
    if (filtrosJson.checkOut) {
      filtrosJson.checkOut = convertirFecha(filtrosJson.checkOut)
    }

    const getAlojamientos = async () => {
      try {
        const alojamientosNew = await api.obtenerAlojamientos(filtrosJson)
        setAlojamientos(alojamientosNew)
      } catch (error) {
        console.error('Error fetching alojamientos:', error)
      }
    }

    getAlojamientos()
  }
  const aplicarFiltros = (filtros) => {
    filtros.forEach((filtro, nombre) => {
      const valor = filtro instanceof Date ? convertirFecha(filtro) : filtro // Convertir fechas al formato DD-MM-YYYY
      setSearchParams((prev) => prev.set(nombre, valor))
    })

    search()
  }

  const limpiarFiltros = () => {
    setSwitchLimpiar(!switchLimpiar)
    setSearchParams(new Map())
  }

  return (
    <SearchContext.Provider
      value={{
        switchLimpiar,
        limpiarFiltros,
        aplicarFiltros,
        alojamientos,
        searchParams,
        loading,
      }}
    >
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
