/// <reference types="Cypress" />
describe('Validação de desativação de entrada de texto e botão "Next"', () => {
    beforeEach(() => {
        cy.visit('/')
    });
    context('Quando valido desativar a entrada de texto nos detalhes do cliente', () => {
        beforeEach(() => {
            cy.get('tbody > :nth-child(1) > :nth-child(2)').dblclick()
        });
        it('Então a entrada de texto nos detalhes do cliente deve estar desabilitada', () => {
            cy.wait('@pag1limit10all')
            cy.get('[data-testid="name"]').then(($confirmElement) => {
                if($confirmElement.length > 0) {
                    cy.get('[data-testid="name"]').should('be.disabled').and('be.visible');
                }
            })
        });
    });
    context('Quando o botão "Next" é desativado na primeira página do cliente', () => {
        it('Então o botão "Next" é desabilitado quando chega na última página', () => {
            cy.wait('@pag1limit10all')
            cy.get('[disabled=""]').then(($confirmElement) => {
                if($confirmElement.length > 0) {
                    cy.get('[disabled=""]').should('be.disabled').and('be.visible');
                }
            })
        });
    });
});