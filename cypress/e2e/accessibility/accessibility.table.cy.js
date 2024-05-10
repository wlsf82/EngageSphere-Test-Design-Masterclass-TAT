describe('Accessibility tests for Customer Table', () => {
	beforeEach(() => {
		cy.visit(Cypress.config().baseUrl)
	})
	it('Finds no a11y issues in dark mode', () => {
		cy.get('#theme-toggle-button').click()
		cy.get('body').should('have.attr', 'data-theme', 'dark')
		cy.accessibilityCheck()
	})
	it('Finds no a11y issues in light mode', () => {
		cy.accessibilityCheck()
	})
})
