// Recupera clientes com sucesso (por exemplo, verifica o código de status 200)
describe('Recuperação de Clientes', () => {
    it('Deve recuperar clientes com sucesso', () => {
      cy.request('GET', 'http://localhost:3001/customers?page=2&limit=10&size=All')
        .then((response) => {
          expect(response.status).to.equal(200);
        });
    });
  });


