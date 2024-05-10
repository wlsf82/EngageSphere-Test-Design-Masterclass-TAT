import React from 'react'
import CustomerDetails from './CustomerDetails'

describe('<CustomerDetails />', () => {
it('Mostra as informações de contato de um cliente específico', () => {
cy.chamaClientes({size: 'All'}).then(({body}) => {
cy.mount(<CustomerDetails customer={body.customers[1]} onClick={cy.stub()}/>)
cy.get('.customer-details')
.contains('Company name').should('be.visible')
cy.get('.customer-details')
.contains('Number of employees').should('be.visible')
cy.get('.customer-details')
.contains('Size').should('be.visible')
cy.get('.customer-details')
.contains('Contact name').should('be.visible')
cy.get('.customer-details')
.contains('Contact email').should('be.visible')
})
})

it('Mostra "No contact info available" para um cliente sem informações de contato', () => {
  cy.chamaClientes({size: 'All'}).then(({body}) => {
    cy.mount(<CustomerDetails customer={body.customers[0]} onClick={cy.stub()}/>)
    cy.get('.customer-details')
.contains('No contact info available').should('be.visible')
})
})

it('Mostra o endereço do cliente', () => {
  cy.chamaClientes({size: 'All'}).then(({body}) => {
    cy.mount(<CustomerDetails customer={body.customers[0]} onClick={cy.stub()}/>)
    cy.get('.show-address-btn').click()
    cy.get('.address-info').should('exist')
    cy.get('.address-info').contains('Street').should('be.visible')
    cy.get('.address-info').contains('City').should('be.visible')
    cy.get('.address-info').contains('State').should('be.visible')
    cy.get('.address-info').contains('Zip code').should('be.visible')
    cy.get('.address-info').contains('Country').should('be.visible')
})
})
it('Ocultar o endereço do cliente', () => {
  cy.chamaClientes({size: 'All'}).then(({body}) => {
    cy.mount(<CustomerDetails customer={body.customers[0]} onClick={cy.stub()}/>)
    cy.get('.show-address-btn').click()
    cy.get('.address-info').should('exist')
    cy.get('.hide-address-btn').click()
    cy.get('.address-info').should('not.exist')
})
})

it('Mostra "No address available" para um cliente sem informações de endereço', () => {
  cy.chamaClientes({size: 'Large Enterprise'}).then(({body}) => {
    cy.mount(<CustomerDetails customer={body.customers[2]} onClick={cy.stub()}/>)
    cy.get('.show-address-btn').click()
    cy.contains('No address available')

  })
})

it.skip('Volta para a lista de clientes ao clicar no botão "Voltar"', () => {
//fazer a nivel de gui
})
})
