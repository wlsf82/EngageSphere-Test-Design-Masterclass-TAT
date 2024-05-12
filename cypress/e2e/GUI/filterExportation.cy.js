describe('Filtros e Exportação', () => {
    beforeEach(() => {
        cy.visit("/")
    });
   
    it('Verificar se é possível filtrar por cada tamanho (All, Small, Medium, Enterprise, Large Enterprise, e Very Large Enterprise)', () => { 
        
        cy.filterRecordsBySize({size:'All'})
        cy.filterRecordsBySize({size:'Small'})
        cy.filterRecordsBySize({size:'Medium'})
        cy.filterRecordsBySize({size:'Enterprise'})
        cy.filterRecordsBySize({size:'Large Enterprise'})
        cy.filterRecordsBySize({size:'Very Large Enterprise'})

    });
    
    it('Baixa corretamente uma lista de clientes como um arquivo CSV', () => { 
       cy.log(Cypress.env('aaa'))
    });
})
