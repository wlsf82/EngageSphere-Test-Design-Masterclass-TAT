describe('Validar a mensagem de "Loading"', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/customers**').as('getCustomers')
    cy.visit('customers?page=1&limit=10&size=All')
    cy.wait('@getCustomers')
  })
  it('Deve exibir a mensagem de carregamento', () => {
    cy.get('#loading').should('be.visible')
  })
})
