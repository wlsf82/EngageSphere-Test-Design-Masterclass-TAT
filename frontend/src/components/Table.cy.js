/* global cy */

import * as React from 'react'
import Table from './Table'

describe('Table component', () => {
	it("Shows a list of customers when there's data in the database", () => {
		// Dados de exemplo para os clientes
		const customers = [
			{ id: 1, name: "Jonathan's BigSales", employees: 10, size: 'small' },
			{ id: 2, name: 'WalmyrMall', employees: 5000, size: 'very large enterprise' }
		]

		cy.mount(<Table customers={customers} />)
		customers.forEach((customer) => {
			cy.get('tbody').contains('td', customer.id).should('be.visible')
			cy.get('tbody').contains('td', customer.name).should('be.visible')
			cy.get('tbody').contains('td', customer.employees).should('be.visible')
			cy.get('tbody').contains('td', customer.size).should('be.visible')
		})
	})
})
