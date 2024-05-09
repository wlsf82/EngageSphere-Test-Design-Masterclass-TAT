describe('Recuperação de Clientes', () => {
    it('Deve recuperar clientes com sucesso', () => {
      // Fazer a chamada à API para recuperar clientes
      cy.request('GET', 'http://localhost:3001/customers?page=2&limit=10&size=All')
        .then((response) => {
          // Verificar se o código de status é 200 - teste
          expect(response.status).to.equal(200);
        });
    });
  });

