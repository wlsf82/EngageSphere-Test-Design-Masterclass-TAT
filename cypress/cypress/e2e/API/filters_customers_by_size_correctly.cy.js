//Filters customers by size correctly ** 

describe('Teste de API - Filtragem de clientes por tamanho', () => {
    const sizes = ['All', 'Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise'];
  
    sizes.forEach((size) => {
      it(`Deve retornar apenas clientes com o tamanho "${size}"`, () => {
        cy.request('GET', `http://localhost:3001/customers?page=1&limit=50&size=${size}`)
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('customers');
  
            const clients = response.body.customers;
            expect(clients).to.be.an('array').not.empty;
  
            if (size !== 'All') {
              clients.forEach((client) => {
                expect(client.size).to.equal(size);
              });
            }
          });
      });
    });
  });
  