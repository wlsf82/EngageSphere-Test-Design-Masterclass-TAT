import React from 'react'
import Header from './Header'

describe('<Header />', () => {
  it('Renderiza o cabeçalho com um h1 e alternância de tema', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Header />)
    
    cy.get('h1').should('be.visible')
    cy.get('#theme-toggle-button').should('be.visible')
  })
})