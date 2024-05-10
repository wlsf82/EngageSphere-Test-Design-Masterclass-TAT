/// <reference types="Cypress" />
describe('Dado que valido o cabeçalho', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    });
    context('Quando valido o cabeçalho como um h1', () => {
        it('Então deve o cabeçalho deve conter com um h1', () => {
            cy.get('h1')
        });
    });
    context('Quando valido o cabeçalho como um h1 com alternância de tema', () => {
        beforeEach(() => {
            cy.get('#theme-toggle-button').click()
        });
        it('Então deve o cabeçalho com alternância de tema deve conter com um h1', () => {
            cy.get('h1')
        });
    }); 
});