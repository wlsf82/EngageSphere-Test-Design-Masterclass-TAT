Cypress.Commands.add('getCustomers', () => {
    return cy.api('GET', Cypress.config().backendUrl + '/customers');
});