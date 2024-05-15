/// <reference types="Cypress" />
describe('Detalhes do cliente', () => {
    beforeEach(() => {
        cy.visit('/') 
    });
    context('Quando valido "Hi There!" como saudação por default', () => {
        it('Então deve conter "Hi there"', () => {
            cy.wait('@pag1limit10all')
            cy.get('[data-testid="table"] > :nth-child(1)').then(($confirmElement) => {
                if($confirmElement.length > 0) {
                    cy.get('[data-testid="table"] > :nth-child(1)')
                    .should('exist')
                    .and('contain.text', 'Hi there');
                }
            });
        });
    });
    context('Quando valido "Hi Joe!" como saudação ', () => {
        beforeEach(() => {
            cy.wait('@pag1limit10all')
            cy.get('[data-testid="name"]').then(($confirmElement) => {
                if($confirmElement.length > 0) {
                    cy.get('[data-testid="name"]')
                    .type('Hi Joe!')
                }
            });
        });
        it('Então deve conter "Hi there"', () => {
            cy.get('[data-testid="table"] > :nth-child(1)').then(($confirmElement) => {
                if($confirmElement.length > 0) {
                    cy.get('[data-testid="table"] > :nth-child(1)')
                    .should('exist')
                    .and('contain.text', 'Hi Joe!');
                }
            });
        });
    });
});