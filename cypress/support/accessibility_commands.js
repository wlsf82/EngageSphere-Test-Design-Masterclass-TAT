Cypress.Commands.add('accessibilityCheck', ({ mode = 'light', showDetails = false, showAddress = false } = {}) => {
	const themeToggle = mode === 'dark' ? '#theme-toggle-button' : ''
	const customerDetails = showDetails ? 'h2' : ''
	const addressBtn = showAddress ? '.show-address-btn' : ''
	cy.visit('/')
	mode === 'dark' && cy.get(themeToggle).click() && cy.get('body').should('have.attr', 'data-theme', 'dark')
	mode === 'light' && cy.get('body').should('have.attr', 'data-theme', 'light')
	showDetails && cy.get('tbody tr').first().click()
	showDetails && cy.contains(customerDetails, 'Customer Details').should('be.visible')
	showDetails && showAddress && cy.get(addressBtn).click() && cy.contains('h3', 'Address').should('be.visible')
	cy.injectAxe()
	cy.checkA11y()
})
