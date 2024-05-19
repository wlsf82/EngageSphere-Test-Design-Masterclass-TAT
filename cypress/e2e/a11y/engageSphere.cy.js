describe('Validar acessibilidade da aplicação Engage Sphere', () => {
  beforeEach(() =>{
    cy.visit('')
    cy.injectAxe()
  })

  it('Não encontra problemas de acessibilidade no modo claro', () => {
    cy.checkA11y()
  })

  it.only('Não encontra problemas de acessibilidade no modo escuro', () => {
    cy.get('#theme-toggle-button').click()
    cy.get('body').should('have.attr', 'data-theme', 'dark')
    cy.checkA11y()
  })
})
