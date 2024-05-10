//Shows a Loading... fallback element before the initial customers' fetch ***

describe('Exibição do elemento de Loading', () => {
    beforeEach(() => {
      cy.intercept('GET', '/customers', []).as('getCustomers');
    });

    it('Deve exibir o elemento de Loading antes da busca inicial dos clientes', () => {
      cy.visit('http://localhost:3000');

      cy.get('#loading').should('exist');

      cy.get('#loading').should('not.exist');

      cy.get('tbody').should('exist');
    });
  });
