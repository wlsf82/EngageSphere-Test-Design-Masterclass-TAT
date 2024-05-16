import React from 'react'
import Footer from './Footer'

describe('<Footer />', () => {
  it('renders', () => {
    cy.mount(<Footer />)
    cy.contains('Copyright 2024 - Talking About Testing')
    cy.contains('a', 'Udemy').should('be.visible').and('have.attr', 'href', 'https://udemy.com/user/walmyr')
    cy.contains('a', 'Blog').should('be.visible').and('have.attr', 'href', 'https://talkingabouttesting.com')
    cy.contains('a', 'YouTube').should('be.visible').and('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
  })
})
