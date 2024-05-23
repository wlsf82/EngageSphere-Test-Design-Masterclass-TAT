describe('Exibição do elemento de Loading', () => {
  it('Deve exibir o elemento de Loading antes da busca inicial dos clientes', () => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/customers**`, {
      delay: 1000,
      fixture: false,
    }).as('getCustomers');

    cy.visit('/');
    cy.contains('p', 'Loading...').should('be.visible');
    cy.wait('@getCustomers');
    cy.contains('p', 'Loading...').should('not.exist');
  });
});
