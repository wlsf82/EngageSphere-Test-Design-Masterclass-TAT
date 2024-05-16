describe('Alternância de Tema', () => {
    it('Deve alternar o tema para modo escuro e persistir no armazenamento local', () => {
      cy.visit('/')

      cy.get('#theme-toggle-button').should('be.visible')

      cy.get('#theme-toggle-button').click()

      cy.get('body').should('have.attr', 'data-theme', 'dark');

      cy.reload();
      cy.window().then((win) => {
        const themeCheck = win.localStorage.getItem('theme');
        expect(themeCheck).to.eq('dark');
      });
    });

    it('Deve alternar o tema para modo claro e persistir no armazenamento local', () => {
      cy.window().then((win) => {
        win.localStorage.setItem('theme', 'dark');
      });

      cy.visit('/')

      cy.get('#theme-toggle-button').click()

      cy.get('body').should('have.attr', 'data-theme', 'light');

      cy.reload();
      cy.window().then((win) => {
        const themeCheck = win.localStorage.getItem('theme');
        expect(themeCheck).to.eq('light');
      });
    });
  });
