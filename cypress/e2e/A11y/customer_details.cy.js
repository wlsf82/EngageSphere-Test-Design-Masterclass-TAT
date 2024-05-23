import 'cypress-axe'

describe('Detalhes dos clientes - Verifica se há problemas de acessibilidade', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('tbody tr').find('td').eq(1).click()
        cy.injectAxe()
    })

    it('Não encontra problemas de acessibilidade no modo claro', () => {
        cy.get('.customer-details').checkA11y()
    })

    it('não encontra problemas de acessibilidade no modo escuro', () => {
        cy.get('#theme-toggle-button').click()
        cy.get('.customer-details').checkA11y()
    })
})

describe('Mostrar endereço - Verifica se há problemas de acessibilidade', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('tbody tr').find('td').eq(1).click()
        cy.get('.show-address-btn').click();
        cy.injectAxe()
    })

    it('Não encontra problemas de acessibilidade no modo claro', () => {
        cy.get('.address-info').checkA11y()
    })

    it('não encontra problemas de acessibilidade no modo escuro', () => {
        cy.get('#theme-toggle-button').click()
        cy.get('.address-info').checkA11y()
    })
})
