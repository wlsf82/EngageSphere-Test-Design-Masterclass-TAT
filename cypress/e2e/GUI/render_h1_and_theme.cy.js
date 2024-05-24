/// <reference types="Cypress" />
describe('Elementos de tela', () => {
    beforeEach(() => {
        cy.visit('/')
    });
    context('Quando valido o título', () => {
        it('Deve conter EngageSphere como título', () => {
            cy.wait('@pag1limit10all')
            cy.contains('h1', 'EngageSphere').should('be.visible');
        });
    });
    context('Quando valido o cabeçalho como um h1 com alternância de tema', () => {
        beforeEach(() => {
            cy.get('#theme-toggle-button').click()
        });
        it('Então deve o cabeçalho com alternância de tema deve conter com um h1', () => {
            cy.wait('@pag1limit10all')
            cy.contains('h1', 'EngageSphere').should('be.visible');
        });
    }); 
});