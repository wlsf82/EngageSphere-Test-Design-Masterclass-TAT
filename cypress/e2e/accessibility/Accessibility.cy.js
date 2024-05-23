describe('Accessibility Tests', () => {
  context('Customer Table', () => {
    it('finds no a11y issues in light mode', () => {
      cy.accessibilityCheck()
    })

    it('finds no a11y issues in dark mode', () => {
      cy.accessibilityCheck({ mode: 'dark' })
    })
  })

  context('Customer Details', () => {
    it('finds no a11y issues in light mode', () => {
      cy.accessibilityCheck({ showDetails: true })
    })

    it('finds no a11y issues in dark mode', () => {
      cy.accessibilityCheck({ mode: 'dark', showDetails: true })
    })
  })

  context('Show Address', () => {
    it('finds no a11y issues in light mode', () => {
      cy.accessibilityCheck({ showDetails: true, showAddress: true })
    })

    it('finds no a11y issues in dark mode', () => {
      cy.accessibilityCheck({ mode: 'dark', showDetails: true, showAddress: true })
    })
  })
})
