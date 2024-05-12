const tableClients = 'table'
const tableClientsHead = 'table tbody tr'
const tableClientsCels = 'table tbody tr:first-child td'
const loadingLabel = '#loading'
const imageNoCustomersAvaliable = 'div[style="display: flex; justify-content: center; align-items: center; height: 100%;"]'
const noCustomersInfoText = '.no-customers-available-text'
const inputName = '[data-testid="name"]'



describe('Lista de Clientes', () => {

    beforeEach(() => {
      cy.visit('/')
    });



    it('Verificar se e exibido uma lista de clientes quando há dados no banco de dados', () => {

        cy.get(tableClients, { timeout: 30000 }).should('be.visible')
        cy.get(tableClientsHead).should('have.length.greaterThan', 0)
        cy.get(tableClientsCels).should('have.length.greaterThan', 0)

    });



    it('Verificar se e exibido o elemento fallback de "Loading..." antes da busca inicial dos clientes', () => {
       
        cy.intercept('GET', '**/customers*').as('getCustomers')
             cy.get(loadingLabel).should('be.visible')
        cy.wait('@getCustomers')
    
    });




    it('Verificar se e exibido a imagem de uma caixa vazia com o texto "No customers available." quando não há clientes no banco de dados', () => {
        
        cy.intercept('GET', '**/customers*', (req) => {
          req.reply({
            statusCode: 200,
            body: {
              customers: [],
              pageInfo: {
                currentPage: '1',
                totalPages: 1,
                totalCustomers: 0
              }
            },
            headers: {
              'content-type': 'application/json'
            }
          })
        }).as('getCustomers');

        cy.get(imageNoCustomersAvaliable).should('be.visible');
        cy.get(noCustomersInfoText).should('have.text', 'No customers available.');     
      
        cy.wait('@getCustomers');
      });


    it('Verificar se o input para digitar o seu nome e desativado quando não há clientes no banco de dados', () => { 


        cy.intercept('GET', '**/customers*', (req) => {
            req.reply({
              statusCode: 200,
              body: {
                customers: [],
                pageInfo: {
                  currentPage: '1',
                  totalPages: 1,
                  totalCustomers: 0
                }
              },
              headers: {
                'content-type': 'application/json'
              }
            })
          }).as('getCustomers');
  
          cy.get(inputName,{timeout:30000}).should('be.visible').and('have.attr', 'disabled')
        
          cy.wait('@getCustomers');

    });
});