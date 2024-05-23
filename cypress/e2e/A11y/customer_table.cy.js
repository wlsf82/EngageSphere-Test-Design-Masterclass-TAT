import 'cypress-axe'

describe('Tabela de clientes - Verifica se há problemas de acessibilidade', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.injectAxe()
    })

    it('Não encontra problemas de acessibilidade no modo claro', () => {
        cy.get('[data-testid="table"]').checkA11y()
    })

    it('não encontra problemas de acessibilidade no modo escuro', () => {
        cy.get('#theme-toggle-button').click()
        cy.get('[data-testid="table"]').checkA11y()
    })
})
