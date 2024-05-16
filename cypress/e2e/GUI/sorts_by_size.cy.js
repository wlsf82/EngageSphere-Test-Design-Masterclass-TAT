describe('Teste de ordenação por tamanho das empresa', () => {
    const sizes = ["Small", "Medium", "Enterprise", "Large Enterprise", "Very Large Enterprise"];

    it('Deve ordenar por tamanho das empresas em ordem ascendente', () => {
        cy.visit('/')
        cy.get('[data-testid="pagination"] > select').select('50');
        cy.get('thead > tr > :nth-child(4) > button').click();

        cy.get('tbody > tr > :nth-child(4)').then($cells => {
            const sizeOrder = $cells.map((index, element) => {
                return Cypress.$(element).text().trim();
            }).get();

            for (let i = 1; i < sizeOrder.length; i++) {
                const currentSizeIndex = sizes.indexOf(sizeOrder[i]);
                const previousSizeIndex = sizes.indexOf(sizeOrder[i - 1]);
                // Verifica se os tamanhos estão em ordem ascendente
                expect(currentSizeIndex).to.be.at.least(previousSizeIndex);
            }
        });
    });

    it('Deve ordenar por tamanho das empresas em ordem descendente', () => {
        cy.visit('/')
        cy.get('[data-testid="pagination"] > select').select('50');
        cy.wait(8);

        cy.get('tbody > tr > :nth-child(4)').then($cells => {
            const sizeOrder = $cells.map((index, element) => {
                return Cypress.$(element).text().trim();
            }).get();

            for (let i = 1; i < sizeOrder.length; i++) {
                const currentSizeIndex = sizes.indexOf(sizeOrder[i]);
                const previousSizeIndex = sizes.indexOf(sizeOrder[i - 1]);
                // Verifica se os tamanhos estão em ordem descendente
                expect(currentSizeIndex).to.be.at.most(previousSizeIndex);
            }
        });
    });
});


