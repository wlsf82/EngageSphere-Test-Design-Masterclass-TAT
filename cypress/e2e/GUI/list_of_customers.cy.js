describe('Exibição da lista de clientes', () => {
    it('Deve exibir uma lista de clientes quando há dados no banco de dados', () => {
      cy.visit('/');

      cy.get('tbody').should('exist').should('have.length.greaterThan', 0);
    });
  });
