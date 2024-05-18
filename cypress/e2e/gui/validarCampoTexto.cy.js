describe('Validar o campo de texto da aplicação Engage Sphere', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/customers**', { fixture: 'clientes' }).as('getCustomers')
    cy.visit('')
    cy.wait('@getCustomers')
  })

  it.only('Desativa o campo de entrada de texto quando na página de detalhes do cliente', () => {
    cy.get('tbody tr')
      .first()
      .click()
    cy.get('[data-testid="name"]')
      .should('be.disabled')
  })
})
