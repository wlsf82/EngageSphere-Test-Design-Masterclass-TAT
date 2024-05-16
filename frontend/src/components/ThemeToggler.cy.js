import React from 'react'
import ThemeToggler from './ThemeToggle'

describe('<ThemeToggler />', () => {
  it('Muda o tema para modo escuro, garantindo que persista no armazenamento local', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ThemeToggler />)
    cy.get('#theme-toggle-button').should(() => {
      expect(localStorage.getItem('theme')).to.eq('light')
    })
    cy.get('#theme-toggle-button').click()
      .should(() => {
        expect(localStorage.getItem('theme')).to.eq('dark')
      })
  })

  it('Muda o tema para modo claro, garantindo que persista no armazenamento local', () => {
    cy.mount(<ThemeToggler />)
    window.localStorage.setItem('theme', 'dark')
    cy.get('#theme-toggle-button').should(() => {
      expect(localStorage.getItem('theme')).to.eq('dark')
    })
    cy.get('#theme-toggle-button').click()
      .should(() => {
        expect(localStorage.getItem('theme')).to.eq('light')
      })
  })
})