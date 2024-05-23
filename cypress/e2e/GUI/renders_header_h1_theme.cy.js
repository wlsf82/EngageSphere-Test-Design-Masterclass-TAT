describe('Teste do Cabeçalho com Alternância de Tema', () => {
    it('Deve renderizar o cabeçalho e alternar para o tema escuro', () => {
      cy.visit('/')

      cy.contains('h1', 'EngageSphere').should('be.visible')

      cy.get('#theme-toggle-button').should('be.visible')

      cy.get('body').should('have.attr', 'data-theme', 'light');

      cy.get('#theme-toggle-button').click()

      cy.get('body').should('have.attr', 'data-theme', 'dark');

      cy.getAllLocalStorage()
        .then((result) => {
         const theme = result[Cypress.config('baseUrl')].theme
         expect(theme).to.equal('dark')
      })
    })

    it('Deve renderizar o cabeçalho e alternar para o tema claro', () => {
      cy.window().then((win) => {
        win.localStorage.setItem('theme', 'dark');
      });

      cy.visit('/')

      cy.contains('h1', 'EngageSphere').should('be.visible')

      cy.get('#theme-toggle-button').should('be.visible')

      cy.get('body').should('have.attr', 'data-theme', 'dark');

      cy.get('#theme-toggle-button').click()

      cy.get('body').should('have.attr', 'data-theme', 'light');

      cy.getAllLocalStorage()
      .then((result) => {
       const theme = result[Cypress.config('baseUrl')].theme
       expect(theme).to.equal('light')
      })
    })
  })