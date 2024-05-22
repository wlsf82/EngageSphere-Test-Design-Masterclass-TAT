/* global cy */

import * as React from 'react'
import Greeting from './Greeting'
import '../index.css'

describe('Greeting component', () => {
	it('Shows the default greeting (i.e., Hi there! ...)', () => {
		cy.mount(<Greeting />)
		cy.get('p').first().should('have.text', `Hi there! It is now ${new Date().toDateString()}.`)
	})
	it('Shows a customized greeting (e.g., Hi Joe! ...)', () => {
		cy.mount(<Greeting name="Joe" />)
		cy.get('p').first().should('have.text', `Hi Joe! It is now ${new Date().toDateString()}.`)
	})
})
