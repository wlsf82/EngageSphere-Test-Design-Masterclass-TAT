//Successfully retrieves customers (e.g., checks for the 200 status code) *

describe('Teste de API - Recupera clientes com sucesso', () => {
    it('Verifica o código de status 200 ao recuperar clientes', () => {
      cy.request('GET', 'http://localhost:3001/customers')
        .then((response) => {
          expect(response.status).to.eq(200);
        });
    });
  });