describe('Exibição do elemento de Loading', () => {
    beforeEach(() => {
      cy.intercept('GET', '/customers', []).as('getCustomers');
    });

    it('Deve exibir o elemento de Loading antes da busca inicial dos clientes', () => {
      cy.visit('/');

      cy.get('#loading').should('exist');

      cy.get('#loading').should('not.exist');

      cy.get('tbody').should('exist');
    });
  });
