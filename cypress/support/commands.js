Cypress.Commands.add('getCustomers',({page = 1, limit =10, size = 'All', failOnStatusCode = true}) =>{
    const parametros = {page,limit,size}
    const failOnStatusCode = failOnStatusCode || false
    const chamada ={
        method : 'GET',
        url: 'http://localhost:3001/customers',
        qs: parametros,
        failOnStatusCode: failOnStatusCode
    }
    cy.request(chamada)
})