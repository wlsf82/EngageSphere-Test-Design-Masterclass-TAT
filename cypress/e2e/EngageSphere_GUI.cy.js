// Renderiza o cabeçalho com um h1 e alternância de tema
describe('Teste do cabeçalho e alternância de tema', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });

    it('Deve renderizar o cabeçalho com um h1', () => {
      cy.get('h1').should('exist');
    });

    it('Deve alternar o tema', () => {
      cy.get('#theme-toggle-button').should('exist');
      cy.get('body').should('have.attr', 'data-theme', 'light');
      cy.get('#theme-toggle-button').click();
      cy.get('body').should('have.attr', 'data-theme', 'dark');
    });
  });

//Mostra a saudação padrão (ou seja, Hi there! ...)
describe('Teste de saudação', () => {
    it('Deve mostrar a saudação padrão "Hi there!"', () => {
      cy.visit('http://localhost:3000/');
      cy.contains('Hi there!').should('be.visible');
    });
  });


//Volta para a lista de clientes ao clicar no botão "Voltar"

describe('Teste de redirecionamento ao clicar no botão "Voltar"', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });

    it('Deve redirecionar para a lista de clientes ao clicar no botão "Voltar"', () => {
      cy.get('[data-testid=pagination]').should('exist');
      cy.contains('Prev').should('be.visible').and('be.disabled');
      cy.contains('Page 1 of').should('be.visible');
      cy.contains('Next').should('be.visible').and('not.be.disabled');
      cy.url().should('include', 'http://localhost:3000/');

    });
  });

//Mostra o rodapé e seus links
  describe('Teste de rodapé', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });

    it('Deve exibir o rodapé e seus links', () => {
      cy.get('[data-testid="footer"]').should('exist');
      cy.contains('Udemy').should('have.attr', 'href', 'https://udemy.com/user/walmyr');
      cy.contains('Blog').should('have.attr', 'href', 'https://talkingabouttesting.com');
      cy.contains('YouTube').should('have.attr', 'href', 'https://youtube.com/@talkingabouttesting');
    });
  });
