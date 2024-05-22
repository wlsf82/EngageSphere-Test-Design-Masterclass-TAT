/* global cy */

import * as React from 'react'
import Header from './Header'
import '../index.css'

describe('Header component', () => {
	it('Renders the header with an h1 and theme toggle', () => {
		cy.mount(<Header />)

		cy.get('h1').should('have.text', 'EngageSphere')
		cy.get('#theme-toggle-button').should('be.visible')
	})
})
