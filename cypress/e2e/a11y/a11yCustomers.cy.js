describe('A11y Customers table and detail', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.injectAxe()
    })

    it('não encontra problemas de acessibilidade no modo claro', () => {
        cy.checkA11y()
    })
    it('não encontra problemas de acessibilidade no modo escuro', () => {
        cy.get('#theme-toggle-button').click()
        cy.get('body').should('have.attr', 'data-theme', 'dark')
        cy.checkA11y()

    })

    it('não encontra problemas de acessibilidade no modo claro', () => {
        cy.get('table').find('tr').eq(1).click()
        cy.get('.customer-details').should('be.visible')
        cy.checkA11y()

    })
    it('não encontra problemas de acessibilidade no modo escuro', () => {
        cy.get('table').find('tr').eq(1).click()
        cy.get('.customer-details').should('be.visible')
        cy.get('#theme-toggle-button').click()
        cy.get('body').should('have.attr', 'data-theme', 'dark')
        cy.checkA11y()

    })
    it('mostrar endereço -> não encontra problemas de acessibilidade no modo claro', () => {
        cy.get('table').find('tr').eq(1).click()
        cy.get('.customer-details').should('be.visible')
        cy.get('.show-address-btn').should('be.visible').click()
        cy.get('.address-info').should('be.visible')
        cy.checkA11y()

    })
    it('mostrar endereço -> não encontra problemas de acessibilidade no modo claro', () => {
        cy.get('table').find('tr').eq(1).click()
        cy.get('.customer-details').should('be.visible')
        cy.get('.show-address-btn').should('be.visible').click()
        cy.get('.address-info').should('be.visible')
        cy.get('#theme-toggle-button').click()
        cy.get('body').should('have.attr', 'data-theme', 'dark')
        cy.checkA11y()

    })
})