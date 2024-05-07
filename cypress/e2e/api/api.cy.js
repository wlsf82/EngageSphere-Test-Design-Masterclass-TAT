describe('API Testing Suite for the /customers Endpoint', () => {
  it('successfully retrieves customers', () => {
    cy.getCustomers().then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Deve paginar a lista de clientes corretamente', () => {
    cy.paginateCustomers();
  });

  it('Deve filtrar clientes por tamanho corretamente', () => {
    cy.filterCustomersBySize('large');
  });

  it('Deve verificar a estrutura correta da resposta', () => {
    cy.checkResponseStructure();
  });

  it('Deve tratar solicitações inválidas de forma elegante', () => {
    cy.handleInvalidRequests();
  });
});
