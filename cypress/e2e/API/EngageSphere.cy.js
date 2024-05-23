const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`;

describe('Teste de API - Filtragem de clientes por tamanho', () => {
  const sizes = ['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise'];

  sizes.forEach((size) => {
    it(`Deve retornar apenas clientes com o tamanho "${size}"`, () => {
      cy.request('GET', `${CUSTOMERS_API_URL}?page=1&limit=50&size=${size}`)
        .then(({ status, body }) => {
          expect(status).to.equal(200);
          expect(body).to.have.property('customers');

          const clients = body.customers;
          expect(clients).to.be.an('array').not.empty;
        });
    });
  });
});


describe('Teste de API - Teste de solicitações inválidas', () => {
    it('Deve retornar erro 400 para página negativa', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        qs: {
          page: -1
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
      })
    })
  
    it('Deve retornar erro 400 para limite negativo', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        qs: {
          limit: -1
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
      })
    })
  
    it('Deve retornar erro 400 para página como uma string', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        qs: {
          page: 'string'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
      })
    })
  
    it('Deve retornar erro 400 para limite como um booleano', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        qs: {
          limit: true
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
      })
    })
  
    it('Deve retornar erro 400 para tamanho não suportado', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        qs: {
          size: 'Very Very Large Enterprise'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.')
      })
    })

    it('Deve retornar erro 400 para página igual a zero', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        qs: {
          page: 0
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
      })
    })

    it('Deve retornar erro 400 para limite igual a zero', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        qs: {
          limit: 0
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
      })
    })
  })

  describe('Teste de API - Pagina a lista de clientes corretamente', () => {
    it('Deve retornar uma lista de clientes da API na primeira página', () => {
      cy.request('GET', `${CUSTOMERS_API_URL}?page=1&limit=20&size=All`)
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('customers');
          expect(response.body.customers).to.be.an('array').that.is.not.empty;
          expect(response.body.pageInfo.currentPage).to.equal('1');
        });
    });
  
    it('Deve retornar uma lista de clientes da API na segunda página', () => {
      cy.request('GET', `${CUSTOMERS_API_URL}?page=2&limit=20&size=All`)
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('customers');
          expect(response.body.customers).to.be.an('array').that.is.not.empty;
          expect(response.body.pageInfo.currentPage).to.equal('2');
        });
    });
  
    it('Deve retornar uma lista de clientes da API na terceira página', () => {
      cy.request('GET', `${CUSTOMERS_API_URL}?page=3&limit=20&size=All`)
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('customers');
          expect(response.body.customers).to.be.an('array').that.is.not.empty;
          expect(response.body.pageInfo.currentPage).to.equal('3');
        });
    });
  });
  

describe('Teste de API - Retorna a estrutura correta da resposta', () => {
    it('Deve retornar a estrutura correta da resposta', () => {
      cy.request(`${CUSTOMERS_API_URL}?page=1&limit=50&size=All`)
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

describe('Teste de API - Recupera clientes com sucesso', () => {
    it('Verifica o código de status 200 ao recuperar clientes', () => {
      cy.request('GET', CUSTOMERS_API_URL)
        .then((response) => {
          expect(response.status).to.eq(200);
      });
  });
});
