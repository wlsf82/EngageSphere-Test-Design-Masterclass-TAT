import React from 'react'
import Header from './Header'

describe('<Header />', () => {
  it('Renderiza o cabeçalho com um h1 e alternância de tema', () => {
    cy.mount(<Header />)

    cy.contains('h1', 'EngageSphere').should('be.visible')
    cy.get('#theme-toggle-button').should('be.visible')
  })
})