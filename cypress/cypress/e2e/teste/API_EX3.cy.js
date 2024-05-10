//Filtra clientes por tamanho corretamente

describe('Teste de filtro de clientes por tamanho', () => {
    it('Deve filtrar clientes por tamanho corretamente', () => {
      cy.request('GET', 'http://localhost:3001/customers?page=1&limit=10&size=Small').then((response) => {
    
        expect(response.status).to.equal(200);
  
        // Verifica se a lista de clientes não está vazia
        expect(response.body.customers).to.have.length.gt(0);
  
        // Verifica se os clientes retornados têm o tamanho correto
        response.body.customers.forEach((cliente) => {
          expect(getSize(cliente)).to.equal('Small');
        });
      });
    });
  });
  
  const getSize = ({ employees }) => {
    if (employees >= 50000) return 'Very Large Enterprise';
    if (employees >= 10000) return 'Large Enterprise';
    if (employees >= 1000) return 'Enterprise';
    if (employees >= 100) return 'Medium';
    return 'Small';
  };
  
