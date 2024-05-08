describe('API endpoint customers', () => {

            it('Verificar se e possivel fazer a request em customers', () => {
              cy.request(`${Cypress.env('baseUrlApi')}/customers`).then((response) => {
                expect(response.status).to.eq(200)
              })
            })

          


          
            it('Verificar se e possivel paginar a lista de clientes corretamente', () => {
              cy.request(`${Cypress.env('baseUrlApi')}/customers`).then((response) => {

                const limitListOfCostumers = 10
                const totalPages = response.body.pageInfo.totalPages;

                // Faco um for para paginar o numeros de paginas disponiveis
                for (let page = 1; page <= totalPages; page++) {
                  cy.request(`${Cypress.env('baseUrlApi')}/customers?page=${page}`).then((pageResponse) => {

                    //Pego o tamanho do array.
                    const customersOnPage = pageResponse.body.customers.length
                    // Verifica se o número de clientes condiz com o limite que deve ser listado na pagina em questao
                    expect(customersOnPage).to.be.eq(limitListOfCostumers);

                  });
                }
              });
            })




            it('Verificar se e possivel Filtrar clientes por um tipo de tamanho corretamente', () => {
              cy.apiFilterBySize({ size: 'Small' })
            })




            it('Verificar se e possivel listar as propriedades dos customers', () => {
              cy.request(`${Cypress.env('baseUrlApi')}/customers`).then((response) => {
             
                // Obtém o array
                const customers = response.body.customers;
           
                // Percorro o array e verifico se cada objeto da lista tem aquelas propriedades
                customers.forEach((customer) => {
                  expect(customer).to.have.keys('id', 'name', 'employees', 'contactInfo', 'address', 'size');
                });

                //Obtem objeto de paginacao
                const paginationInfo = response.body.pageInfo
                expect(paginationInfo).to.have.keys('currentPage', 'totalPages', 'totalCustomers');
              });

            })






            it('Verificar se é possível listar uma pagina com parametro PAGE negativo', () => {
              cy.request({
                method: 'GET',
                url: 'http://localhost:3001/customers?page=-1',
                failOnStatusCode: false 
              }).then(response => {
                expect(response.status).to.equal(400);
                expect(response.body.error).to.equal('Invalid page or limit. Both must be positive numbers.');
              });
            });
          




            it('Verificar se é possível listar uma pagina com parametro LIMIT negativo', () => {
              cy.request({
                method: 'GET',
                url: 'http://localhost:3001/customers?page=1&limit=-1',
                failOnStatusCode: false // Não falhar no código de status
              }).then(response => {
                expect(response.status).to.equal(400);
                expect(response.body.error).to.equal('Invalid page or limit. Both must be positive numbers.');
              });
            });
          




          
            it('Verificar se é possível listar uma pagina com parametro PAGE como string', () => {
              cy.request({
                method: 'GET',
                url: 'http://localhost:3001/customers?page="1"',
                failOnStatusCode: false 
              }).then(response => {
                expect(response.status).to.equal(400);
                expect(response.body.error).to.equal('Invalid page or limit. Both must be positive numbers.');
              });
            });
          
          




            it('Verificar se é possível listar uma pagina com parametro LIMIT booleno', () => {
              cy.request({
                method: 'GET',
                url: 'http://localhost:3001/customers?page=1&limit=true',
                failOnStatusCode: false 
              }).then(response => {
                expect(response.status).to.equal(400);
                expect(response.body.error).to.equal('Invalid page or limit. Both must be positive numbers.');
              });
            });
})