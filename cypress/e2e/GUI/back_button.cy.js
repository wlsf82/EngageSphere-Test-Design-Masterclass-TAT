describe('Volta para a lista de clientes ao clicar no botão "Voltar"', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('tbody tr').find('td').eq(1).click()
    })

    it('Volta para a lista de clientes ao clicar no botão "Voltar"', () => {
        cy.contains('button', 'Back').should('be.visible').click()
        cy.get('[data-testid="table"]').should('be.visible')

    })
})
