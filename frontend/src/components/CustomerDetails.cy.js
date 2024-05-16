import React from 'react'
import CustomerDetails from './CustomerDetails'
import Customers from '../../../cypress/fixtures/customers'

describe('<CustomerDetails />', () => {
    it('Mostra as informações de contato de um cliente específico', () => {
        cy.mount(<CustomerDetails customer={Customers[0]} onClick={cy.stub()} />)
        cy.contains('.customer-details', 'Company name').should('be.visible')
        cy.contains('.customer-details', 'Number of employees').should('be.visible')
        cy.contains('.customer-details', 'Size').should('be.visible')
        cy.contains('.customer-details', 'Contact name').should('be.visible')
        cy.contains('.customer-details', 'Contact email').should('be.visible')
    })

    it('Mostra "No contact info available" para um cliente sem informações de contato', () => {
        cy.mount(<CustomerDetails customer={Customers[1]} onClick={cy.stub()} />)
        cy.contains('.customer-details', 'No contact info available').should('be.visible')
    })

    it('Mostra o endereço do cliente', () => {
        cy.mount(<CustomerDetails customer={Customers[0]} onClick={cy.stub()} />)
        cy.get('.show-address-btn').click()
        cy.get('.address-info').should('exist')
        cy.contains('.address-info', 'Street').should('be.visible')
        cy.contains('.address-info', 'City').should('be.visible')
        cy.contains('.address-info', 'State').should('be.visible')
        cy.contains('.address-info', 'Zip code').should('be.visible')
        cy.contains('.address-info', 'Country').should('be.visible')
    })
    it('Ocultar o endereço do cliente', () => {
        cy.mount(<CustomerDetails customer={Customers[0]} onClick={cy.stub()} />)
        cy.get('.show-address-btn').click()
        cy.get('.address-info').should('exist')
        cy.get('.hide-address-btn').click()
        cy.get('.address-info').should('not.exist')
    })

    it('Mostra "No address available" para um cliente sem informações de endereço', () => {
        cy.mount(<CustomerDetails customer={Customers[2]} onClick={cy.stub()} />)
        cy.get('.show-address-btn').click()
        cy.contains('No address available')
    })

    it.skip('Volta para a lista de clientes ao clicar no botão "Voltar"', () => {
        //fazer a nivel de gui
    })
})
