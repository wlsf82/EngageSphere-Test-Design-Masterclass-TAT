describe('API Testing Suite for the /customers Endpoint', () => {
  it('successfully retrieves customers', () => {
    cy.getCustomers().then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.customers).to.be.an('array').that.is.not.empty;
      response.body.customers.forEach(customer => {
        return Cypress._.isNumber(customer.id) &&
        Cypress._.isString(customer.name) &&
        Cypress._.isNumber(customer.employees) &&
        Cypress._.isObject(customer.contactInfo) &&
        Cypress._.isObject(customer.address) &&
        Cypress._.isString(customer.size) &&
        ['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise'].includes(customer.size) &&
        (customer.contactInfo && Cypress._.isString(customer.contactInfo.name) && Cypress._.isString(customer.contactInfo.email)) &&
        (customer.address && Cypress._.isString(customer.address.street));
      });
    });
  });

  it('Paginates the customer list correctly', () => {
    cy.getPaginatedCustomers({ page: 2, limit: 20, size: 'Enterprise' }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('pageInfo').that.exist;
  
      const { pageInfo, customers } = response.body;
  
      expect(pageInfo.currentPage).to.eq('2');
      expect(pageInfo.totalPages).to.eq(1);
      expect(pageInfo.totalCustomers).to.be.gte(1);
      expect(customers).to.be.an('array').and.to.have.lengthOf(0);
    });
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
    
  });

  it('handles invalid requests gracefully (page as a string)', () => {
    
  });

  it('handles invalid requests gracefully (limit as a boolean)', () => {
    
  });

  it('handles invalid requests gracefully (unsupported size)', () => {
    
  });
});