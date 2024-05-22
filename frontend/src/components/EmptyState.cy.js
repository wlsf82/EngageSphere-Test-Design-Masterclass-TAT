/* global cy */

import * as React from 'react'
import EmptyState from './EmptyState'
import '../index.css'

describe('EmptyState component', () => {
	it('Shows the image of an empty box and the text "No customers available." when there are no customers in the database', () => {
		cy.mount(<EmptyState />)

		cy.get('svg.feather-inbox').should('be.visible')
		cy.get('.no-customers-available-text').should('have.text', 'No customers available.')
	})
})
