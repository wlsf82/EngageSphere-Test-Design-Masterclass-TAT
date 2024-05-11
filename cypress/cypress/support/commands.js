Cypress.Commands.add('visitAndInterceptCustomers', () => {
    cy.visit('http://localhost:3000/')
    cy.intercept(
        'GET',
        '/customers?page=1&limit=10&size=All',
        { fixture: 'page1&limit10All.json' }
    ).as('pag1limit10all');
})
Cypress.Commands.add('pageUp', () => {
    cy.get('[data-testid="pagination"] > :nth-child(3)').then(($confirmElement) => {
        if($confirmElement.length > 0) {
            cy.get('[data-testid="pagination"] > :nth-child(3)').click()
        }
    })
})
Cypress.Commands.add('declararInterceptador', (page) => {
    cy.intercept(
      'GET',
      `/customers?page=${page}&limit=10&size=All`,
      { fixture: `page${page}&limit10All.json` }
    ).as(`pag${page}limit10all`);
  });
  beforeEach(() => {
    for (let page = 1; page <= 5; page++) {
      cy.declararInterceptador(page);
    }
    cy.visit('http://localhost:3000/');
    cy.wait('@pag1limit10all');
  });
