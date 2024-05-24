/// <reference types="Cypress" />

const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`;
describe('GET /customers', () => {
    context('Solicitações inválidas são tratadas de forma elegante', () => {
      it('Retorna um erro e código de status 400 ao passar um valor inválido para o parâmetro page', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}?page=invalid&limit=10&size=All`,
          failOnStatusCode: false 
        }).then(({ status }) => {
          expect(status).to.eq(400);
        })
      })
      it('Retorna um erro e código de status 400 ao passar um valor inválido para o parâmetro size', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}?size=extra_large`,
          failOnStatusCode: false
        }).then(({ status,body }) => {
          expect(status).to.eq(400);
          expect(body.error).to.contain('Unsupported size value');
          expect(body.error).to.contain('Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.');
        });
      });
      it('Retorna um erro e código de status 400 ao passar um valor nulo para o parâmetro page', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}?page=null&limit=10&size=Small`,
          failOnStatusCode: false 
        }).then(({ status }) => {
          expect(status).to.eq(400);
        });
      });
      it('Retorna um erro e código de status 400 ao passar um valor nulo para o parâmetro size', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}?page=1&limit=10&size=null`,
          failOnStatusCode: false
        }).then(({ status }) => {
          expect(status).to.eq(400);
        });
      })
      it('Retorna um erro e código de status 400 ao passar um boleano', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}?page=1&limit=true&size=Large%20Enterprise`,
          failOnStatusCode: false
        }).then(({ status }) => {
          expect(status).to.eq(400);
          //Obs -> não retorna mensagem
        });
      });
    });
    context('Validação de paginação', () => {
      const validatePagination = (page) => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}?page=${page}&limit=10&size=All`
        }).then(({ status, body }) => {
          expect(status).to.eq(200);
          expect(body.pageInfo).to.be.an('object');
          expect(body.pageInfo.currentPage).to.eq(`${page}`);
          if (body.pageInfo.currentPage > body.pageInfo.totalPages) {
            expect(body.customers).to.be.an('array').that.is.empty;
          } else {
            expect(body.customers).to.be.an('array').that.is.not.empty;
          }
        });
      };
        it('Validação de paginação da primeira página deve retornar 200', () => {
          validatePagination(1);
        });
      
        it('Validação de paginação da segunda página deve retornar 200', () => {
          validatePagination(2);
        }); 
    
        it('Validação de paginação da última página deve retornar 200', () => {
          validatePagination(5);
        });

        it('Validação de paginação de página vazia deve retornar 200 e nenhum cliente', () => {
          validatePagination(6);
        });
    });
    context('Recuperação de clientes', () => {
        it('Recupera clientes com sucesso deve retornar 200', () => {
            cy.request({
              method: 'GET',
              url: `${CUSTOMERS_API_URL}?page=1&limit=10&size=All`,
            }).then(({ status }) => {
              expect(status).to.eq(200);
            });
          });
    });
    context('Recuperação clientes filtrado por size e limit com sucesso', () => {
      it('Retorna 200 na recuperação do cliente por Small e limite de 10', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}?page=1&limit=10&size=Small`,
        }).then(({ status, body }) => {
          expect(status).to.eq(200);
          expect(body.customers).to.be.an('array').that.is.not.empty;
          expect(body.customers.length).to.eq(3);
          expect(body.customers).to.have.lengthOf.at.most(10);
          body.customers.forEach(customer => {
            expect(customer.size).to.eq('Small');
          });
        });
      });
    });
  });
  