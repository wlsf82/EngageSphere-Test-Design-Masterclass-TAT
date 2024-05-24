/* global cy */

import * as React from 'react'
import ThemeToggler from './ThemeToggle'
import '../index.css'

describe('ThemeToggler component', () => {
  it('Changes the theme to dark mode, ensuring it persists in the local storage', () => {
    cy.mount(<ThemeToggler />)

    cy.get('#theme-toggle-button').contains('☽').should('be.visible')
    cy.get('#theme-toggle-button').click()
    cy.get('#theme-toggle-button').contains('☀').should('be.visible')

    cy.window().then((win) => {
      const storedTheme = win.localStorage.getItem('theme')
      expect(storedTheme).to.equal('dark')
    })
    cy.get('body').should('have.attr', 'data-theme', 'dark')
  })
  it('Changes the theme to light mode, ensuring it persists in the local storage', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('theme', 'dark')
    })

    cy.mount(<ThemeToggler />)

    cy.get('#theme-toggle-button').contains('☀').should('be.visible')
    cy.get('#theme-toggle-button').click()
    cy.get('#theme-toggle-button').contains('☽').should('be.visible')

    cy.window().then((win) => {
      const storedTheme = win.localStorage.getItem('theme')
      expect(storedTheme).to.equal('light')
    })
    cy.get('body').should('have.attr', 'data-theme', 'light')
  })
})
