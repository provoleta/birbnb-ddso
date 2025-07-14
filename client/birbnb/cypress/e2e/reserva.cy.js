import { slowCypressDown } from 'cypress-slow-down'

describe('Integration-E2E-BirBnB-Test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    slowCypressDown(300)

    const botonLog = cy.get('.app-nav-links button')
    botonLog.click()

    const userEmail = cy.get('.auth-form > div:nth-child(1) input')
    userEmail.type('huesped@gmail.com')

    const userPass = cy.get('.auth-form > div:nth-child(2) input')
    userPass.type('1')

    const userLoginButton = cy.get('.auth-form button')
    userLoginButton.click()

    const busquedaCiudad = cy.get('input[placeholder = "Buscar ciudad"]')
    busquedaCiudad.type('CABA')
    busquedaCiudad.should('have.value', 'CABA')

    const checkInDate = cy.get('.search-bar > div:nth-child(3)')
    checkInDate.click()
    checkInDate.type('2025-08-08')

    const checkOutDate = cy.get('.search-bar > div:nth-child(5)')
    checkOutDate.click()
    checkOutDate.type('2025-08-14')

    const cantHuespedes = cy.get('.search-bar > div:nth-child(7) > input')
    cantHuespedes.click()
    cantHuespedes.type('{uparrow}')
    cantHuespedes.trigger('change')
    cantHuespedes.should('have.value', '2')

    const searchButton = cy.get('button[class="search-button"]')
    searchButton.click()

    cy.get('.search-card-container').first().click()
    cy.get('.react-datepicker__day--020').click()
    cy.get('.react-datepicker__day--027').click()

    const reservaButton = cy.get('.boton-reservar')
    reservaButton.click()

    const cerrarVentanaButton = cy.get('.boton-cerrar-ventana')
    cerrarVentanaButton.click()

    const misReservasButton = cy.get('.session-buttons > :nth-child(2)')
    misReservasButton.click()
  })

  it('passes', () => {
    cy.visit('http://localhost:3000')

    const botonLog = cy.get('.app-nav-links button')
    botonLog.click()

    const userEmail = cy.get('.auth-form > div:nth-child(1) input')
    userEmail.type('lucas@gmail.com')

    const userPass = cy.get('.auth-form > div:nth-child(2) input')
    userPass.type('1')

    const userLoginButton = cy.get('.auth-form button')
    userLoginButton.click()

    const alojamientosButton = cy.get('.session-buttons > :nth-child(3)')
    alojamientosButton.click()

    const reservasPendientesButton = cy.get('.botones-opcion-container > :nth-child(4)')
    reservasPendientesButton.click()

    const confirmarReservaButton = cy.get('.card-container > :nth-child(3)')
    confirmarReservaButton.click()

    const aceptarReservaButton = cy.get('.boton-confirmar-reserva')
    aceptarReservaButton.click()
  })

  it('passes', () => {
    cy.visit('http://localhost:3000')

    const botonLog = cy.get('.app-nav-links button')
    botonLog.click()

    const userEmail = cy.get('.auth-form > div:nth-child(1) input')
    userEmail.type('huesped@gmail.com')

    const userPass = cy.get('.auth-form > div:nth-child(2) input')
    userPass.type('1')

    const userLoginButton = cy.get('.auth-form button')
    userLoginButton.click()

    const notificationsButton = cy.get('.session-buttons > :nth-child(1)')
    notificationsButton.click()

    const marcarLeida = cy.get('.PrivateSwitchBase-input')
    marcarLeida.click()

    const mostrarNotificaciones = cy.get('.button-container > div > .MuiButtonBase-root')
    mostrarNotificaciones.click()

    const mostrarLeidasButton = cy.get('.sort-options-dropdown > :nth-child(1)')
    mostrarLeidasButton.click()
  })
})
