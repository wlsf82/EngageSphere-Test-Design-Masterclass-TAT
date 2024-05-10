//Paginates the customer list correctly ** 

describe('Teste de API - Pagina a lista de clientes corretamente', () => {
    it('Deve retornar uma lista de clientes da API na primeira página', () => {
      cy.request('GET', 'http://localhost:3001/customers?page=1&limit=20&size=All')
      .then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('customers')
            expect(response.body.customers).to.be.an('array').that.is.not.empty
      })
    })
  
    it('Deve retornar uma lista de clientes da API na segunda página', () => {
        cy.request('GET', 'http://localhost:3001/customers?page=2&limit=20&size=All')
        .then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('customers')
            expect(response.body.customers).to.be.an('array').that.is.not.empty
      })
    })
  
    it('Deve retornar uma lista de clientes da API na terceira página', () => {
        cy.request('GET', 'http://localhost:3001/customers?page=3&limit=20&size=All')
        .then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('customers')
            expect(response.body.customers).to.be.an('array').that.is.not.empty
      })

    })
  })