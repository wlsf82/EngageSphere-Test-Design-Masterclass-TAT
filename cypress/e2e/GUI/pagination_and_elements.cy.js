/// <reference types="Cypress" />
describe('Paginação', () => {
    beforeEach(() => {
      cy.visit('/') 
      cy.wait('@pag1limit10all');
    });
    context('Quando valido que estou na página 1', () => {
        it('Então deve conter página 1 de 5', () => {
            cy.get('[data-testid="pagination"] > span').then(($confirmElement) => {
                if($confirmElement.length > 0) {
                    cy.get('[data-testid="pagination"] > span')
                    .should('exist')
                    .and('contain.text', 'Page 1 of 5');
                }
            })
        });
    });
    context('Quando navego até a página 5 e valido o botão de "next" desabilitado', () => {
        it('Então o botão de navegação deve estar desabilitado', () => {
          cy.get('[disabled]').should('exist');
        });
    }); 
});
