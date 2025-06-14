import './search-page.css'
import { Button } from '@mui/material'

export default function SearchPage({ searchValue }) {
  //TODO: Agregar filtros

  return (
    <div className="search-result">
      <h1>`Resultados de busqueda para: ${searchValue}`</h1>
      {/* TODO: aplicar filtros con botones */}
      <Button variant="outlined" />
    </div>
  )
}
