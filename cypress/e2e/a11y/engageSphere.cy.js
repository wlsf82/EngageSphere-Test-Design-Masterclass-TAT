describe('Validar acessibilidade da aplicação Engage Sphere', () => {
  beforeEach(() =>{
    cy.visit('')
    cy.injectAxe()
  })

  it('Não encontra problemas de acessibilidade no modo claro', () => {
    cy.checkA11y()
  })

  it('Não encontra problemas de acessibilidade no modo escuro', () => {
    cy.get('#theme-toggle-button')
      .should('be.visible')
      .click()
    cy.get('body').should('have.attr', 'data-theme', 'dark')
    cy.checkA11y()
  })

  context('Detalhes do cliente', () => {
    beforeEach(() => {
      cy.get('tbody tr')
        .should('be.visible')
        .first()
        .click()
    })

    it('Não encontra problemas de acessibilidade no modo claro', () => {
      cy.checkA11y()
    })

    it('Não encontra problemas de acessibilidade no modo escuro', () => {
      cy.get('#theme-toggle-button')
        .should('be.visible')
        .click()
      cy.get('body').should('have.attr', 'data-theme', 'dark')
      cy.checkA11y()
    })

    context('Mostrar endereço', () => {
      beforeEach(() => {
        cy.get('.show-address-btn')
          .should('be.visible')
          .click()
      })

      it('Não encontra problemas de acessibilidade no modo claro', () => {
        cy.checkA11y()
      })

      it('Não encontra problemas de acessibilidade no modo escuro', () => {
        cy.get('#theme-toggle-button')
          .should('be.visible')
          .click()
        cy.get('body').should('have.attr', 'data-theme', 'dark')
        cy.checkA11y()
      })
    })
  })
})
