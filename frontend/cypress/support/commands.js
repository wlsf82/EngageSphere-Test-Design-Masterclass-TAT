Cypress.Commands.add('chamaClientes',({page = 1, limit =10, size = 'All', statusCodeFail = false}) =>{
    const parametros = {page,limit,size}
    const failOnStatusCode = statusCodeFail ? false : true
    const chamada ={
        method : 'GET',
        url: 'http://localhost:3001/customers',
        qs: parametros,
        failOnStatusCode: failOnStatusCode
    }
    cy.request(chamada)
})