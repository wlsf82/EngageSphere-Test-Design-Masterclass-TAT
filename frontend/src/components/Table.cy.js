/* global cy */

import * as React from 'react'
import Table from './Table'

describe('Table component', () => {
	it("Shows a list of customers when there's data in the database", () => {
		cy.mount(<Table />)
	})
})
