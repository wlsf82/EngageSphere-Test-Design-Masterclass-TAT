describe('Validar a mensagem de "Loading"', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/customers**', { delay:1000 }).as('getCustomers')
    cy.visit('')
  })
  it('Deve exibir a mensagem de carregamento', () => {
    cy.get('#loading').should('be.visible')
    cy.wait('@getCustomers')
    cy.get('#Loading').should('not.exist')
  })
})
