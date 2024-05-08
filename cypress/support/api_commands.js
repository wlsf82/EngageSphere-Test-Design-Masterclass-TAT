Cypress.Commands.add('getCustomers', () => {
    return cy.api({
        method: 'GET',
        url: Cypress.config().backendUrl + '/customers'     
    });
});

Cypress.Commands.add('getPaginatedCustomers', ({ page, limit, size }) => {
    const queryParams = {};
    if (page) queryParams.page = page;
    if (limit) queryParams.limit = limit;
    if (size) queryParams.size = size;
  
    cy.api({
      method: 'GET',
      url: Cypress.config().backendUrl + '/customers',
      qs: queryParams
    });
  });