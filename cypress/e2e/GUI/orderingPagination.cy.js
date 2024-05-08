const firstClientRecord = 'table tbody tr:first-of-type button'
const inputName = '[data-testid="name"]'
const tableHeadNumberOfEmployees = 'tbody tr td:nth-child(3)'
const tableHeadSize = 'thead > tr > :nth-child(4) > button'
const firstTdTable = 'tbody tr:first-child td:nth-child(4)'
const selectLimitDisplayRecords = 'select[aria-label="Pagination limit"]'

describe('Ordenação e Paginacao', () => {


    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))
    });

    it('Desativa o campo de entrada de texto quando na página de detalhes do cliente', () => {

        cy.get(firstClientRecord, { timeout: 30000 }).should('be.visible').eq(0).click();
        cy.get(inputName).should('be.visible').and('have.attr', 'disabled')

    });



    it('Verificar se é possivel ordenar por número de funcionários em ordem ascendente', () => {

        const listNumberOfEmployess = []

        cy.contains('th', 'Number of employees').find('button').dblclick().click()

        cy.get(tableHeadNumberOfEmployees).then(tdElements => {

            const totalTDs = tdElements.length;
            for (let i = 0; i < totalTDs; i++) {
                cy.wrap(tdElements.eq(i)).invoke('text').then(text => {
                    listNumberOfEmployess.push(parseInt(text))
                });
            }

        }).then(() => {

            const isAscending = listNumberOfEmployess.every((value, index, arr) => index === 0 || value >= arr[index - 1]);
            expect(isAscending).to.be.true;

        });

    });



    it('Verificar se e possivel ordenar por número de funcionários em ordem descendente', () => {

        const listNumberOfEmployess = []
        cy.contains('th', 'Number of employees').find('button').dblclick()

        cy.get(tableHeadNumberOfEmployees).then(tdElements => {
            const totalTDs = tdElements.length;
            for (let i = 0; i < totalTDs; i++) {
                cy.wrap(tdElements.eq(i)).invoke('text').then(text => {
                    listNumberOfEmployess.push(parseInt(text))
                });
            }

        }).then(() => {
            const isDescending = listNumberOfEmployess.every((value, index, arr) => index === 0 || value <= arr[index - 1]);
            expect(isDescending).to.be.true;
        });

    });

    it('Verificar se e possivel ordernar por tamanho em ordem ascendente', () => {

        cy.get(tableHeadSize).should('be.visible').dblclick().click()
        cy.get(firstTdTable).should('contain', 'Very Large Enterprise');

    })

    it('Verificar se e possivel ordernar por tamanho em ordem descedente', () => {

        cy.get(tableHeadSize).should('be.visible').click()
        cy.get(firstTdTable).should('contain', 'Small');

    })


    it('Verificar se o botão de paginação Prev esta desativado quando na primeira página', () => {

        cy.get('span').invoke('text').then(text => {

            const pageNumber = parseInt(text.match(/\d+/))

            if (pageNumber === 1) {
                cy.contains('button', 'Prev').should('have.attr', 'disabled')
            }

        })

    })


    it('Verificar se o botão de paginação Next esta desativado quando na ultima pagina', () => {

        cy.get('span').invoke('text').then(text => {

            const listNumberFinalPages = text.split(' ');

            for (let i = 1; i <= listNumberFinalPages[3]; i++) {
                cy.contains('button', 'Next').click({ force: true })
            }

            cy.contains('button', 'Next').should('have.attr', 'disabled')

        })

    })


    it('Verificar se os botoes de paginação  Anterior e Próximo sao desativados quando há apenas uma página',()=>{

        cy.intercept('GET', '**/customers*', (req) => {
            req.reply({
              statusCode: 200,
              body: {
                customers: [{"id":1,"name":"Jacobs Co","employees":99,"contactInfo":null,"address":{"street":"988 Kimberly Fort Apt. 921","city":"Lake Tracy","state":"Connecticut","zipCode":"07115","country":"United States of America"},"size":"Small"},{"id":2,"name":"Kilback Co","employees":100,"contactInfo":{"name":"Daija","email":"Daija_Gislason93@gmail.com"},"address":{"street":"5099 Murray Inlet","city":"South Tiffany","state":"Kentucky","zipCode":"08496","country":"United States of America"},"size":"Medium"},{"id":3,"name":"Parisian Co","employees":999,"contactInfo":{"name":"Alysson","email":"Alysson.Lang@hotmail.com"},"address":{"street":"43247 Bennett Keys Apt. 999","city":"New Paulside","state":"Connecticut","zipCode":"87855","country":"United States of America"},"size":"Medium"},{"id":4,"name":"Wilderman Co","employees":1000,"contactInfo":{"name":"Brando","email":"Brando_Kozey48@gmail.com"},"address":{"street":"8643 Jackson Wall","city":"Lake Davidstad","state":"Minnesota","zipCode":"29481","country":"United States of America"},"size":"Enterprise"},{"id":5,"name":"Runolfsson Co","employees":9999,"contactInfo":null,"address":{"street":"851 John Shores Suite 956","city":"New Mariah","state":"Ohio","zipCode":"78314","country":"United States of America"},"size":"Enterprise"}],
                pageInfo: {
                  currentPage: '1',
                  totalPages: 1,
                  totalCustomers: 5
                }
              },
              headers: {
                'content-type': 'application/json'
              }
            })
          }).as('getCustomers');

          cy.contains('button', 'Prev').should('have.attr', 'disabled')
          cy.contains('button', 'Next').should('have.attr', 'disabled')

    })


    it('Verificar se ambos os botões de paginação Anterior e Próximo estao ativados quando em uma página do meio (por exemplo, Página 2 de 3)',()=>{


        cy.get('span').invoke('text').then(text => {

            const pageNumber = parseInt(text.match(/\d+/))

            if (pageNumber >= 1) {
                cy.contains('button', 'Next').click()
                cy.contains('button', 'Prev').should('be.enabled');
                cy.contains('button', 'Next').should('be.enabled');   
            }

        })

    })

    it('Verificar se e exibido "Page 1 of n" (onde n é o número de páginas)',()=>{

        cy.get('span').invoke('text').then(text => {

            const listNumberFinalPages = text.split(' ')[3];
            cy.get('span').should('be.visible').and('contain', `Page 1 of ${listNumberFinalPages}`);
    
        })

    })


    it.only('Verificar se e possivel configurar um novo limite de paginação (por exemplo, de 10 para 50), garantindo que persista no localstorage',()=>{

        const limitValueShowRecords = "50"

        cy.get(selectLimitDisplayRecords,{timeout:30000}).should('be.visible').select(limitValueShowRecords);

        cy.window().then((win) => {
            const paginationLimitValue = win.localStorage.getItem('paginationLimit');
            expect(paginationLimitValue).to.equal(limitValueShowRecords);
        });

    })




});