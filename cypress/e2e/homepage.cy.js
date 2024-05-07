describe('Test suite for Homepage', () => {

  const Homepage = 'http://localhost:3000/';

  it('Renderiza o cabeçalho com um h1 e alternância de tema', () => {
    cy.visit(Homepage);
    cy.get('h1').should('have.text', 'EngageSphere');
    cy.get('#theme-toggle-button').should('be.visible');
  })

  it('Mostra a saudação padrão (ou seja, Hi there! ...)', () => {
  })

  it('Mostra uma saudação personalizada (por exemplo, Hi Joe! ...)', () => {
  })

  it('Desativa o campo de entrada de texto quando na página de detalhes do cliente', () => {
  })

  it('olta para a lista de clientes ao clicar no botão "Voltar"', () => {
  })

  it('Mostra o rodapé e seus links', () => {
  })

})