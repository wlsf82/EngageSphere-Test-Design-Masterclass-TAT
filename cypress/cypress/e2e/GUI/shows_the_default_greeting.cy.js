//Shows the default greeting (i.e., Hi there! ...) *

describe('Teste de saudação na página inicial', () => {
    it('Deve exibir a saudação padrão com a data atual ao acessar a página inicial', () => {
      cy.visit('http://localhost:3000/')

      const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' });

      const currentDateWithoutComma = currentDate.replace(/,/g, '');

      const greetingWithDate = `Hi there! It is now ${currentDateWithoutComma}.`;

      cy.get('[data-testid="table"]').should('contain', greetingWithDate);
    });
  });
