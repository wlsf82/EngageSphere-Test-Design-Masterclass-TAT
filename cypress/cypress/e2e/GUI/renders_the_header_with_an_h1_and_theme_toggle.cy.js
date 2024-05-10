//Renders the header with an h1 and theme toggle *

describe('Teste do Cabeçalho com Alternância de Tema', () => {
    it('Deve renderizar o cabeçalho e alternar o tema', () => {
      cy.visit('http://localhost:3000')

      cy.contains('h1', 'EngageSphere').should('be.visible')

      cy.get('#theme-toggle-button').should('be.visible')

      cy.get('#theme-toggle-button').click()

      cy.get('body').should('have.attr', 'data-theme', 'dark');
    })
  })