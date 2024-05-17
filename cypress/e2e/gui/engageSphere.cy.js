describe('Testes dos componentes da aplicação Engage Sphere', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Mostra uma lista de clientes quando há dados no banco de dados', () => {
    cy.get('table').should('have.length.greaterThan', 0)
  })

  it('Desativa o campo de entrada texto quando na página de detalhes do cliente', () => {
    cy.get('table tr td button').first().click()
    cy.get('[data-testid="name"]').should('have.attr', 'disabled')
  })
})
