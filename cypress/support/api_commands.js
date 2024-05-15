Cypress.Commands.add('api_getCustomers', ({ page = 1, limit = 10, size = 'All', failOnStatusCode = true } = {}) => {
	const queryParams = { page, limit, size }
	const requestOptions = {
		method: 'GET',
		url: `${Cypress.env('API_URL')}/customers`,
		qs: queryParams,
		failOnStatusCode: failOnStatusCode
	}
	cy.api(requestOptions)
})
