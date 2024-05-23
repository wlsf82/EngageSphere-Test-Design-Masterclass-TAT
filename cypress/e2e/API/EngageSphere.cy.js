const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`;

/// <reference types="Cypress" />
describe('GET /customers', () => {
    context('Solicitações inválidas são tratadas de forma elegante', () => {
      it('Retorna um erro e código de status 400 ao passar um valor inválido para o parâmetro page', () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:3001/customers?page=invalid&limit=10&size=All',
          failOnStatusCode: false 
        }).then(response => {
          expect(response.status).to.eq(400)
        });
      });
      it('Retorna um erro e código de status 400 ao passar um valor inválido para o parâmetro size', () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:3001/customers?size=extra_large',
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.error).to.contain('Unsupported size value');
          expect(response.body.error).to.contain('Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.');
        });
      });
      it('Retorna um erro e código de status 400 ao passar um valor nulo para o parâmetro page', () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:3001/customers?page=null&limit=10&size=Small',
          failOnStatusCode: false 
        }).then(response => {
          expect(response.status).to.eq(400);
        });
      });
      it('Retorna um erro e código de status 400 ao passar um valor nulo para o parâmetro size', () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:3001/customers?page=1&limit=10&size=null',
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.eq(400);
        });
      })
      it('Retorna um erro e código de status 400 ao passar um boleano', () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:3001/customers?page=1&limit=true&size=Large%20Enterprise',
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.eq(400);
          //Obs -> não retorna mensagem
        });
      });
    });
    context('Validação de paginação', () => {
        it('Validação de paginação da primeira página deve retornar 200', () => {
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
      
        it('Validação de paginação da segunda página deve retornar 200', () => {
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
    
        it('Validação de paginação da última página deve retornar 200', () => {
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
    context('Recuperação de clientes', () => {
        it('Recupera clientes com sucesso deve retornar 200', () => {
            cy.request({
              method: 'GET',
              url: 'http://localhost:3001/customers?page=1&limit=10&size=All',
              headers: {
                'If-None-Match': null,
                'If-Modified-Since': null
              }
            }).then((response) => {
              expect(response.status).to.eq(200);
            });
          });
    });
  });
  