describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

    const botonLog = cy.get('.app-nav-links button')
    botonLog.click()
    const email = cy
      .get('.auth-form > div:nth-child(1) input')
      .type('anfitrion@gmail.com')
    const password = cy.get('.auth-form > div:nth-child(2) input')
    password.type('1')
    const inciarSesion = cy.get('.auth-form button')
    inciarSesion.click()
  })
})
