const clientTableRow1Selected = 'tbody tr:nth-child(1)'
const clientTableRow2Selected = 'tbody tr:nth-child(2)'
const containerClientInformation = '.customer-details'
const companyNameRow = 'td:nth-child(2)'
const numberEmployessRow = 'td:nth-child(3)'
const sizeRow = 'td:nth-child(4)'
const showAddressBtn = '.show-address-btn'
const addressContainer = '.address-info'


describe('Informações do Cliente', () => {
   
    beforeEach(() => {
      cy.visit('/') 
           });
   
   
   
    it('Verificar se e exibido corretamente as informações de contato de um cliente específico', () => {

        let selectedUser = { }
        
        cy.get(clientTableRow2Selected).then(row => {
            selectedUser = {
              companyName: row.find(companyNameRow).text(),
              numberEmployess: row.find(numberEmployessRow).text(),
              size: row.find(sizeRow).text()
            };

            cy.get(clientTableRow2Selected).click();

            cy.get(containerClientInformation).should('be.visible');
            cy.get(containerClientInformation).contains(`Company name: ${selectedUser.companyName}`)
            cy.get(containerClientInformation).contains(`Number of employees: ${selectedUser.numberEmployess}`)
            cy.get(containerClientInformation).contains(`Size: ${selectedUser.size}`)
            
          });    
    });


    it('Verificar se e exibido corretamente "No contact info available" para um cliente sem informações de contato', () => {
        
        let selectedUser = { }
        
        cy.get(clientTableRow1Selected).then(row => {
            selectedUser = {
              companyName: row.find(companyNameRow).text(),
              numberEmployess: row.find(numberEmployessRow).text(),
              size: row.find(sizeRow).text()
            };

            cy.get(clientTableRow1Selected).click();
            cy.get(containerClientInformation).should('be.visible');
            cy.get(containerClientInformation).contains('No contact info available')

     });
    
    });
    
     it('Verificar se e exibido corretamente  o endereço do cliente', () => { 

        cy.get(clientTableRow1Selected).click();
        cy.get(containerClientInformation).should('be.visible');
        cy.get(showAddressBtn).should('be.visible').click();
        cy.get(addressContainer).should('be.visible').contains('Address')
      });

    it('Mostra "No address available" para um cliente sem informações de endereço', () => { 


        cy.intercept('GET', '**/customers*', (req) => {
            req.reply({
              statusCode: 200,
              body: {
                customers: [{"id":3,"name":"Parisian Co","employees":999,"contactInfo":{"name":"Alysson","email":"Alysson.Lang@hotmail.com"},"address":null,"size":"Medium"}],
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


          cy.get(clientTableRow1Selected).click();
          cy.get(containerClientInformation).should('be.visible');
          cy.get(showAddressBtn).should('be.visible').click();
          cy.get(containerClientInformation).should('be.visible').contains('No address available')

     });
  });
  