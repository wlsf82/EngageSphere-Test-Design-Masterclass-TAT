//Shows a list of customers when there's data in the database ***

describe('Exibição da lista de clientes', () => {
    it('Deve exibir uma lista de clientes quando há dados no banco de dados', () => {
      cy.visit('http://localhost:3000');

      cy.get('tbody').should('exist').should('have.length.greaterThan', 0);
    });
  });
