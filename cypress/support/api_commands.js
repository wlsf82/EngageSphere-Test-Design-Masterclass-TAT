Cypress.Commands.add('getRequest', ({ page = 1, limit = 10, size = 'All', invalidRequest = false }) => {
	const failOnStatusCode = invalidRequest ? false : true // Set the failOnStatusCode according to the invalidRequest
	const queryParams = { page, limit, size }
	const requestOptions = {
		method: 'GET',
		url: Cypress.env('API_URL') + '/customers',
		qs: queryParams,
		failOnStatusCode: failOnStatusCode
	}

	cy.api(requestOptions)
})
