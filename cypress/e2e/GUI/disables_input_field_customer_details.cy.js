describe('Desativação do campo de entrada de texto na página de detalhes do cliente', () => {
    it('Deve desativar o campo de entrada de texto na página de detalhes do cliente', () => {
      cy.visit('/clientes');

      cy.get(':nth-child(1) > :nth-child(1) > button').click();
      cy.get('[data-testid="name"]').should('be.disabled');
    });
  });
