/// <reference types="Cypress" />
describe('Dado que valido o desativar do elemento na paginação pag 5', () => {
    beforeEach(() => {
      cy.visit('/') 
    });
    context('Quando valido que estou na página 1', () => {
        it('Então deve conter página 1 de 5', () => {
            cy.wait('@pag1limit10all')
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
        function declararInterceptadores() {
          for (let page = 1; page <= 5; page++) {
            cy.intercept(
              'GET',
              `/customers?page=${page}&limit=10&size=All`,
              { fixture: `page${page}&limit10All.json` }
            ).as(`pag${page}limit10all`);
          }
        }
        beforeEach(() => {
          declararInterceptadores();
          cy.visit('/')
          cy.wait('@pag1limit10all');
          for (let page = 2; page <= 5; page++) {
            cy.contains('Next').click()
            cy.wait(`@pag${page}limit10all`);
          }
        });
        it('Então o botão de navegação deve estar desabilitado', () => {
          cy.get('[disabled]').should('exist');
        });
    }); 
});