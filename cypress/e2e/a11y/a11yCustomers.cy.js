describe('A11y Customers table', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    
      })

    it('não encontra problemas de acessibilidade no modo claro', () => {
        cy.a11yCheck()
    })
    it('não encontra problemas de acessibilidade no modo escuro', () => {
        cy.get('#theme-toggle-button').click()
        cy.get('body').should('have.attr','data-theme','dark')
        cy.a11yCheck()
    })
})

describe('A11y Customers detail', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    
      })
      it('não encontra problemas de acessibilidade no modo claro', () => {
        cy.get('table').find('tr').eq(1).click()
        cy.get('.customer-details').should('be.visible')
        cy.a11yCheck()
    })
    it('não encontra problemas de acessibilidade no modo escuro', () => {
        cy.get('table').find('tr').eq(1).click()
        cy.get('.customer-details').should('be.visible')
        cy.get('#theme-toggle-button').click()
        cy.get('body').should('have.attr','data-theme','dark')
        cy.a11yCheck()
    })
    it('mostrar endereço -> não encontra problemas de acessibilidade no modo claro', () => {
        cy.get('table').find('tr').eq(1).click()
        cy.get('.customer-details').should('be.visible')
        cy.get('.show-address-btn').should('be.visible').click()
        cy.get('.address-info').should('be.visible')
        cy.a11yCheck()
    })
    it('mostrar endereço -> não encontra problemas de acessibilidade no modo claro', () => {
        cy.get('table').find('tr').eq(1).click()
        cy.get('.customer-details').should('be.visible')
        cy.get('.show-address-btn').should('be.visible').click()
        cy.get('.address-info').should('be.visible')
        cy.get('#theme-toggle-button').click()
        cy.get('body').should('have.attr','data-theme','dark')
        cy.a11yCheck()
    })
})