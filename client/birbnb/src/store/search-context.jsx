import axios from 'axios'
import { createContext, useState, useContext } from 'react'
import qs from 'qs'

const SearchContext = createContext()

export function useSearchContext() {
  return useContext(SearchContext)
}

export function SearchProvider({ children }) {
  const [searchParams, setSearchParams] = useState(new Map())
  const [alojamientos, setAlojamientos] = useState([])
  const [switchLimpiar, setSwitchLimpiar] = useState(false)

  const search = () => {
    let filtrosJson = Object.fromEntries(searchParams)
    if (filtrosJson.checkIn) {
      filtrosJson.checkIn = convertirFecha(filtrosJson.checkIn)
    }
    if (filtrosJson.checkOut) {
      filtrosJson.checkOut = convertirFecha(filtrosJson.checkOut)
    }
    //console.log('Filtros a aplicar: ', filtrosJson)

    axios
      .get('/alojamientos', {
        baseURL: 'http://localhost:6969',
        params: filtrosJson,
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
      })
      .then((response) => {
        setAlojamientos(response.data)
        //console.log('Alojamientos filtrados', response.data)
      })
      .catch((error) => {
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
