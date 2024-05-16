Cypress.Commands.add('chamaClientes',({page = 1, limit =10, size = 'All', statusCodeFail = false}) =>{
    const parametros = {page,limit,size}
    const failOnStatusCode = statusCodeFail ? true : false
    const chamada ={
        method : 'GET',
        url: 'http://localhost:3001/customers',
        qs: parametros,
        failOnStatusCode: failOnStatusCode
    }
    cy.request(chamada)
})

Cypress.Commands.add('a11yCheck',()=>{
cy.injectAxe()
cy.checkA11y()
})