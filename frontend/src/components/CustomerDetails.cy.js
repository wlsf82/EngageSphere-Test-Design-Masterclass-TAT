/* global cy */

import * as React from 'react'
import CustomerDetails from './CustomerDetails'
import '../index.css'

const customer = {
  name: 'JonQA',
  employees: 500,
  size: 'large',
  contactInfo: {
    name: 'Jon Vendas',
    email: 'john.qa@gmail.com'
  },
  address: {
    street: '123 Main St',
    city: 'Metropolis',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  }
}
const customerWithoutContactInfo = {
  name: 'JonSDT',
  employees: 1,
  size: 'smal',
  contactInfo: null,
  address: {
    street: '123 Main St',
    city: 'Metropolis',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  }
}

const customerWithoutAddress = {
  name: 'NoAddressCustomer',
  employees: 10,
  size: 'small',
  contactInfo: {
    name: 'No Address',
    email: 'no.address@example.com'
  },
  address: null
}

describe('CustomerDetails component', () => {
  it('Shows the contact info of a specific customer', () => {
    cy.mount(<CustomerDetails customer={customer} />)
    cy.get('.customer-details p').contains(`Contact name: ${customer.contactInfo.name}`).should('be.visible')
    cy.get('.customer-details p').contains(`Contact email: ${customer.contactInfo.email}`).should('be.visible')
  })
  it('Shows "No contact info available" for a customer without contact information', () => {
    cy.mount(<CustomerDetails customer={customerWithoutContactInfo} />)
    cy.get('.customer-details p').contains('No contact info available').should('be.visible')
  })
  it('Shows customer address', () => {
    cy.mount(<CustomerDetails customer={customer} />)

    cy.get('.show-address-btn').click()
    cy.get('.customer-details .address-info').should('be.visible')
    cy.get('.customer-details .address-info').contains(`Street: ${customer.address.street}`).should('be.visible')
    cy.get('.customer-details .address-info').contains(`City: ${customer.address.city}`).should('be.visible')
    cy.get('.customer-details .address-info').contains(`State: ${customer.address.state}`).should('be.visible')
    cy.get('.customer-details .address-info').contains(`Zip code: ${customer.address.zipCode}`).should('be.visible')
    cy.get('.customer-details .address-info').contains(`Country: ${customer.address.country}`).should('be.visible')
  })
  it('Hides customer address', () => {
    cy.mount(<CustomerDetails customer={customer} />)

    cy.get('.show-address-btn').click()
    cy.get('.customer-details .address-info').should('be.visible')
    cy.get('.hide-address-btn').click()
    cy.get('.customer-details .address-info').should('not.exist')
  })
  it("Goes back to the customers' list when clicking the 'Back' button", () => {
    const onClickMock = cy.stub()

    cy.mount(<CustomerDetails customer={customer} onClick={onClickMock} />)

    cy.get('button').contains('Back').click()
    cy.wrap(onClickMock).should('have.been.called')
  })

  it('Shows "No address available" for a customer without address information', () => {
    cy.mount(<CustomerDetails customer={customerWithoutAddress} />)

    cy.get('.show-address-btn').click()
    cy.get('.customer-details p').contains('No address available').should('be.visible')
  })
})
