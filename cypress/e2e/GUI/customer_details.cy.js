/// <reference types="Cypress" />
describe('Detalhes do cliente', () => {
    beforeEach(() => {
        const dateInThePast = new Date(Date.UTC(1983, 6, 7))
            cy.clock(dateInThePast)
            cy.visit('/') 
    });
    context('Quando valido a saudação por default e a data', () => {
        it('Então deve conter "Hi there" e a data "Wed Jul 06 1983"', () => {
            cy.wait('@pag1limit10all')
            cy.get('[data-testid="table"] tbody tr').then(($confirmElement) => {
                if($confirmElement.length > 0) {
                    cy.get('[data-testid="table"] > :nth-child(1)')
                    .should('exist')
                    .and('contain.text', 'Hi there');

                    cy.get('main > .table-container > p > b:nth-child(2)')
                    .should('exist')
                    .and('contain.text', 'Wed Jul 06 1983')
                    .and('be.visible');
                }
            });
        });
    });
    context('Quando valido a saudação personalisada e a data ', () => {
        beforeEach(() => {
            cy.wait('@pag1limit10all');
            cy.get('[data-testid="table"] b').then(($confirmElement) => {
                if ($confirmElement.length > 0) {
                    cy.get('[data-testid="name"]').type('Hi Joe!');
                }
            });
        });
        it('Então deve conter "Hi Joe!"e a data "Wed Jul 06 1983"', () => {
            cy.get('[data-testid="table"] tbody tr').then(($confirmElement) => {
                if ($confirmElement.length > 0) {
                    cy.get('[data-testid="table"] > :nth-child(1)')
                        .should('exist')
                        .and('contain.text', 'Hi Joe!');
                    
                    cy.get('main > .table-container > p > b:nth-child(2)')
                        .should('exist')
                        .and('contain.text', 'Wed Jul 06 1983')
                        .and('be.visible');
                }
            });
        });
    });
    
});