describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

    const botonLog = cy.get('.app-nav-links button')
    botonLog.click()
    cy.get('.auth-form > div:nth-child(1) input').type('huesped@gmail.com')
    cy.get('.auth-form > div:nth-child(2) input').type('1')
    cy.get('.auth-form button').click()

    cy.get('input[placeholder = "Buscar ciudad"]')
      .type('Buenos Aires')
      .should('have.value', 'Buenos Aires')
    const checkIn = cy.get('.search-bar > div:nth-child(3)').click().type('2025-07-08')
    const checkOut = cy.get('.search-bar > div:nth-child(5)').click().type('2025-07-14')
    cy.get('.search-bar > div:nth-child(7) > input')
      .click()
      .type('{uparrow}')
      .type('{uparrow}')
      .trigger('change')
      .should('have.value', '3')
    cy.get('button[class="search-button"]').click()

    cy.get('.search-card-container').first().click()
  })
})
