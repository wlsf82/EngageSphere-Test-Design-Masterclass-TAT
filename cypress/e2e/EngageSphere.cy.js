describe('Test suite for Engage Sphere Website', () => {

  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'))
  })

  it('Renders the header with an h1 and theme toggle', () => {
    cy.get('h1').should('have.text', 'EngageSphere');
    cy.get('#theme-toggle-button').should('be.visible');
  })

  it('Shows the default greeting (i.e., Hi there! ...)', () => {
    cy.contains('p', 'Hi there!').should('be.visible')
  })

  it('Shows a customized greeting (e.g., Hi Joe! ...)', () => {
    let name = 'Alekson';
    cy.get('[data-testid="name"]').type(name);
    cy.contains('p', `Hi ${name}!`).should('be.visible')
  })

  it('Disables the text input field when in the customer details page', () => {
    cy.get('tbody tr').first().click();
    cy.get('[data-testid="name"]').should('be.disabled');
  })

  it('Goes back to the customers list when clicking the "Back" button', () => {
    cy.get('tbody tr').first().click();
    cy.contains('button', 'Back').click();
    cy.contains('Below is our customer list.').should('be.visible')
  })

  it('Shows the footer and its links', () => {
    cy.get('[data-testid="footer"] a').should('have.length', 3);
    cy.contains('p', 'Copyright 2024 - Talking About Testing').should('be.visible')
    cy.contains('a', 'Udemy').should('have.attr', 'href', 'https://udemy.com/user/walmyr');
    cy.contains('a', 'Blog').should('have.attr', 'href', 'https://talkingabouttesting.com');
    cy.contains('a', 'YouTube').should('have.attr', 'href', 'https://youtube.com/@talkingabouttesting');
  })

})