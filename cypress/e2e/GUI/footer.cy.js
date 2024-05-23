describe('Mostra o rodapé e seus links', () => {
    it('Deve renderizar o rodapé e seus links', () => {
      cy.visit('/')
      cy.get('[data-testid="footer"]').should('be.visible')
      cy.get('[href="https://udemy.com/user/walmyr"]').should('be.visible')
      cy.get('[href="https://talkingabouttesting.com"]').should('be.visible')
      cy.get('[href="https://youtube.com/@talkingabouttesting"]').should('be.visible')
      })
    })