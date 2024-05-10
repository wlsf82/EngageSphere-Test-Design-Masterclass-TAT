/// <reference types="Cypress" />
describe('Validação método GET lista de clientes', () => {
  beforeEach(() => {
    
  });
  context('Validação de paginação', () => {
    it('Validação de paginação da primeira página', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3001/customers?page=1&limit=10&size=All'
      }).then((response) => {
        console.log('Clientes da primeira página:', response.body);
        expect(response.status).to.eq(200);
        expect(response.body.customers.length).to.eq(10);
        expect(response.body.pageInfo).to.be.an('object');
        expect(response.body.pageInfo.currentPage).to.eq('1');
        expect(response.status).to.eq(200);
        expect(response.body.customers.length).to.eq(10);
        expect(response.body.pageInfo).to.be.an('object');
        expect(response.body.pageInfo.currentPage).to.eq(response.body.pageInfo.currentPage);
        expect(response.body.pageInfo.totalPages).to.eq(response.body.pageInfo.totalPages);
        expect(response.body.pageInfo.totalCustomers).to.eq(response.body.pageInfo.totalCustomers);
        expect(response.body.pageInfo.totalCustomers).to.be.a('number');
        expect(response.body.pageInfo).to.be.an('object');
        expect(response.body.pageInfo).to.have.property('currentPage');
        expect(response.body.pageInfo.currentPage).to.be.a('string');
        expect(response.body.pageInfo.currentPage).to.not.be.empty;
        expect(response.body.pageInfo).to.have.property('totalPages');
        expect(response.body.pageInfo.totalPages).to.be.a('number');
        expect(response.body.pageInfo.totalPages).to.be.greaterThan(0);
        expect(response.body.pageInfo).to.have.property('totalCustomers');
        expect(response.body.pageInfo.totalCustomers).to.be.a('number');
      });
    });
  
    it('Validação de paginação da segunda página', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3001/customers?page=2&limit=10&size=All'
      }).then((response) => {
        console.log('Clientes da segunda página:', response.body);
        expect(response.status).to.eq(200);
        expect(response.body.customers.length).to.eq(10);
        expect(response.body.pageInfo).to.be.an('object');
        expect(response.body.pageInfo.currentPage).to.eq('2');
        expect(response.status).to.eq(200);
        expect(response.body.customers.length).to.eq(10);
        expect(response.body.pageInfo).to.be.an('object');
        expect(response.body.pageInfo.currentPage).to.eq(response.body.pageInfo.currentPage);
        expect(response.body.pageInfo.totalPages).to.eq(response.body.pageInfo.totalPages);
        expect(response.body.pageInfo.totalCustomers).to.eq(response.body.pageInfo.totalCustomers);
        expect(response.body.pageInfo.totalCustomers).to.be.a('number');
        expect(response.body.pageInfo).to.be.an('object');
        expect(response.body.pageInfo).to.have.property('currentPage');
        expect(response.body.pageInfo.currentPage).to.be.a('string');
        expect(response.body.pageInfo.currentPage).to.not.be.empty;
        expect(response.body.pageInfo).to.have.property('totalPages');
        expect(response.body.pageInfo.totalPages).to.be.a('number');
        expect(response.body.pageInfo.totalPages).to.be.greaterThan(0);
        expect(response.body.pageInfo).to.have.property('totalCustomers');
        expect(response.body.pageInfo.totalCustomers).to.be.a('number');
      });
    }); 

    it('Validação de paginação da última página', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3001/customers?page=5&limit=10&size=All'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.customers.length).to.eq(10);
        expect(response.body.pageInfo).to.be.an('object');
        expect(response.body.pageInfo.currentPage).to.eq('5');
        expect(response.body.pageInfo.totalPages).to.eq(response.body.pageInfo.totalPages);
        expect(response.body.pageInfo.totalCustomers).to.eq(response.body.pageInfo.totalCustomers);
        expect(response.body.pageInfo.totalCustomers).to.be.a('number');
        expect(response.body.pageInfo).to.be.an('object');
        expect(response.body.pageInfo).to.have.property('currentPage');
        expect(response.body.pageInfo.currentPage).to.be.a('string');
        expect(response.body.pageInfo.currentPage).to.not.be.empty;
        expect(response.body.pageInfo).to.have.property('totalPages');
        expect(response.body.pageInfo.totalPages).to.be.a('number');
        expect(response.body.pageInfo.totalPages).to.be.greaterThan(0);
        expect(response.body.pageInfo).to.have.property('totalCustomers');
        expect(response.body.pageInfo.totalCustomers).to.be.a('number');
      });
    }); 
  });
});