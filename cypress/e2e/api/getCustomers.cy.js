describe('Customers API',()=>{

    it('Recupera clientes com sucesso',() => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3001/customers?page=1&limit=10&size=All'
        }).then(({status,body}) => {
            expect(status).to.eq(200)
            expect(body.pageInfo.totalCustomers).to.eq(50)
        })
      })

    it('Pagina a lista de clientes corretamente',() => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3001/customers?page=2&limit=25&size=All'
        }).then(({status,body}) => {
                expect(status).to.eq(200)
                expect(body.pageInfo.totalPages).to.eq(2)
    })
})

it('Filtra clientes por tamanho corretamente - Very Large Enterprise',() => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:3001/customers?page=1&limit=10&size=Very%20Large%20Enterprise'
    }).then(({status,body}) => {
    expect(status).to.eq(200)
    body.customers.forEach(element => {
        expect(element.size).to.eq('Very Large Enterprise')
    });
})
})

it('Retorna a estrutura correta da resposta',() => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:3001/customers?page=2&limit=5&size=All'
    }).then(({status,body}) => {
        expect(status).to.eq(200)
        body.customers.forEach(element => {
            expect(element).to.have.property('id')
            expect(element).to.have.property('name')
            expect(element).to.have.property('employees')
            expect(element).to.have.property('contactInfo')
            expect(element).to.have.property('address')
            expect(element).to.have.property('size')
        });
            expect(body.pageInfo).to.have.property('currentPage')
            expect(body.pageInfo).to.have.property('totalPages')
            expect(body.pageInfo).to.have.property('totalCustomers')
        
})
})

it('Trata pagina negativa',() => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:3001/customers?page=-1&limit=5&size=All',
        failOnStatusCode: false,
    }).then(({status,body}) => {
        expect(status).to.eq(400)
        expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
})
})

it('Trata limite negativo',() => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:3001/customers?page=1&limit=-2&size=All',
        failOnStatusCode: false,
    }).then(({status,body}) => {
        expect(status).to.eq(400)
        expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
})
})

it('Trata pagina como string',() => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:3001/customers?page=test&limit=2&size=All',
        failOnStatusCode: false,
    }).then(({status,body}) => {
        expect(status).to.eq(400)
        expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
})
})

it('Trata limite como booleano',() => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:3001/customers?page=1&limit=false&size=All',
        failOnStatusCode: false,
    }).then(({status,body}) => {
        expect(status).to.eq(400)
        expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
})
})

it('Trata tamanho inválido',() => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:3001/customers?page=1&limit=2&size=test',
        failOnStatusCode: false,
    }).then(({status,body}) => {
        expect(status).to.eq(400)
        expect(body.error).to.eq('Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.')
})
})
})