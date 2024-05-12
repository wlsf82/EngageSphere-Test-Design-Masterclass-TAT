
const changeColorThemeButton = '#theme-toggle-button'
const inputName = '[data-testid="name"]'





describe('Renderização e Tema', () => {

    beforeEach(() => {
       cy.visit('/')
      });


    it('Verificar se é possível renderizar  o cabeçalho com um h1', () => { 
        cy.contains('h1', 'EngageSphere').should('be.visible');
    });


    it('Verificar se é possível renderizar a alternância de tema ', () => { 
        cy.get(changeColorThemeButton).should('be.visible');
    });
   
   
    it('Verificar se a mensagem  saudação padrão é exibida' , () => { 

        const currentDate = new Date();
        const formattedDate = currentDate.toDateString()
        cy.contains('p', 'Hi there').should('contain', formattedDate).should('be.visible')

     });
   
   
     it('Verificar se mensagem de saudação personalizada é exibida', () => {
    
        const currentDate = new Date();
        const formattedDate = currentDate.toDateString()

        cy.get(inputName,{timeout:30000}).should('be.visible').type(Cypress.env('yourName'));
        cy.contains('p', `Hi ${Cypress.env('yourName')}`).should('contain', formattedDate).should('be.visible')

    });

    
    it('Verificar se e possivel mudar para tema escuro, garantindo que persista no armazenamento local', () => {
       
        cy.get(changeColorThemeButton,{timeout:30000}).should('be.visible').click();
        cy.get('body').should('have.attr', 'data-theme', 'dark');

        cy.getAllLocalStorage().then((result) => { 
            expect(result[Cypress.config('baseUrl')].theme).to.equal('dark'); 
          })
     });
   
   
   
    it('Verificar se e possivel mudar o tema para modo claro, garantindo que persista no localstorage', () => { 

     
        cy.get('#theme-toggle-button',{timeout:30000}).should('be.visible').dblclick();
        cy.get('body').should('have.attr', 'data-theme', 'light');

        cy.getAllLocalStorage().then((result) => {
            expect(result[Cypress.config('baseUrl')].theme).to.equal('light');
          })
   
    });
  });