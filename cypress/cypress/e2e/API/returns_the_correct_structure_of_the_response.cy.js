//Returns the correct structure of the response (i.e., customers and pageInfo properties) **

describe('Teste de API - Retorna a estrutura correta da resposta', () => {
    it('Deve retornar a estrutura correta da resposta', () => {
      cy.request('http://localhost:3001/customers?page=1&limit=50&size=All')
        .its('body')
        .then((body) => {
          expect(body).to.have.property('customers').to.be.an('array');
          expect(body).to.have.property('pageInfo').to.be.an('object');
          expect(body.pageInfo).to.have.property('currentPage').to.be.a('string').and.satisfy(isNumeric);
          expect(body.pageInfo).to.have.property('totalCustomers').to.be.a('number');
          expect(body.pageInfo).to.have.property('totalPages').to.be.a('number');
        });
    });
});

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
