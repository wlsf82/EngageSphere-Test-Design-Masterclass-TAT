/// <reference types="Cypress" />
describe('Recuperação de clientes', () => {
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