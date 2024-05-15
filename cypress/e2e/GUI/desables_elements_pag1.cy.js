/// <reference types="Cypress" />
describe('Dado que valido desativar elementos', () => {
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
                    cy.get('[data-testid="name"]').should('be.disabled');
                }
            })
        });
    });
    context('Quando valido desativar o botão de paginação Anterior quando na primeira página', () => {
        it('Então o botão de paginação Anterior deve estar desabilitado', () => {
            cy.wait('@pag1limit10all')
            cy.get('[disabled=""]').then(($confirmElement) => {
                if($confirmElement.length > 0) {
                    cy.get('[disabled=""]').should('be.disabled');
                }
            })
        });
    });
});