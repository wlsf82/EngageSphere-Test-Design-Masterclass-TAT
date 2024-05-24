/* global cy */

import * as React from 'react'
import Footer from './Footer'
import '../index.css'

describe('Footer component', () => {
  it('Shows the footer and its links', () => {
    cy.mount(<Footer />)

    cy.get('[data-testid="footer"]').contains('Copyright 2024 - Talking About Testing').should('be.visible')
    cy.get('[data-testid="footer"] a').eq(0).should('have.attr', 'href', 'https://udemy.com/user/walmyr')
    cy.get('[data-testid="footer"] a').eq(1).should('have.attr', 'href', 'https://talkingabouttesting.com')
    cy.get('[data-testid="footer"] a').eq(2).should('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
  })
})
