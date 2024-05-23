describe('Teste de ordenação por número de funcionários', () => {
  it('Deve ordenar por número de funcionários em ordem ascendente', () => {
    cy.visit('/')
    cy.get('[data-testid="pagination"] > select').select('50');
    cy.contains('button', 'Number of employees').click().click();
    cy.contains('th', 'Number of employees ↑').should('be.visible')

    cy.get('tbody tr').first().find('td').eq(2).then(($firstElement) => {
      const firstValue = parseInt($firstElement.text(), 10);
      cy.get('tbody tr').last().find('td').eq(2).then(($lastElement) => {
        const lastValue = parseInt($lastElement.text(), 10);
        expect(firstValue).to.be.lessThan(lastValue);
      });
    });
  });

  it('Deve ordenar por número de funcionários em ordem descendente', () => {
    cy.visit('/')
    cy.get('[data-testid="pagination"] > select').select('50');
    cy.contains('button', 'Number of employees').click();
    cy.contains('th', 'Number of employees ↓').should('be.visible')

    cy.get('tbody tr').first().find('td').eq(2).then(($firstElement) => {
      const firstValue = parseInt($firstElement.text(), 10);
      cy.get('tbody tr').last().find('td').eq(2).then(($lastElement) => {
        const lastValue = parseInt($lastElement.text(), 10);
        expect(firstValue).to.be.greaterThan(lastValue);
      });
    });
  });
});

describe('Teste de ordenação por tamanho das empresa', () => {
  const sizes = ["Small", "Medium", "Enterprise", "Large Enterprise", "Very Large Enterprise"];

  it('Deve ordenar por tamanho das empresas em ordem ascendente', () => {
      cy.visit('/')
      cy.get('[data-testid="pagination"] > select').select('50');
      cy.contains('button', 'Size ↓').click();
      cy.contains('th', 'Size ↑').should('be.visible')

      cy.get('tbody tr').first().find('td').eq(3).should('contain', 'Small')
      cy.get('tbody tr').last().find('td').eq(3).should('contain', 'Very Large Enterprise')
  });

  it('Deve ordenar por tamanho das empresas em ordem descendente', () => {
      cy.visit('/')
      cy.get('[data-testid="pagination"] > select').select('50');
      cy.contains('th', 'Size ↓').should('be.visible')
      cy.wait(30);

      cy.get('tbody tr').first().find('td').eq(3).should('contain', 'Very Large Enterprise')
      cy.get('tbody tr').last().find('td').eq(3).should('contain', 'Small')
  });
});

describe('Ordena em ordem descendente por padrão ao mudar a coluna de ordenação', () => {
  const sizes = ["Small", "Medium", "Enterprise", "Large Enterprise", "Very Large Enterprise"];

  it('Deve ordenar por número de funcionários e empresas em ordem descendente por padrão', () => {
    cy.visit('/')
    cy.get('[data-testid="pagination"] > select').select('50');
    cy.contains('button', 'Number of employees').click();
    cy.contains('th', 'Number of employees ↓').should('be.visible')

    cy.get('tbody tr').first().find('td').eq(2).then(($firstElement) => {
      const firstValue = parseInt($firstElement.text(), 10);
      cy.get('tbody tr').last().find('td').eq(2).then(($lastElement) => {
        const lastValue = parseInt($lastElement.text(), 10);
        expect(firstValue).to.be.greaterThan(lastValue);
      });
    });

    cy.contains('button', 'Size').click();
    cy.contains('th', 'Size ↓').should('be.visible')
    cy.get('tbody tr').first().find('td').eq(3).should('contain', 'Very Large Enterprise')
    cy.get('tbody tr').last().find('td').eq(3).should('contain', 'Small')



  });
});

