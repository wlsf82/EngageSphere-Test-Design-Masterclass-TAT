describe('API Testing Suite for the /customers Endpoint', () => {
  it('Successfully retrieves customers (checks the 200 status code)', () => {
    cy.getRequest({}).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.customers).to.be.an('array').that.is.not.empty; 
    });
  });

  it('Paginates the customer list correctly', () => {
    cy.getRequest({ page: 2, limit: 20, size: 'All' }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('pageInfo').that.exist;
  
      const { pageInfo, customers } = response.body;
  
      expect(pageInfo.currentPage).to.eq('2');
      expect(pageInfo.totalPages).to.eq(3);
      expect(pageInfo.totalCustomers).to.be.gte(50);
      expect(customers).to.be.an('array').and.to.have.lengthOf(20);
    });
  });

  it('Filters customers by size correctly', () => {
    cy.getRequest({ size: 'Medium' }).then((response) => {
      expect(response.status).to.eq(200);
      response.body.customers.forEach(customer => {
        expect(customer.size).to.eq('Medium');
        expect(customer.employees).to.be.at.least(100).and.to.be.below(1000);
      });
    });
  });

  it('Returns the correct structure of the response', () => {
    cy.getRequest({page: 2, limit: 5}).then((response) => {
      expect(response.status).to.eq(200);
  
      response.body.customers.forEach((customer) => {
        expect(customer.id).to.be.a('number');
        expect(customer.name).to.be.a('string');
        expect(customer.employees).to.be.a('number');
        expect(customer.size).to.be.oneOf(['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise']);
  
        if (customer.contactInfo) {
          expect(customer.contactInfo).to.have.property('name').that.is.a('string');
          expect(customer.contactInfo).to.have.property('email').that.is.a('string');
        }
  
        if (customer.address) {
          expect(customer.address).to.have.property('street').that.is.a('string');
          expect(customer.address).to.have.property('city').that.is.a('string');
          expect(customer.address).to.have.property('state').that.is.a('string');
          expect(customer.address).to.have.property('zipCode').that.is.a('string');
          expect(customer.address).to.have.property('country').that.is.a('string');
        }
      });
      
      cy.wrap(response.body.pageInfo).should((pageInfo) => {
        expect(pageInfo.currentPage).to.be.a('string').and.to.equal('2');
        expect(pageInfo.totalPages).to.equal(10);
        expect(pageInfo.totalCustomers).to.equal(50);
      });
    });
  });
// Invalid tests results 

  it('Handles invalid requests gracefully (negative page)', () => {
    cy.getRequest({ page: -2, invalidRequest: true }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.');
    });
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