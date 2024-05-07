describe('Test suite for Homepage', () => {

  const Homepage = 'http://localhost:3000/';

  beforeEach(() => {
    cy.visit(Homepage);
  })

  it('Renders the header with an h1 and theme toggle', () => {
    cy.get('h1').should('have.text', 'EngageSphere');
    cy.get('#theme-toggle-button').should('be.visible');
  })

  it('Shows the default greeting (i.e., Hi there! ...)', () => {
    cy.get('[data-testid="table"] > :nth-child(1)').should('contain.text', 'Hi there!');
  })

  it('Shows a customized greeting (e.g., Hi Joe! ...)', () => {
    let name = 'Alekson';
    cy.get('[data-testid="name"]').type(name);
    cy.get('[data-testid="table"] > :nth-child(1)').should('contain.text', `Hi ${name}!`);
  })

  it('Disables the text input field when in the customer details page', () => {
    cy.get('[data-testid="table"] tr:first-child').find('td:first-child').click();
    cy.get('[data-testid="name"]').should('be.disabled');
  })

  it('Goes back to the customers list when clicking the "Back" button', () => {
    cy.get('[data-testid="table"] tr:first-child').find('td:first-child').click();
    cy.contains('button', 'Back').click();
    cy.get('[data-testid="table"] > :nth-child(2)').should('have.text', 'Below is our customer list.');
  })

  it('Shows the footer and its links', () => {
    cy.get('[data-testid="footer"] p').should('have.text', 'Copyright 2024 - Talking About Testing');
    cy.get('[data-testid="footer"] a').should('have.length', 3);
    cy.get('[data-testid="footer"] a').eq(0).should('have.attr', 'href', 'https://udemy.com/user/walmyr').and('contain.text', 'Udemy');
    cy.get('[data-testid="footer"] a').eq(1).should('have.attr', 'href', 'https://talkingabouttesting.com').and('contain.text', 'Blog');
    cy.get('[data-testid="footer"] a').eq(2).should('have.attr', 'href', 'https://youtube.com/@talkingabouttesting').and('contain.text', 'YouTube');
  })

})