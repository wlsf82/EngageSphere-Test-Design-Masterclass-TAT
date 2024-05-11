/// <reference types="Cypress" />
describe('Solicitações inválidas de forma elegante', () => {
  context('Dado que valido tamanhos suportatos', () => {

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
        expect(response.body).to.have.property('error');
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
    
});
