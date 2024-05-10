import React from 'react'
import Input from './Input'

describe('<Input />', () => {
  const clientes = []
  it('Desativa o campo de entrada de texto quando não há clientes no banco de dados', () => {
    // see: https://on.cypress.io/mounting-react
    cy.chamaClientes({page:7}).then(({body}) => {
    body.customers.forEach(element => {
      clientes.push(element)
  });
  })
    cy.mount(<Input customers ={clientes} />)
    cy.get('input').should('be.disabled')
  })
  
  it('Desativa o campo de entrada de texto quando na página de detalhes do cliente', () => {
    const clientes = []
    cy.chamaClientes({size: 'All'}).then(({body}) => {
    body.customers.forEach(element => {
      clientes.push(element)
  });
  cy.mount(<Input customer = {clientes[1]} customers ={clientes} />)
  cy.get('input').should('be.disabled')
    })
  })
})