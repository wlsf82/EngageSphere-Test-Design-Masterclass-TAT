describe('Teste de ordenação por número de funcionários', () => {
    it('Deve ordenar por número de funcionários em ordem ascendente', () => {
      cy.visit('/')
      cy.get('[data-testid="pagination"] > select').select('50');
      cy.get('thead > tr > :nth-child(3) > button').click().click();

      cy.get('tbody > tr > :nth-child(3)').then($cells => {
        const employees = $cells.map((index, element) => {
          return parseInt(Cypress.$(element).text().trim(), 10);
        }).get();

        for (let i = 1; i < employees.length; i++) {
          expect(employees[i]).to.be.at.least(employees[i - 1]);
        }
      });
    });

    it('Deve ordenar por número de funcionários em ordem descendente', () => {
        cy.visit('/')
        cy.get('[data-testid="pagination"] > select').select('50');
        cy.get('thead > tr > :nth-child(3) > button').click();

        cy.get('tbody > tr > :nth-child(3)').then($cells => {
            const employees = $cells.map((index, element) => {
                return parseInt(Cypress.$(element).text().trim(), 10);
            }).get();

            for (let i = 1; i < employees.length; i++) {
                expect(employees[i]).to.be.at.most(employees[i - 1]);
            }
        });
      });
});


