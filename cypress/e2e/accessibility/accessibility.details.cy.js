describe('Accessibility tests for Customer Details', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('tbody > :nth-child(1) > :nth-child(2) > button').click()
  })

  it('Dark mode - finds no a11y issues', () => {
    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.get('#theme-toggle-button').click()
    cy.get('body').should('have.attr', 'data-theme', 'dark')
    cy.accessibilityCheck()
  })

  it('Dark mode - show address - finds no a11y issues', () => {
    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.get('#theme-toggle-button').click()
    cy.get('body').should('have.attr', 'data-theme', 'dark')
    cy.get('.show-address-btn').click()
    cy.contains('h3', 'Address').should('be.visible')
    cy.accessibilityCheck()
  })

  it('Light mode - finds no a11y issues', () => {
    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.get('body').should('have.attr', 'data-theme', 'light')
    cy.accessibilityCheck()
  })

  it('Light mode - show adress - finds no a11y issues', () => {
    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.get('body').should('have.attr', 'data-theme', 'light')
    cy.get('.show-address-btn').click()
    cy.contains('h3', 'Address').should('be.visible')
    cy.accessibilityCheck()
  })
})
