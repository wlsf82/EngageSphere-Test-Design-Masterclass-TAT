/// <reference types="Cypress" />
describe('Solicitações inválidas', () => {
    it('Lida com solicitações com tamanho não suportado', () => {
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
});