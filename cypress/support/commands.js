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
    cy.visit('/')
    cy.wait('@pag1limit10all');
  });
