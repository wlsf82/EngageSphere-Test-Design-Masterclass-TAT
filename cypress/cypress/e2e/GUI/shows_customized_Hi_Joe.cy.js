/// <reference types="Cypress" />
describe('Dado que valido a saudação', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    });
    context('Quando valido "Hi There!" como saudação por default', () => {
        beforeEach(() => {
            cy.get('[data-testid="name"]').click().type('Hi Joe!')
        });
        it('Então deve conter "Hi there"', () => {
            cy.get('[data-testid="table"] > :nth-child(1)').should('exist').and('contain.text', 'Hi Joe!');
        });
    });
});