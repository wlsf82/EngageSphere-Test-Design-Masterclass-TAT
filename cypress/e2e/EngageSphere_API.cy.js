const CUSTOMERS_API_URL= `${Cypress.env('API_URL')}/customers`;


describe('GET /customers', () => {
  it('Retorna o código de status 200 em uma requisição bem sucedida', () => {
      cy.request('GET', 'http://localhost:3001/customers?page=2&limit=10&size=All')
      .then(({ status }) => {
        expect(status).to.equal(200);
        });
    });
  });

describe('Teste de Listagem de Clientes', () => {
    it('Deve retornar a lista de clientes com sucesso', () => {
      cy.request('GET', `${Cypress.env('API_URL')}/customers`).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.all.keys('customers', 'pageInfo');
        expect(response.body.customers).to.have.length.gt(0);
        expect(response.body.pageInfo).to.have.all.keys('currentPage', 'totalPages', 'totalCustomers');
      });
    });
  });

  describe('Teste de filtro de clientes por tamanho', () => {
  it('Filtra clientes por tamanho corretamente', () => {
    const sizes = ['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise']

    sizes.forEach((size) => {
      cy.request('GET', `${CUSTOMERS_API_URL}?page=1&limit=50&size=${size}`)
        .then(({ body }) => {
          body.customers.forEach((customer) => {
            expect(customer.size).to.eq(size)
          })
        })
    })
  });
});
 
