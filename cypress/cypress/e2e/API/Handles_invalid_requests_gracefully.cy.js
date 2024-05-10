//Handles invalid requests gracefully**

describe('Teste de API - Teste de solicitações inválidas', () => {
  it('Deve retornar erro 400 para página negativa', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3001/customers',
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
      url: 'http://localhost:3001/customers',
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
      url: 'http://localhost:3001/customers',
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
      url: 'http://localhost:3001/customers',
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
      url: 'http://localhost:3001/customers',
      qs: {
        size: 'Very Very Large Enterprise'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.')
    })
  })
})
