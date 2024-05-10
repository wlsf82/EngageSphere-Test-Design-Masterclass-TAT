describe('API invalid requests for the /customers Endpoint', () => {
	it('Handles invalid requests gracefully (negative page)', () => {
		cy.getRequest({ page: -2, invalidRequest: true }).then((response) => {
			expect(response).to.exist
			expect(response.status).to.eq(400)
			expect(response.body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.')
		})
	})

	it('handles invalid requests gracefully (negative limit)', () => {
		cy.getRequest({ limit: -5, invalidRequest: true }).then((response) => {
			expect(response).to.exist
			expect(response.status).to.eq(400)
			expect(response.body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.')
		})
	})

	it('handles invalid requests gracefully (page as a string)', () => {
		cy.getRequest({ page: 'invalid', invalidRequest: true }).then((response) => {
			expect(response).to.exist
			expect(response.status).to.eq(400)
			expect(response.body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.')
		})
	})

	it('handles invalid requests gracefully (limit as a boolean)', () => {
		cy.getRequest({ limit: true, invalidRequest: true }).then((response) => {
			expect(response).to.exist
			expect(response.status).to.eq(400)
			expect(response.body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.')
		})
	})
	it('handles invalid requests gracefully (unsupported size)', () => {
		cy.getRequest({ size: 'InvalidSize', invalidRequest: true }).then((response) => {
			expect(response).to.exist
			expect(response.status).to.eq(400)
			expect(response.body).to.have.property('error', 'Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.')
		})
	})
})
