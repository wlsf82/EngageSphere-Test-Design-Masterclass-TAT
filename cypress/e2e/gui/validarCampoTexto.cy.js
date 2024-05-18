describe('Testes dos componentes da aplicação Engage Sphere', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/customers**').as('getCustomers')
    cy.visit('customers?page=1&limit=10&size=All')
    cy.wait('@getCustomers')
  })
  it('Desativa o campo de entrada de texto quando na página de detalhes do cliente', () => {
    cy.get('table tr td button')
      .first()
      .click()
    cy.get('[data-testid="name"]')
      .should('be.disabled')
  })
})
