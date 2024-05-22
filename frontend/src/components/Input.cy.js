/* global cy */

import * as React from 'react'
import Input from './Input'
import '../index.css'

describe('Input component', () => {
	it('Disables the text input field when there are no customers in the database" when there are no customers in the database', () => {
		const emptyCustomers = []

		cy.mount(<Input customers={emptyCustomers} />)

		cy.get('input[data-testid="name"]').should('be.disabled')
	})
	it('Disables the text input field when in the customer details page', () => {
		const customer = { id: 1, name: 'Jonathan S.A.', employees: 10, size: 'small' }

		cy.mount(<Input customer={customer} />)
		cy.get('input[data-testid="name"]').should('be.disabled')
	})
})
