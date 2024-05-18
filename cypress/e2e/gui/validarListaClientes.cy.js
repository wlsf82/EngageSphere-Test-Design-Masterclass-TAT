describe('Validar lista cliente', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/customers**', { fixture: 'clientes' }).as('getCustomers')
    cy.visit('')
    cy.wait('@getCustomers')
  })

  it('Mostra uma lista de clientes quando há dados no banco de dados', () => {
    cy.get('table').should('have.length.greaterThan', 0)
  })
})
