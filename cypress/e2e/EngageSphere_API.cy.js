// Recupera clientes com sucesso (por exemplo, verifica o código de status 200)
describe('Recuperação de Clientes', () => {
    it('Deve recuperar clientes com sucesso', () => {
      cy.request('GET', 'http://localhost:3001/customers?page=2&limit=10&size=All')
        .then((response) => {
          expect(response.status).to.equal(200);
        });
    });
  });

// Pagina a lista de clientes corretamente

describe('Teste de Listagem de Clientes', () => {
    it('Deve retornar a lista de clientes com sucesso', () => {
      cy.request('GET', 'http://localhost:3001/customers?page=1&limit=10&size=All').then((response) => {
        expect(response.status).to.equal(200);

        expect(response.body).to.have.all.keys('customers', 'pageInfo');
        expect(response.body.customers).to.have.length.gt(0);
        expect(response.body.pageInfo).to.have.all.keys('currentPage', 'totalPages', 'totalCustomers');
      });
    });
  });

//Filtra clientes por tamanho corretamente

describe('Teste de filtro de clientes por tamanho', () => {
    it('Deve filtrar clientes por tamanho corretamente', () => {
      cy.request('GET', 'http://localhost:3001/customers?page=1&limit=10&size=Small').then((response) => {

        expect(response.status).to.equal(200);
        expect(response.body.customers).to.have.length.gt(0);
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

 //Retorna a estrutura correta da resposta (ou seja, propriedades dos customers e pageInfo)

 describe('Teste de Estrutura da Resposta', () => {
    it('Deve retornar a estrutura correta da resposta', () => {
      const url = 'http://localhost:3001/customers?page=1&limit=50&size=All';

      cy.request('GET', url).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.all.keys('customers', 'pageInfo');
        expect(response.body.customers).to.be.an('array');
        expect(response.body.pageInfo).to.be.an('object');

      });
    });
  });
