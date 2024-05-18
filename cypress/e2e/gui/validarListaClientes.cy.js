describe('Validar lista cliente', () => {
  it('Mostra uma lista de clientes quando há dados no banco de dados', () => {
    cy.visit('')
    cy.get('table').should('have.length.greaterThan', 0)
  })
})
