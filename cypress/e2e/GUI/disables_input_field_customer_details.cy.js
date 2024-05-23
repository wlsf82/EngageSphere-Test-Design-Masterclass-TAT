describe('Desativação do campo de entrada de texto na página de detalhes do cliente', () => {
    it('Deve desativar o campo de entrada de texto na página de detalhes do cliente', () => {
      cy.visit('/clientes');

      cy.get('tbody tr').first().click();
      cy.get('[data-testid="name"]').should('be.disabled');
    });
  });
