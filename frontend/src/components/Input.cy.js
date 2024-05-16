import React from 'react'
import Input from './Input'
import emptyTable from '../../../cypress/fixtures/emptyTable'
import Customers from '../../../cypress/fixtures/customers'
describe('<Input />', () => {
  const clientes = []
  it('Desativa o campo de entrada de texto quando não há clientes no banco de dados', () => {
    cy.mount(<Input customers={emptyTable} />)
    cy.get('input').should('be.disabled')
  })

  it('Desativa o campo de entrada de texto quando na página de detalhes do cliente', () => {
    cy.mount(<Input customer={Customers[1]} customers={Customers} />)
    cy.get('input').should('be.disabled')
  })
})