//Disables the text input field when there are no customers in the database ***

describe('Desativação do campo de entrada de texto quando não há clientes', () => {
    beforeEach(() => {

        cy.intercept('GET', 'http://localhost:3001/customers?page=1&limit=10&size=All', { statusCode: 200, body: `{customers:[]}` }).as('getCustomers');
    });

    it('Deve desativar o campo de entrada de texto quando não há clientes', () => {
      cy.visit('http://localhost:3000/clientes');

      cy.get('[data-testid="name"]').should('be.disabled');
    });
  });

