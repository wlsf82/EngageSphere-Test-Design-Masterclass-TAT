import React from 'react'
import Greeting from './Greeting'

describe('Saudações', () => {
  it('Mostra a saudação padrão', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Greeting />)
    cy.contains('p','Hi there!').should('be.visible')
  })
  it('Mostra a saudação personalizada', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Greeting name = 'Joe'/>)
    cy.contains('p','Hi Joe!').should('be.visible')
  })
})