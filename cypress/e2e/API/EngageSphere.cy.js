/// <reference types="Cypress" />
describe('Validações de API', () => {
    context('Solicitações inválidas de forma elegante', () => {
      it('Então valido page="invalid" como string', () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:3001/customers?page=invalid&limit=10&size=All',
          failOnStatusCode: false 
        }).then(response => {
          expect(response.status).to.eq(400)
        });
      });
      it('Então valido a request definindo como extra_large', () => {
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
      it('Então valido a request definindo como invalid limit', () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:3001/customers?page=invalid&limit=10&size=All',
          failOnStatusCode: false 
        }).then(response => {
          expect(response.status).to.eq(400);
        });
      });
      it('Então valido a request com tamanho invalido', () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:3001/customers?page=1&limit=10&size=Invalid',
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.eq(400);
        });
      })
      it('Então valido limit como boleano', () => {
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
    context('Recuperação de clientes', () => {
        it('Recupera clientes com sucesso', () => {
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
  