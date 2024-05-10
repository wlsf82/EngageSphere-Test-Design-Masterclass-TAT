//Shows a customized greeting (e.g., Hi Joe! ...) *

describe('Teste de saudação na página inicial', () => {
    it('Deve exibir a saudação customizada com a data atual ao acessar a página inicial', () => {
      cy.visit('http://localhost:3000/')
      cy.wait(300);
      cy.get('[data-testid="name"]').should('be.enabled').click().type("Guilherme Otto");

      const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' });

      const currentDateWithoutComma = currentDate.replace(/,/g, '');

      const greetingWithDate = `Hi Guilherme Otto! It is now ${currentDateWithoutComma}.`;

      cy.get('[data-testid="table"]').should('contain', greetingWithDate);
    });
  });
