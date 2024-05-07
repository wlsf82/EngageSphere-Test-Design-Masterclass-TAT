Cypress.Commands.add('getCustomers', () => {
    return cy.request('GET', '/customers');
  });