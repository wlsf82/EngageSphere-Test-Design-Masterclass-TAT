import React from 'react'
import Greeting from './Greeting'
describe('Saudações', () => {
  beforeEach(() => {
    const now = new Date(2024, 4, 16) // month is 0-indexed
    cy.clock(now)
  })

  it('Mostra a saudação padrão', () => {
    cy.mount(<Greeting />)
    cy.contains('p', 'Hi there! It is now Thu May 16 2024.').should('be.visible')
  })
  it('Mostra a saudação personalizada', () => {
    cy.mount(<Greeting name='Joe' />)
    cy.contains('p', 'Hi Joe! It is now Thu May 16 2024.').should('be.visible')
  })
})