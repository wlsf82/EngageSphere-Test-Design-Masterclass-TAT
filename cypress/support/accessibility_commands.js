Cypress.Commands.add('accessibilityCheck', () => {
    cy.injectAxe()
    cy.checkA11y()
  });