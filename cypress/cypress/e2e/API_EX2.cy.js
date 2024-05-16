// Pagina a lista de clientes corretamente

describe('Teste de Listagem de Clientes', () => {
    it('Deve retornar a lista de clientes com sucesso', () => {
      cy.request('GET', 'http://localhost:3001/customers?page=1&limit=10&size=All').then((response) => {
        expect(response.status).to.equal(200);
  
        // Verifica se a resposta contém dados de clientes e pageInfo
        expect(response.body).to.have.all.keys('customers', 'pageInfo');
  
        // Verifica se a lista de clientes não está vazia
        expect(response.body.customers).to.have.length.gt(0);
  
        // Verifica se a pageInfo possui os campos necessários
        expect(response.body.pageInfo).to.have.all.keys('currentPage', 'totalPages', 'totalCustomers');
      });
    });
  });
  