/// <reference types="Cypress" />
describe('Dado que valido a saudação', () => {
    beforeEach(() => {
        cy.visitAndInterceptCustomers(); 
    });
    context('Quando valido "Hi There!" como saudação por default', () => {
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