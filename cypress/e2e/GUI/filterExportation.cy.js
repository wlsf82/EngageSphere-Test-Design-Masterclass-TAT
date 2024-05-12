describe('Filtros e Exportação', () => {
    beforeEach(() => {
        cy.visit("/")
    });
   
    it('Verificar se é possível filtrar por cada tamanho (All, Small, Medium, Enterprise, Large Enterprise, e Very Large Enterprise)', () => { 
       
        cy.intercept(
            'GET',
            `${Cypress.env('baseUrlApi')}/customers?page=1&limit=10&size=Small`,
           
          ).as('getSmallCustomers')
        
          cy.get('[data-testid="filter"]').select('Small')
         
       
          cy.wait('@getSmallCustomers')
        
          cy.get('tbody tr').should('have.length.gt',1)
        
    });
    
    it('Baixa corretamente uma lista de clientes como um arquivo CSV', () => { 
       cy.log(Cypress.env('aaa'))
    });
})
