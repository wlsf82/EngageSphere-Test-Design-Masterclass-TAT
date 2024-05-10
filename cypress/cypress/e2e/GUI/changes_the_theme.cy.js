//Changes the theme to dark mode, ensuring it persists in the local storage ***
//AND
//Changes the theme to light mode, ensuring it persists in the local storage ***

describe('Alternância de Tema', () => {
    it('Deve alternar o tema para modo escuro e persistir no armazenamento local', () => {
      cy.visit('http://localhost:3000')

      cy.get('#theme-toggle-button').should('be.visible')

      cy.get('#theme-toggle-button').click()

      cy.get('body').should('have.attr', 'data-theme', 'dark');

      cy.window().then((win) => {
        const themeCheck = win.localStorage.getItem('theme');
        expect(themeCheck).to.eq('dark');
      });
    });

    it('Deve alternar o tema para modo claro e persistir no armazenamento local', () => {
      cy.window().then((win) => {
        win.localStorage.setItem('theme', 'dark');
      });

      cy.visit('http://localhost:3000')

      cy.get('#theme-toggle-button').click()

      cy.get('body').should('have.attr', 'data-theme', 'light');

      cy.window().then((win) => {
        const themeCheck = win.localStorage.getItem('theme');
        expect(themeCheck).to.eq('light');
      });
    });
  });
