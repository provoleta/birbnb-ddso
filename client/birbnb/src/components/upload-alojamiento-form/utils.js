export const handleHorarioBlur = (setter) => (e) => {
  let value = e.target.value.replace(/[^\d]/g, '')

  if (value.length === 0) {
    setter('')
    return
  }

  if (value.length === 1) {
    setter('0' + value + ':00')
  } else if (value.length === 2) {
    setter(value + ':00')
  } else if (value.length === 3) {
    setter(value.slice(0, 2) + ':' + value.slice(2) + '0')
  } else if (value.length >= 4) {
    const horas = parseInt(value.slice(0, 2), 10)
    const minutos = parseInt(value.slice(2, 4), 10)
    if (horas > 23 || minutos > 59) return
    setter(value.slice(0, 2) + ':' + value.slice(2, 4))
  }
}

export const handleHorarioChange = (setter) => (e) => {
  let value = e.target.value

  if (value.length < e.target.selectionStart) {
    setter(value)
    return
  }

  value = value.replace(/[^\d]/g, '')

  if (value.length === 0) {
    setter('')
  } else if (value.length === 1) {
    setter(value)
  } else if (value.length === 2) {
    const horas = parseInt(value, 10)
    if (horas > 23) return
    setter(value + ':')
  } else if (value.length === 3) {
    const horas = parseInt(value.slice(0, 2), 10)
    const minutos = parseInt(value.slice(2, 3), 10)
    if (horas > 23) return
    if (minutos > 5) return
    setter(value.slice(0, 2) + ':' + value.slice(2))
  } else if (value.length >= 4) {
    const horas = parseInt(value.slice(0, 2), 10)
    const minutos = parseInt(value.slice(2, 4), 10)
    if (horas > 23) return
    if (minutos > 59) return
    setter(value.slice(0, 2) + ':' + value.slice(2, 4))
  }
}
