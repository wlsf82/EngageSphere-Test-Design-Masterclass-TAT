/// <reference types="Cypress" />
describe('Dado que valido o cabeçalho', () => {
    beforeEach(() => {
        cy.visitAndInterceptCustomers(); 
    });
    context('Quando valido o cabeçalho como um h1', () => {
        it('Então deve o cabeçalho deve conter com um h1', () => {
            cy.wait('@pag1limit10all')
            cy.get('h1').then(($confirmElement) => {
                if($confirmElement.length > 0) {
                    cy.get('h1').should('exist');
                }
            })
        });
    });
    context('Quando valido o cabeçalho como um h1 com alternância de tema', () => {
        beforeEach(() => {
            cy.get('#theme-toggle-button').then(($confirmElement) => {
                if($confirmElement.length > 0) {
                    cy.get('#theme-toggle-button').click()
                }
            })
        });
        it('Então deve o cabeçalho com alternância de tema deve conter com um h1', () => {
            cy.wait('@pag1limit10all')
            cy.get('h1').then(($confirmElement) => {
                if($confirmElement.length > 0) {
                    cy.get('h1').should('exist');
                }
            });
        });
    }); 
});