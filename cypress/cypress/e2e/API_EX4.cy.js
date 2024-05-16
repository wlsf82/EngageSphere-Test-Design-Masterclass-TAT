 //Retorna a estrutura correta da resposta (ou seja, propriedades dos customers e pageInfo)

describe('Teste de Estrutura da Resposta', () => {
    it('Deve retornar a estrutura correta da resposta', () => {
      const url = 'http://localhost:3001/customers?page=1&limit=50&size=All';
  
      cy.request('GET', url).then((response) => {
       
        expect(response.status).to.equal(200);
  
        // Verifica se a resposta contém as propriedades 'customers' e 'pageInfo'
        expect(response.body).to.have.all.keys('customers', 'pageInfo');
  
        // Verifica se 'customers' é um array
        expect(response.body.customers).to.be.an('array');
  
        // Verifica se 'pageInfo' é um objeto
        expect(response.body.pageInfo).to.be.an('object');

      });
    });
  });
