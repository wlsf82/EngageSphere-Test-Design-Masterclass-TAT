//Tabela de clientes

import 'cypress-axe';
describe('Acessibilidade da Tabela de Clientes', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.injectAxe();
    });

    it('não encontra problemas de acessibilidade no modo claro', () => {
      cy.document().then((doc) => {
        doc.body.setAttribute('data-theme', 'light');
      });
      cy.get('[aria-label="theme-toggle-button"]').should('contain', '☽');
      cy.get('[data-testid="table"]', { timeout: 10000 }).should('be.visible');
      cy.checkA11y()
    });

    it('não encontra problemas de acessibilidade no modo escuro', () => {

      cy.get('#theme-toggle-button').click();
      cy.get('[aria-label="theme-toggle-button"]').should('contain', '☀');
      cy.get('[data-testid="table"]', { timeout: 10000 }).should('be.visible');
      cy.checkA11y()

    });
  });