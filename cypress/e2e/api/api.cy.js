describe('API Testing Suite for the /customers Endpoint', () => {
  it('successfully retrieves customers', () => {
    cy.getCustomers().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.customers).to.be.an('array').that.is.not.empty;
      response.body.customers.forEach((customer) => {
              return Cypress._.isNumber(customer.id) &&
               Cypress._.isString(customer.name) &&
               Cypress._.isNumber(customer.employees) &&
               Cypress._.isString(customer.size) &&
               Cypress._.isObject(customer.address);
      });
    });
  });

  it('Paginates the customer list correctly', () => {
    cy.paginateCustomers();
  });

  it('Filters customers by size correctly', () => {
    cy.filterCustomersBySize('large');
  });

  it('Returns the correct structure of the response', () => {
    cy.checkResponseStructure();
  });

  it('Handles invalid requests gracefully', () => {
    cy.handleInvalidRequests();
  });

  it('handles invalid requests gracefully (negative limit)', () => {
    // Test logic to make an invalid request with a negative limit
  });

  it('handles invalid requests gracefully (page as a string)', () => {
    // Test logic to make an invalid request with page as a string
  });

  it('handles invalid requests gracefully (limit as a boolean)', () => {
    // Test logic to make an invalid request with limit as a boolean
  });

  it('handles invalid requests gracefully (unsupported size)', () => {
    // Test logic to make an invalid request with an unsupported size
  });
});
