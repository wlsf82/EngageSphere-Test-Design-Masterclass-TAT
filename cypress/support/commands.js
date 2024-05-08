
const selectFilterBySize = 'select[data-testid="filter"]'
const tableHeadSize = 'tbody tr td:nth-child(4)'

Cypress.Commands.add('apiFilterBySize', ({ size }) => {

    cy.request(`http://localhost:3001/customers?page=1&limit=10&size=${size}`).then((response) => {

        const customers = response.body.customers;

        // Faco um filter para ver se tenho pelo menos 1 Size
        const smallCustomers = customers.filter(customer => customer.size === size);
        expect(smallCustomers).to.have.lengthOf.at.least(1);


    })

})




Cypress.Commands.add('filterRecordsBySize', ({ size }) => {

    const listOfSizesFiltered = []

    cy.get(selectFilterBySize, { timeout: 30000 }).should('be.visible').select(`${size}`).then(() => {

        cy.wait(2000)
       
        cy.get(tableHeadSize).then(tdElements => {

            for (let i = 0; i < tdElements.length; i++) {
                cy.wrap(tdElements.eq(i)).invoke('text').then(text => {
                    listOfSizesFiltered.push(text)
                });
            }


            cy.wrap(listOfSizesFiltered).then((response) => {
                if (size === 'All') {

                    const isEveryDiferent = ['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise'].some(sizeSelected => response.includes(sizeSelected))
                    expect(isEveryDiferent).to.be.true;

                } else {

                    const isEveryEqualSize = response.every(sizeName => sizeName === response[0])
                    expect(isEveryEqualSize).to.be.true;

                }
            })


        })


    })






})
