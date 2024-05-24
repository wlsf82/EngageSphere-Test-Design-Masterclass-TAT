describe('EngageSphere API requests for the /customers Endpoint', () => {
  context('Successful requests', () => {
    it('Successfully retrieves customers (e.g., checks for the 200 status code)', () => {
      cy.api_getCustomers().then(({ status, body }) => {
        expect(status).to.eq(200)
        expect(body.customers).to.be.an('array').that.is.not.empty
      })
    })

    it('Paginates the customer list correctly', () => {
      cy.api_getCustomers({ page: 2, limit: 20, size: 'All' }).then(({ status, body }) => {
        expect(status).to.eq(200)
        expect(body).to.have.property('pageInfo').that.exist

        const { pageInfo, customers } = body

        expect(pageInfo.currentPage).to.eq('2')
        expect(pageInfo.totalPages).to.eq(3)
        expect(pageInfo.totalCustomers).to.be.lte(50)
        expect(customers).to.be.an('array').and.to.have.lengthOf(20)
      })
    })

    it('Filters customers by size correctly', () => {
      cy.api_getCustomers({ size: 'Medium' }).then(({ status, body }) => {
        expect(status).to.eq(200)
        body.customers.forEach((customer) => {
          expect(customer.size).to.eq('Medium')
          expect(customer.employees).to.be.at.least(100).and.to.be.below(1000)
        })
      })
    })

    it('Returns the correct structure of the response (i.e., customers and pageInfo properties)', () => {
      cy.api_getCustomers({ page: 2, limit: 5 }).then(({ status, body }) => {
        expect(status).to.eq(200)

        body.customers.forEach((customer) => {
          expect(customer.id).to.be.a('number')
          expect(customer.name).to.be.a('string')
          expect(customer.employees).to.be.a('number')
          expect(customer.size).to.be.oneOf(['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise'])

          if (customer.contactInfo) {
            expect(customer.contactInfo).to.have.property('name').that.is.a('string')
            expect(customer.contactInfo).to.have.property('email').that.is.a('string')
          }

          if (customer.address) {
            expect(customer.address).to.have.property('street').that.is.a('string')
            expect(customer.address).to.have.property('city').that.is.a('string')
            expect(customer.address).to.have.property('state').that.is.a('string')
            expect(customer.address).to.have.property('zipCode').that.is.a('string')
            expect(customer.address).to.have.property('country').that.is.a('string')
          }

          cy.wrap(body.pageInfo).should((pageInfo) => {
            expect(pageInfo.currentPage).to.be.a('string').and.to.equal('2')
            expect(pageInfo.totalPages).to.equal(10)
            expect(pageInfo.totalCustomers).to.equal(50)
          })
        })
      })
    })
  })

  context('Invalid requests', () => {
    it('Handles invalid requests gracefully (negative page)', () => {
      cy.api_getCustomers({ page: -2, failOnStatusCode: false }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.')
      })
    })

    it('Handles invalid requests gracefully (e.g., negative limit)', () => {
      cy.api_getCustomers({ limit: -5, failOnStatusCode: false }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.')
      })
    })

    it('Handles invalid requests gracefully (e.g., page as a string)', () => {
      cy.api_getCustomers({ page: 'invalid', failOnStatusCode: false }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.')
      })
    })

    it('Handles invalid requests gracefully (e.g., limit as a boolean)', () => {
      cy.api_getCustomers({ limit: true, failOnStatusCode: false }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.')
      })
    })
    it('Handles invalid requests gracefully (e.g., limit as 0)', () => {
      cy.api_getCustomers({ limit: 0, failOnStatusCode: false }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.')
      })
    })
    it('Handles invalid requests gracefully (e.g., page as 0)', () => {
      cy.api_getCustomers({ page: 0, failOnStatusCode: false }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.')
      })
    })
    it('Handles invalid requests gracefully (e.g., empty page)', () => {
      cy.api_getCustomers({ page: 6, limit: 10, failOnStatusCode: false }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.')
      })
    })
    it('Handles invalid requests gracefully (e.g., unsupported size)', () => {
      cy.api_getCustomers({ size: 'InvalidSize', failOnStatusCode: false }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body).to.have.property('error', 'Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.')
      })
    })
  })
})
