//Disables the text input field when in the customer details page *

describe('Desativação do campo de entrada de texto na página de detalhes do cliente', () => {
    it('Deve desativar o campo de entrada de texto na página de detalhes do cliente', () => {
      cy.visit('http://localhost:3000/clientes');

      cy.get(':nth-child(1) > :nth-child(1) > button').click();

      // Verifica se o campo de entrada de texto está desativado
      cy.wait(300);
      cy.get('[data-testid="name"]').should('be.disabled');
    });
  });
