import React from 'react'
import Footer from './Footer'

describe('<Footer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Footer />)
    cy.contains('Copyright 2024 - Talking About Testing')
    cy.get('[data-testid="footer"]').find('a').should('have.attr', 'href').and('include', 'udemy.com')
    cy.get('[data-testid="footer"]').find('a').eq(1).should('have.attr', 'href').and('include', 'talkingabouttesting.com')
    cy.get('[data-testid="footer"]').find('a').eq(2).should('have.attr', 'href').and('include', '@talkingabouttesting')
  })
})
